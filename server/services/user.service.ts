import bcrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';
import { query, queryOne, execute, getDatabase, saveDatabaseToDisk } from '../db/connection.ts';
import { recordAuditLog } from './audit.service.ts';
import { Request } from 'express';

export interface ProvisionedFacultyCredential {
  name: string;
  email: string;
  facultyId: number;
  department: string;
  temporaryPassword: string;
}

export async function provisionAllFacultyAccounts(
  adminUserId: number,
  req?: Request
): Promise<ProvisionedFacultyCredential[]> {
  const faculty = await query<{
    id: number;
    full_name: string;
    email: string;
    department_short_name: string;
  }>(
    `SELECT f.id, f.full_name, f.email, d.short_name AS department_short_name
     FROM faculty f
     JOIN departments d ON d.id = f.department_id
     WHERE f.is_active = 1
     ORDER BY f.display_order, f.id;`
  );
  if (!faculty.length) throw new Error('No active faculty records were found.');

  const facultyWithoutValidEmail = faculty.find(member =>
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(member.email.trim())
  );
  if (facultyWithoutValidEmail) {
    throw new Error(`Faculty record for ${facultyWithoutValidEmail.full_name} has no valid email address.`);
  }

  const users = await query<{
    id: number;
    username: string;
    email: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY';
    faculty_id: number | null;
  }>('SELECT id, username, email, role, faculty_id FROM users;');

  const normalizedEmails = faculty.map(member => member.email.trim().toLowerCase());
  if (new Set(normalizedEmails).size !== faculty.length) {
    throw new Error('Faculty records contain duplicate email addresses; resolve these before provisioning accounts.');
  }

  const assignments = new Map<number, number>();
  const assignedUserIds = new Set<number>();
  for (const member of faculty) {
    const email = member.email.trim().toLowerCase();
    const candidates = users.filter(user =>
      user.email.toLowerCase() === email ||
      user.username.toLowerCase() === email ||
      (user.role === 'FACULTY' && user.faculty_id === member.id)
    );
    const uniqueCandidates = [...new Map(candidates.map(user => [user.id, user])).values()];

    if (uniqueCandidates.some(user => user.role !== 'FACULTY')) {
      throw new Error(`The faculty email ${member.email} is already used by an administrator account.`);
    }
    if (uniqueCandidates.length > 1) {
      throw new Error(`More than one account is associated with ${member.full_name}; resolve duplicate accounts before provisioning.`);
    }

    const existing = uniqueCandidates[0];
    if (existing && assignedUserIds.has(existing.id)) {
      throw new Error(`One account is associated with multiple faculty records, including ${member.full_name}.`);
    }
    if (existing) {
      assignments.set(member.id, existing.id);
      assignedUserIds.add(existing.id);
    }
  }

  for (const member of faculty) {
    const email = member.email.trim().toLowerCase();
    const conflictingUser = users.find(user =>
      (user.email.toLowerCase() === email || user.username.toLowerCase() === email) &&
      user.id !== assignments.get(member.id)
    );
    if (conflictingUser) {
      throw new Error(`The email ${member.email} is already assigned to another account.`);
    }
  }

  const preparedCredentials = await Promise.all(faculty.map(async member => {
    const temporaryPassword = randomBytes(18).toString('base64url');
    return {
      member,
      email: member.email.trim().toLowerCase(),
      temporaryPassword,
      passwordHash: await bcrypt.hash(temporaryPassword, 12)
    };
  }));

  const db = await getDatabase();
  db.run('BEGIN IMMEDIATE;');
  try {
    for (const item of preparedCredentials) {
      const userId = assignments.get(item.member.id);
      if (userId) {
        db.run(
          `UPDATE users
           SET username = ?, email = ?, password_hash = ?, password_change_required = 1,
               role = 'FACULTY', faculty_id = ?, is_active = 1, last_login = NULL,
               updated_at = datetime('now')
           WHERE id = ?;`,
          [item.email, item.email, item.passwordHash, item.member.id, userId]
        );
      } else {
        db.run(
          `INSERT INTO users (username, email, password_hash, password_change_required, role, faculty_id, is_active)
           VALUES (?, ?, ?, 1, 'FACULTY', ?, 1);`,
          [item.email, item.email, item.passwordHash, item.member.id]
        );
      }
    }

    for (const user of users) {
      if (user.role === 'FACULTY' && !assignedUserIds.has(user.id)) {
        db.run(
          `UPDATE users SET is_active = 0, faculty_id = NULL, updated_at = datetime('now') WHERE id = ?;`,
          [user.id]
        );
      }
    }

    db.run('COMMIT;');
    saveDatabaseToDisk();
  } catch (error) {
    db.run('ROLLBACK;');
    throw error;
  }

  await recordAuditLog({
    userId: adminUserId,
    action: 'FACULTY_ACCOUNTS_PROVISIONED',
    entityType: 'faculty',
    entityId: 'all',
    newValue: { accountCount: preparedCredentials.length },
    req
  });

  return preparedCredentials.map(item => ({
    name: item.member.full_name,
    email: item.email,
    facultyId: item.member.id,
    department: item.member.department_short_name,
    temporaryPassword: item.temporaryPassword
  }));
}

export async function getAllUsers() {
  const users = await query<any>(
    `SELECT u.id, u.username, u.email, u.role, u.faculty_id, u.is_active, u.last_login, u.created_at,
            f.full_name as faculty_name, f.employee_id, f.designation, d.short_name as department_short_name
     FROM users u
     LEFT JOIN faculty f ON u.faculty_id = f.id
     LEFT JOIN departments d ON f.department_id = d.id
     ORDER BY u.id ASC;`
  );

  return users.map(u => ({
    id: u.id,
    username: u.username,
    email: u.email,
    role: u.role,
    facultyId: u.faculty_id,
    isActive: Boolean(u.is_active),
    lastLogin: u.last_login,
    createdAt: u.created_at,
    facultyName: u.faculty_name,
    employeeId: u.employee_id,
    designation: u.designation,
    departmentShortName: u.department_short_name
  }));
}

export async function createUser(
  data: {
    username: string;
    email: string;
    passwordPlain: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY';
    facultyId?: number | null;
  },
  adminUserId: number,
  req?: Request
) {
  if (typeof data.passwordPlain !== 'string' || data.passwordPlain.length < 12) {
    throw new Error('Password must be at least 12 characters long.');
  }

  const existing = await queryOne('SELECT id FROM users WHERE username = ? OR email = ?;', [data.username, data.email]);
  if (existing) {
    throw new Error('A user account with this username or email already exists.');
  }

  if (data.facultyId) {
    const facultyAlreadyLinked = await queryOne('SELECT id FROM users WHERE faculty_id = ?;', [data.facultyId]);
    if (facultyAlreadyLinked) {
      throw new Error(`Faculty #${data.facultyId} is already linked to another user account.`);
    }
  }

  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(data.passwordPlain, saltRounds);

  const { lastInsertId } = await execute(
    `INSERT INTO users (username, email, password_hash, password_change_required, role, faculty_id, is_active)
     VALUES (?, ?, ?, ?, ?, ?, 1);`,
    [data.username, data.email, passwordHash, data.role === 'FACULTY' ? 1 : 0, data.role, data.facultyId || null]
  );

  const createdUser = await queryOne<any>(
    'SELECT id, username, email, role, faculty_id, is_active, created_at FROM users WHERE id = ?;',
    [lastInsertId]
  );

  await recordAuditLog({
    userId: adminUserId,
    action: 'USER_CREATED',
    entityType: 'user',
    entityId: lastInsertId,
    newValue: { username: data.username, email: data.email, role: data.role, facultyId: data.facultyId },
    req
  });

  return createdUser;
}

export async function updateUser(
  id: number,
  data: {
    role?: 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY';
    facultyId?: number | null;
    isActive?: boolean;
    email?: string;
  },
  adminUserId: number,
  req?: Request
) {
  const current = await queryOne<any>('SELECT * FROM users WHERE id = ?;', [id]);
  if (!current) throw new Error('User not found');

  if (data.facultyId !== undefined && data.facultyId !== null && data.facultyId !== current.faculty_id) {
    const facultyAlreadyLinked = await queryOne('SELECT id FROM users WHERE faculty_id = ? AND id != ?;', [data.facultyId, id]);
    if (facultyAlreadyLinked) {
      throw new Error(`Faculty #${data.facultyId} is already linked to another user account.`);
    }
  }

  await execute(
    `UPDATE users SET
      role = COALESCE(?, role),
      faculty_id = ?,
      is_active = COALESCE(?, is_active),
      email = COALESCE(?, email),
      updated_at = datetime('now')
    WHERE id = ?;`,
    [
      data.role || null,
      data.facultyId !== undefined ? data.facultyId : current.faculty_id,
      data.isActive !== undefined ? (data.isActive ? 1 : 0) : null,
      data.email || null,
      id
    ]
  );

  const updated = await queryOne<any>('SELECT id, username, email, role, faculty_id, is_active FROM users WHERE id = ?;', [id]);

  await recordAuditLog({
    userId: adminUserId,
    action: 'USER_UPDATED',
    entityType: 'user',
    entityId: id,
    oldValue: { role: current.role, facultyId: current.faculty_id, isActive: current.is_active },
    newValue: { role: updated.role, facultyId: updated.faculty_id, isActive: updated.is_active },
    req
  });

  return updated;
}

export async function resetUserPassword(
  userId: number,
  newPasswordPlain: string,
  adminUserId: number,
  req?: Request
) {
  if (!newPasswordPlain || newPasswordPlain.length < 12) {
    throw new Error('Password must be at least 12 characters long.');
  }

  const saltRounds = 12;
  const passwordHash = await bcrypt.hash(newPasswordPlain, saltRounds);

  await execute(
    `UPDATE users SET password_hash = ?, password_change_required = 1, updated_at = datetime('now') WHERE id = ?;`,
    [passwordHash, userId]
  );

  await recordAuditLog({
    userId: adminUserId,
    action: 'USER_PASSWORD_RESET',
    entityType: 'user',
    entityId: userId,
    newValue: { event: 'Password reset performed by administrator' },
    req
  });
}

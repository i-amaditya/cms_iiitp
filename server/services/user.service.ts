import bcrypt from 'bcryptjs';
import { query, queryOne, execute } from '../db/connection.ts';
import { recordAuditLog } from './audit.service.ts';
import { Request } from 'express';

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

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(data.passwordPlain, saltRounds);

  const { lastInsertId } = await execute(
    `INSERT INTO users (username, email, password_hash, role, faculty_id, is_active)
     VALUES (?, ?, ?, ?, ?, 1);`,
    [data.username, data.email, passwordHash, data.role, data.facultyId || null]
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
  if (!newPasswordPlain || newPasswordPlain.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(newPasswordPlain, saltRounds);

  await execute(
    `UPDATE users SET password_hash = ?, updated_at = datetime('now') WHERE id = ?;`,
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

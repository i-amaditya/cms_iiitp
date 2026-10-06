import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { queryOne, execute } from '../db/connection.ts';
import { config } from '../config/index.ts';
import { AuthUser } from '../middleware/auth.ts';
import { recordAuditLog } from './audit.service.ts';
import { Request } from 'express';

export async function loginUser(
  identifier: string, // username or email
  passwordPlain: string,
  req?: Request
): Promise<{ user: AuthUser; token: string }> {
  const user = await queryOne<any>(
    `SELECT u.*, f.full_name, f.designation, f.profile_slug, f.profile_photo, f.status as faculty_status
     FROM users u
     LEFT JOIN faculty f ON u.faculty_id = f.id
     WHERE u.username = ? OR u.email = ?;`,
    [identifier, identifier]
  );

  if (!user) {
    throw new Error('Invalid credentials: User does not exist');
  }

  if (!user.is_active) {
    throw new Error('Account deactivated: Please contact system administration');
  }

  const isPasswordValid = await bcrypt.compare(passwordPlain, user.password_hash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials: Password incorrect');
  }

  // Update last_login timestamp
  await execute(`UPDATE users SET last_login = datetime('now') WHERE id = ?;`, [user.id]);

  const payload: AuthUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    facultyId: user.faculty_id,
    mustChangePassword: Boolean(user.password_change_required)
  };

  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn as any
  });

  await recordAuditLog({
    userId: user.id,
    action: 'LOGIN',
    entityType: 'user',
    entityId: user.id,
    newValue: { username: user.username, role: user.role, facultyId: user.faculty_id },
    req
  });

  return {
    user: payload,
    token
  };
}

export async function getCurrentUserProfile(userId: number) {
  const user = await queryOne<any>(
    `SELECT u.id, u.username, u.email, u.role, u.faculty_id, u.is_active, u.password_change_required, u.last_login, u.created_at,
            f.full_name, f.designation, f.profile_slug, f.profile_photo, f.status as faculty_status, f.rejection_reason
     FROM users u
     LEFT JOIN faculty f ON u.faculty_id = f.id
     WHERE u.id = ?;`,
    [userId]
  );

  if (!user) return null;

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    facultyId: user.faculty_id,
    mustChangePassword: Boolean(user.password_change_required),
    isActive: Boolean(user.is_active),
    lastLogin: user.last_login,
    createdAt: user.created_at,
    faculty: user.faculty_id ? {
      fullName: user.full_name,
      designation: user.designation,
      profileSlug: user.profile_slug,
      profilePhoto: user.profile_photo,
      status: user.faculty_status,
      rejectionReason: user.rejection_reason
    } : null
  };
}

export async function changeOwnPassword(userId: number, currentPassword: string, newPassword: string): Promise<void> {
  if (!currentPassword || typeof currentPassword !== 'string') {
    throw new Error('Current password is required.');
  }
  if (typeof newPassword !== 'string' || newPassword.length < 12) {
    throw new Error('New password must be at least 12 characters long.');
  }
  if (newPassword === currentPassword) {
    throw new Error('Choose a new password that is different from your temporary password.');
  }

  const user = await queryOne<{ password_hash: string }>(
    'SELECT password_hash FROM users WHERE id = ? AND is_active = 1;',
    [userId]
  );
  if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) {
    throw new Error('Current password is incorrect.');
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  await execute(
    `UPDATE users SET password_hash = ?, password_change_required = 0, updated_at = datetime('now') WHERE id = ?;`,
    [passwordHash, userId]
  );

  await recordAuditLog({
    userId,
    action: 'PASSWORD_CHANGED',
    entityType: 'user',
    entityId: userId,
    newValue: { event: 'User changed their password' }
  });
}

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
    facultyId: user.faculty_id
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
    `SELECT u.id, u.username, u.email, u.role, u.faculty_id, u.is_active, u.last_login, u.created_at,
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

/**
 * src/controllers/admin.controller.ts
 *
 * Controller for Admin User & Invite Management Endpoints (Section 5.2)
 *
 * Endpoints:
 *   GET    /v1/admin/users                     — List users (paginated, filterable by role/status)
 *   GET    /v1/admin/users/:id                 — Get single user details with sections
 *   PATCH  /v1/admin/users/:id                 — Update role or toggle is_active (deactivate)
 *   POST   /v1/admin/invites                   — Create invite (email, role, optional sections)
 *   GET    /v1/admin/invites                   — List all invites (with pending/accepted filter)
 *   DELETE /v1/admin/invites/:id               — Revoke / delete an invite
 *   POST   /v1/admin/users/:id/sections        — Assign sections to an editor
 *   DELETE /v1/admin/users/:id/sections/:section — Remove a section from an editor
 */

import { Request, Response } from 'express';
import crypto from 'crypto';
import { UserRole, Prisma } from '@prisma/client';
import prisma from '../config/prisma';
import { env } from '../config/env';
import { invalidateUserAuthCache } from '../middlewares/auth';
import { invalidateEditorSectionCache } from '../middlewares/role';
import { createAuditLog } from '../middlewares/audit';
import { logger } from '../utils/logger';

// ── 1. GET /v1/admin/users ───────────────────────────────────────────────────

export async function listUsers(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 20));
    const skip = (page - 1) * limit;

    const role = req.query.role as UserRole | undefined;
    const isActiveStr = req.query.is_active as string | undefined;
    const search = req.query.search as string | undefined;

    const where: any = {};

    if (role && Object.values(UserRole).includes(role)) {
      where.role = role;
    }

    if (isActiveStr !== undefined) {
      where.is_active = isActiveStr === 'true' || isActiveStr === '1';
    }

    if (search) {
      where.OR = [
        { email: { contains: search } },
        { name: { contains: search } },
      ];
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          avatar_url: true,
          is_active: true,
          last_login_at: true,
          created_at: true,
          section_assignments: {
            select: { section: true },
          },
        },
      }),
    ]);

    const formattedUsers = users.map((u) => ({
      ...u,
      sections: u.section_assignments.map((s) => s.section),
      section_assignments: undefined,
    }));

    res.json({
      users: formattedUsers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    logger.error('Error listing users in admin controller', { err });
    res.status(500).json({ error: 'Internal server error listing users.' });
  }
}

// ── 2. GET /v1/admin/users/:id ───────────────────────────────────────────────

export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const userId = parseInt(req.params.id as string, 10);
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID.' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar_url: true,
        is_active: true,
        last_login_at: true,
        token_version: true,
        created_at: true,
        updated_at: true,
        section_assignments: {
          select: { section: true },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    res.json({
      user: {
        ...user,
        sections: user.section_assignments.map((s) => s.section),
        section_assignments: undefined,
      },
    });
  } catch (err) {
    logger.error('Error fetching user by ID', { err, userId: req.params.id });
    res.status(500).json({ error: 'Internal server error fetching user.' });
  }
}

// ── 3. PATCH /v1/admin/users/:id ─────────────────────────────────────────────

export async function updateUser(req: Request, res: Response): Promise<void> {
  try {
    const userId = parseInt(req.params.id as string, 10);
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID.' });
      return;
    }

    const { role, is_active } = req.body;

    if (role === undefined && is_active === undefined) {
      res.status(400).json({ error: 'Nothing to update. Provide role or is_active.' });
      return;
    }

    if (role !== undefined && !Object.values(UserRole).includes(role)) {
      res.status(400).json({
        error: `Invalid role. Allowed roles are: ${Object.values(UserRole).join(', ')}`,
      });
      return;
    }

    if (is_active !== undefined && typeof is_active !== 'boolean') {
      res.status(400).json({ error: 'is_active must be a boolean.' });
      return;
    }

    const existing = await prisma.user.findUnique({ where: { id: userId } });
    if (!existing) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    // Guard: Prevent admin from deactivating their own active account
    if (req.user?.id === userId && is_active === false) {
      res.status(400).json({ error: 'You cannot deactivate your own account.' });
      return;
    }

    // Role change or deactivation must increment token_version to invalidate existing sessions [FIX #4]
    const shouldRevokeSessions =
      (is_active !== undefined && is_active !== existing.is_active) ||
      (role !== undefined && role !== existing.role);

    const updateData: any = {};
    if (role !== undefined) updateData.role = role;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (shouldRevokeSessions) updateData.token_version = { increment: 1 };

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        is_active: true,
        token_version: true,
        updated_at: true,
      },
    });

    // Invalidate caches
    invalidateUserAuthCache(userId);
    invalidateEditorSectionCache(userId);

    // Audit log
    await createAuditLog({
      req,
      action: is_active === false ? 'DEACTIVATE' : 'UPDATE',
      resource: 'user',
      resourceId: userId,
      oldValue: { role: existing.role, is_active: existing.is_active },
      newValue: { role: updatedUser.role, is_active: updatedUser.is_active },
    });

    res.json({
      message: 'User updated successfully.',
      user: updatedUser,
    });
  } catch (err) {
    logger.error('Error updating user', { err, userId: req.params.id });
    res.status(500).json({ error: 'Internal server error updating user.' });
  }
}

// ── 4. POST /v1/admin/invites ────────────────────────────────────────────────

export async function createInvite(req: Request, res: Response): Promise<void> {
  try {
    const { email, role, sections, expires_in_days } = req.body;

    if (!email || typeof email !== 'string') {
      res.status(400).json({ error: 'Valid email is required.' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // Domain validation
    const emailDomain = cleanEmail.split('@')[1];
    if (env.ALLOWED_DOMAIN && emailDomain !== env.ALLOWED_DOMAIN) {
      res.status(400).json({
        error: `Invalid domain: @${emailDomain}. Only @${env.ALLOWED_DOMAIN} addresses can be invited.`,
      });
      return;
    }

    if (!role || !Object.values(UserRole).includes(role)) {
      res.status(400).json({
        error: `Valid role is required. Allowed roles: ${Object.values(UserRole).join(', ')}`,
      });
      return;
    }

    if (role === 'editor' && sections !== undefined && !Array.isArray(sections)) {
      res.status(400).json({ error: 'sections must be an array of strings for editor role.' });
      return;
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existingUser) {
      res.status(400).json({ error: 'A user with this email address already exists.' });
      return;
    }

    // Check if pending invite already exists
    const existingInvite = await prisma.invite.findUnique({ where: { email: cleanEmail } });
    if (existingInvite && !existingInvite.accepted) {
      // Check if not expired
      if (!existingInvite.expires_at || existingInvite.expires_at > new Date()) {
        res.status(400).json({
          error: 'An active invitation is already pending for this email. Revoke it before re-inviting.',
        });
        return;
      }
    }

    // Compute expiration
    const days = parseInt(expires_in_days, 10) || 7; // Default 7 days
    const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    const token = crypto.randomBytes(32).toString('hex');

    const cleanSections: Prisma.InputJsonValue | Prisma.NullableJsonNullValueInput =
      role === 'editor' && Array.isArray(sections)
        ? sections.map((s: string) => (typeof s === 'string' ? s.trim().toLowerCase() : '')).filter(Boolean)
        : Prisma.JsonNull;

    // Create or update invite
    const invite = await prisma.invite.upsert({
      where: { email: cleanEmail },
      update: {
        role,
        sections: cleanSections,
        invited_by: req.user?.id ?? null,
        token,
        accepted: false,
        created_at: new Date(),
        expires_at: expiresAt,
      },
      create: {
        email: cleanEmail,
        role,
        sections: cleanSections,
        invited_by: req.user?.id ?? null,
        token,
        accepted: false,
        expires_at: expiresAt,
      },
    });

    // Audit log
    await createAuditLog({
      req,
      action: 'INVITE',
      resource: 'invite',
      resourceId: invite.id,
      newValue: { email: cleanEmail, role, sections: invite.sections },
    });

    res.status(201).json({
      message: 'Invitation created successfully.',
      invite: {
        id: invite.id,
        email: invite.email,
        role: invite.role,
        sections: invite.sections,
        accepted: invite.accepted,
        expires_at: invite.expires_at,
        created_at: invite.created_at,
      },
    });
  } catch (err) {
    logger.error('Error creating invite', { err, body: req.body });
    res.status(500).json({ error: 'Internal server error creating invite.' });
  }
}

// ── 5. GET /v1/admin/invites ─────────────────────────────────────────────────

export async function listInvites(req: Request, res: Response): Promise<void> {
  try {
    const acceptedStr = req.query.accepted as string | undefined;
    const where: any = {};

    if (acceptedStr !== undefined) {
      where.accepted = acceptedStr === 'true' || acceptedStr === '1';
    }

    const invites = await prisma.invite.findMany({
      where,
      orderBy: { created_at: 'desc' },
      include: {
        inviter: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.json({
      invites: invites.map((inv) => ({
        id: inv.id,
        email: inv.email,
        role: inv.role,
        sections: inv.sections,
        accepted: inv.accepted,
        expires_at: inv.expires_at,
        created_at: inv.created_at,
        inviter: inv.inviter,
      })),
    });
  } catch (err) {
    logger.error('Error listing invites', { err });
    res.status(500).json({ error: 'Internal server error listing invites.' });
  }
}

// ── 6. DELETE /v1/admin/invites/:id ──────────────────────────────────────────

export async function revokeInvite(req: Request, res: Response): Promise<void> {
  try {
    const inviteId = parseInt(req.params.id as string, 10);
    if (isNaN(inviteId)) {
      res.status(400).json({ error: 'Invalid invite ID.' });
      return;
    }

    const invite = await prisma.invite.findUnique({ where: { id: inviteId } });
    if (!invite) {
      res.status(404).json({ error: 'Invite not found.' });
      return;
    }

    await prisma.invite.delete({ where: { id: inviteId } });

    // Audit log
    await createAuditLog({
      req,
      action: 'REVOKE_INVITE',
      resource: 'invite',
      resourceId: inviteId,
      oldValue: { email: invite.email, role: invite.role },
    });

    res.json({ message: 'Invitation revoked successfully.' });
  } catch (err) {
    logger.error('Error revoking invite', { err, inviteId: req.params.id });
    res.status(500).json({ error: 'Internal server error revoking invite.' });
  }
}

// ── 7. POST /v1/admin/users/:id/sections ────────────────────────────────────

export async function assignEditorSections(req: Request, res: Response): Promise<void> {
  try {
    const userId = parseInt(req.params.id as string, 10);
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Invalid user ID.' });
      return;
    }

    const { sections } = req.body;
    if (!Array.isArray(sections) || sections.length === 0) {
      res.status(400).json({ error: 'sections must be a non-empty array of section strings.' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }

    if (user.role !== 'editor') {
      res.status(400).json({
        error: `Section assignments only apply to users with the 'editor' role (current role: '${user.role}').`,
      });
      return;
    }

    // Insert new section assignments skipping duplicates
    await prisma.editorSectionAssignment.createMany({
      data: sections.map((section: string) => ({
        user_id: userId,
        section: section.trim().toLowerCase(),
      })),
      skipDuplicates: true,
    });

    // Invalidate editor cache
    invalidateEditorSectionCache(userId);

    // Fetch updated list of sections
    const updatedAssignments = await prisma.editorSectionAssignment.findMany({
      where: { user_id: userId },
      select: { section: true },
    });

    const activeSections = updatedAssignments.map((a) => a.section);

    // Audit log
    await createAuditLog({
      req,
      action: 'ASSIGN_SECTIONS',
      resource: 'user',
      resourceId: userId,
      newValue: { sections: activeSections },
    });

    res.json({
      message: 'Sections assigned successfully.',
      sections: activeSections,
    });
  } catch (err) {
    logger.error('Error assigning editor sections', { err, userId: req.params.id });
    res.status(500).json({ error: 'Internal server error assigning sections.' });
  }
}

// ── 8. DELETE /v1/admin/users/:id/sections/:section ──────────────────────────

export async function removeEditorSection(req: Request, res: Response): Promise<void> {
  try {
    const userId = parseInt(req.params.id as string, 10);
    const rawSection = req.params.section as string | undefined;
    const section = rawSection?.trim().toLowerCase();

    if (isNaN(userId) || !section) {
      res.status(400).json({ error: 'Invalid user ID or section name.' });
      return;
    }

    const assignment = await prisma.editorSectionAssignment.findFirst({
      where: { user_id: userId, section },
    });

    if (!assignment) {
      res.status(404).json({ error: `Section '${section}' was not assigned to this user.` });
      return;
    }

    await prisma.editorSectionAssignment.delete({
      where: { id: assignment.id },
    });

    // Invalidate editor cache
    invalidateEditorSectionCache(userId, section);

    // Audit log
    await createAuditLog({
      req,
      action: 'REMOVE_SECTION',
      resource: 'user',
      resourceId: userId,
      oldValue: { removedSection: section },
    });

    res.json({ message: `Section '${section}' removed successfully.` });
  } catch (err) {
    logger.error('Error removing editor section', { err, userId: req.params.id, section: req.params.section });
    res.status(500).json({ error: 'Internal server error removing section.' });
  }
}

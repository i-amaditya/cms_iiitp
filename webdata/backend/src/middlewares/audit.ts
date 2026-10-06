/**
 * src/middlewares/audit.ts
 *
 * Audit Logging Utility & Middleware [FIX #3]
 *
 * Requirements:
 *   1. Records action ('CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT', 'INVITE', 'PUBLISH', 'ARCHIVE', etc.).
 *   2. Snapshots user_email directly so log remains intact even if user row is deleted.
 *   3. user_id is NOT a foreign key (denormalized persistence).
 *   4. Stores old_value and new_value snapshots as JSON.
 *   5. Captures client IP and User-Agent.
 */

import { Request } from 'express';
import prisma from '../config/prisma';
import { logger } from '../utils/logger';

export interface AuditLogParams {
  req?: Request;
  userId?: number;
  userEmail?: string;
  action: string;
  resource: string;
  resourceId?: string | number;
  oldValue?: unknown;
  newValue?: unknown;
}

/**
 * Record an audit trail entry in the database.
 * Does not throw if logging fails, but logs an error to avoid interrupting the main transaction.
 */
export async function createAuditLog(params: AuditLogParams): Promise<void> {
  try {
    const userId = params.userId ?? params.req?.user?.id;
    const userEmail = params.userEmail ?? params.req?.user?.email;

    let ipAddress: string | undefined;
    let userAgent: string | undefined;

    if (params.req) {
      const forwarded = params.req.headers['x-forwarded-for'];
      ipAddress = Array.isArray(forwarded)
        ? forwarded[0]
        : (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : params.req.socket?.remoteAddress);
      userAgent = params.req.headers['user-agent'];
    }

    await prisma.auditLog.create({
      data: {
        user_id: userId,
        user_email: userEmail,
        action: params.action,
        resource: params.resource,
        resource_id: params.resourceId !== undefined ? String(params.resourceId) : null,
        old_value: params.oldValue !== undefined ? JSON.parse(JSON.stringify(params.oldValue)) : null,
        new_value: params.newValue !== undefined ? JSON.parse(JSON.stringify(params.newValue)) : null,
        ip_address: ipAddress || null,
        user_agent: userAgent || null,
      },
    });
  } catch (err) {
    logger.error('Failed to write audit log entry', { err, params });
  }
}

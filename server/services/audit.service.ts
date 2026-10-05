import { execute, query } from '../db/connection.ts';
import { Request } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.ts';

export interface AuditLogEntry {
  id: number;
  user_id: number | null;
  username?: string;
  user_email?: string;
  user_role?: string;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_value: any;
  new_value: any;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export async function recordAuditLog(params: {
  userId?: number | null;
  action: string;
  entityType: string;
  entityId?: string | number | null;
  oldValue?: any;
  newValue?: any;
  req?: Request | AuthenticatedRequest;
}): Promise<void> {
  try {
    const ipAddress = params.req ? (params.req.headers['x-forwarded-for'] as string || params.req.socket.remoteAddress || '127.0.0.1') : '127.0.0.1';
    const userAgent = params.req ? (params.req.headers['user-agent'] || 'Server') : 'Server';

    let resolvedUserId = params.userId;
    if (resolvedUserId === undefined && params.req && (params.req as AuthenticatedRequest).user) {
      resolvedUserId = (params.req as AuthenticatedRequest).user?.id || null;
    }

    const oldValStr = params.oldValue !== undefined ? JSON.stringify(params.oldValue) : null;
    const newValStr = params.newValue !== undefined ? JSON.stringify(params.newValue) : null;
    const entityIdStr = params.entityId !== undefined && params.entityId !== null ? String(params.entityId) : null;

    await execute(
      `INSERT INTO audit_logs (user_id, action, entity_type, entity_id, old_value, new_value, ip_address, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [resolvedUserId || null, params.action, params.entityType, entityIdStr, oldValStr, newValStr, ipAddress, userAgent]
    );
  } catch (error) {
    console.error('[Audit Log] Failed to write audit log entry:', error);
  }
}

export async function getAuditLogs(options?: {
  limit?: number;
  offset?: number;
  action?: string;
  entityType?: string;
  userId?: number;
}): Promise<{ logs: AuditLogEntry[]; total: number }> {
  const limit = options?.limit || 50;
  const offset = options?.offset || 0;
  const whereClauses: string[] = [];
  const params: any[] = [];

  if (options?.action) {
    whereClauses.push('a.action = ?');
    params.push(options.action);
  }
  if (options?.entityType) {
    whereClauses.push('a.entity_type = ?');
    params.push(options.entityType);
  }
  if (options?.userId) {
    whereClauses.push('a.user_id = ?');
    params.push(options.userId);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const totalRow = await query<{ count: number }>(
    `SELECT COUNT(*) AS count FROM audit_logs a ${whereSql};`,
    params
  );
  const total = totalRow[0]?.count || 0;

  const rows = await query<any>(
    `SELECT a.*, u.username, u.email as user_email, u.role as user_role
     FROM audit_logs a
     LEFT JOIN users u ON a.user_id = u.id
     ${whereSql}
     ORDER BY a.id DESC
     LIMIT ? OFFSET ?;`,
    [...params, limit, offset]
  );

  const logs: AuditLogEntry[] = rows.map(r => ({
    id: r.id,
    user_id: r.user_id,
    username: r.username || 'System',
    user_email: r.user_email,
    user_role: r.user_role,
    action: r.action,
    entity_type: r.entity_type,
    entity_id: r.entity_id,
    old_value: r.old_value ? safeJsonParse(r.old_value) : null,
    new_value: r.new_value ? safeJsonParse(r.new_value) : null,
    ip_address: r.ip_address,
    user_agent: r.user_agent,
    created_at: r.created_at
  }));

  return { logs, total };
}

function safeJsonParse(val: string): any {
  try {
    return JSON.parse(val);
  } catch {
    return val;
  }
}

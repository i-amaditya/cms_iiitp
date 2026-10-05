import { query, queryOne, execute } from '../db/connection.ts';
import { recordAuditLog } from './audit.service.ts';
import { Request } from 'express';

export interface Department {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  description: string | null;
  is_active: number;
  display_order: number;
  created_at?: string;
  updated_at?: string;
  faculty_count?: number;
}

export async function getAllDepartments(onlyActive: boolean = false): Promise<Department[]> {
  const whereSql = onlyActive ? 'WHERE d.is_active = 1' : '';
  const rows = await query<any>(
    `SELECT d.*, COUNT(f.id) as faculty_count
     FROM departments d
     LEFT JOIN faculty f ON d.id = f.department_id AND f.status = 'PUBLISHED' AND f.is_active = 1
     ${whereSql}
     GROUP BY d.id
     ORDER BY d.display_order ASC, d.name ASC;`
  );
  return rows;
}

export async function getDepartmentById(id: number): Promise<Department | null> {
  return queryOne<Department>('SELECT * FROM departments WHERE id = ?;', [id]);
}

export async function createDepartment(
  data: { name: string; short_name: string; slug: string; description?: string; display_order?: number },
  userId: number,
  req?: Request
): Promise<Department> {
  const existing = await queryOne('SELECT id FROM departments WHERE slug = ?;', [data.slug]);
  if (existing) {
    throw new Error(`A department with slug '${data.slug}' already exists`);
  }

  const { lastInsertId } = await execute(
    `INSERT INTO departments (name, short_name, slug, description, display_order, is_active)
     VALUES (?, ?, ?, ?, ?, 1);`,
    [data.name, data.short_name, data.slug, data.description || null, data.display_order || 0]
  );

  const created = await getDepartmentById(lastInsertId);

  await recordAuditLog({
    userId,
    action: 'DEPARTMENT_CREATED',
    entityType: 'department',
    entityId: lastInsertId,
    newValue: created,
    req
  });

  return created!;
}

export async function updateDepartment(
  id: number,
  data: Partial<Department>,
  userId: number,
  req?: Request
): Promise<Department> {
  const existing = await getDepartmentById(id);
  if (!existing) {
    throw new Error('Department not found');
  }

  if (data.slug && data.slug !== existing.slug) {
    const slugTaken = await queryOne('SELECT id FROM departments WHERE slug = ? AND id != ?;', [data.slug, id]);
    if (slugTaken) {
      throw new Error(`Slug '${data.slug}' is already taken by another department`);
    }
  }

  await execute(
    `UPDATE departments 
     SET name = COALESCE(?, name),
         short_name = COALESCE(?, short_name),
         slug = COALESCE(?, slug),
         description = COALESCE(?, description),
         display_order = COALESCE(?, display_order),
         is_active = COALESCE(?, is_active),
         updated_at = datetime('now')
     WHERE id = ?;`,
    [
      data.name !== undefined ? data.name : null,
      data.short_name !== undefined ? data.short_name : null,
      data.slug !== undefined ? data.slug : null,
      data.description !== undefined ? data.description : null,
      data.display_order !== undefined ? data.display_order : null,
      data.is_active !== undefined ? (data.is_active ? 1 : 0) : null,
      id
    ]
  );

  const updated = await getDepartmentById(id);

  await recordAuditLog({
    userId,
    action: 'DEPARTMENT_UPDATED',
    entityType: 'department',
    entityId: id,
    oldValue: existing,
    newValue: updated,
    req
  });

  return updated!;
}

export async function deleteDepartment(id: number, userId: number, req?: Request): Promise<void> {
  const facultyCount = await queryOne<{ count: number }>(
    'SELECT COUNT(*) as count FROM faculty WHERE department_id = ?;',
    [id]
  );

  if (facultyCount && facultyCount.count > 0) {
    throw new Error(`Cannot delete department: ${facultyCount.count} faculty member(s) are currently associated with it. Please reassign them first.`);
  }

  const existing = await getDepartmentById(id);
  await execute('DELETE FROM departments WHERE id = ?;', [id]);

  await recordAuditLog({
    userId,
    action: 'DEPARTMENT_DELETED',
    entityType: 'department',
    entityId: id,
    oldValue: existing,
    req
  });
}

import { query, queryOne, execute } from '../db/connection.ts';
import { recordAuditLog } from './audit.service.ts';
import { Request } from 'express';

export interface FacultyFilterOptions {
  departmentId?: number;
  departmentSlug?: string;
  designation?: string;
  status?: string;
  search?: string;
  isActive?: boolean;
}

export interface FacultyProfileComplete {
  id: number;
  employee_id: string;
  title: string;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  full_name: string;
  designation: string;
  department_id: number;
  department_name?: string;
  department_short_name?: string;
  department_slug?: string;
  faculty_type: string;
  email: string;
  alternate_email?: string | null;
  phone?: string | null;
  office_location?: string | null;
  office_room?: string | null;
  profile_photo?: string | null;
  profile_slug: string;
  highest_qualification?: string | null;
  specialization?: string | null;
  research_interests?: string | null;
  areas_of_expertise?: string | null;
  biography?: string | null;
  source_data?: Record<string, unknown> | null;
  academic_experience?: string | null;
  industry_experience?: string | null;
  research_keywords?: string | null;
  google_scholar_url?: string | null;
  orcid_url?: string | null;
  scopus_url?: string | null;
  researchgate_url?: string | null;
  vidwan_url?: string | null;
  linkedin_url?: string | null;
  display_order: number;
  status: 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED';
  rejection_reason?: string | null;
  rejected_by?: number | null;
  rejected_by_name?: string | null;
  rejected_at?: string | null;
  is_active: number;
  created_at?: string;
  updated_at?: string;
  education?: any[];
  experience?: any[];
  publications?: any[];
  patents?: any[];
  assigned_user?: { id: number; username: string; email: string } | null;
}

/**
 * Public List of Faculty Members
 * Returns published or pending-review active faculty with safe public fields.
 */
export async function getPublicFacultyList(options?: FacultyFilterOptions) {
  const whereClauses: string[] = ["f.status IN ('PUBLISHED', 'PENDING_APPROVAL')", "f.is_active = 1", "d.is_active = 1"];
  const params: any[] = [];

  if (options?.departmentSlug) {
    whereClauses.push("d.slug = ?");
    params.push(options.departmentSlug);
  } else if (options?.departmentId) {
    whereClauses.push("f.department_id = ?");
    params.push(options.departmentId);
  }

  if (options?.designation) {
    whereClauses.push("f.designation = ?");
    params.push(options.designation);
  }

  if (options?.search) {
    const searchPattern = `%${options.search.toLowerCase()}%`;
    whereClauses.push("(LOWER(f.full_name) LIKE ? OR LOWER(f.specialization) LIKE ? OR LOWER(f.research_keywords) LIKE ? OR LOWER(f.email) LIKE ?)");
    params.push(searchPattern, searchPattern, searchPattern, searchPattern);
  }

  const sql = `
    SELECT 
      f.id, f.employee_id, f.title, f.first_name, f.last_name, f.full_name,
      f.designation, f.department_id, f.faculty_type, f.email, f.office_location,
      f.office_room, f.profile_photo, f.profile_slug, f.highest_qualification,
      f.specialization, f.research_interests, f.research_keywords,
      f.google_scholar_url, f.orcid_url, f.scopus_url, f.linkedin_url, f.display_order, f.status,
      d.name as department_name, d.short_name as department_short_name, d.slug as department_slug
    FROM faculty f
    JOIN departments d ON f.department_id = d.id
    WHERE ${whereClauses.join(" AND ")}
    ORDER BY f.display_order ASC, f.id ASC;
  `;

  return query(sql, params);
}

/**
 * Public Single Faculty Profile with full relational details.
 * Supports slug, employee_id, and id lookups with case-insensitivity,
 * and allows privileged previews for administrators and profile owners.
 */
export async function getPublicFacultyBySlug(
  slug: string,
  authContext?: { isAdmin?: boolean; userId?: number; facultyId?: number | null }
): Promise<FacultyProfileComplete | null> {
  const trimmed = (slug || '').trim();
  if (!trimmed) return null;

  const faculty = await queryOne<any>(
    `SELECT 
      f.id, f.employee_id, f.title, f.first_name, f.middle_name, f.last_name, f.full_name,
      f.designation, f.department_id, f.faculty_type, f.email, f.alternate_email, f.phone,
      f.office_location, f.office_room, f.profile_photo, f.profile_slug, f.highest_qualification,
      f.specialization, f.research_interests, f.areas_of_expertise, f.biography,
      f.academic_experience, f.industry_experience, f.research_keywords, f.profile_data,
      f.google_scholar_url, f.orcid_url, f.scopus_url, f.researchgate_url, f.vidwan_url, f.linkedin_url,
      f.display_order, f.status, f.is_active,
      d.name as department_name, d.short_name as department_short_name, d.slug as department_slug
    FROM faculty f
    JOIN departments d ON f.department_id = d.id
    WHERE (LOWER(f.profile_slug) = LOWER(?) OR f.employee_id = ? OR CAST(f.id AS TEXT) = ?);`,
    [trimmed, trimmed, trimmed]
  );

  if (!faculty) return null;

  const isOwner = Boolean(authContext?.facultyId && authContext.facultyId === faculty.id);
  const isAdmin = Boolean(authContext?.isAdmin);
  const isPrivileged = isAdmin || isOwner;

  // Non-privileged visitors can view active faculty profiles with PUBLISHED or PENDING_APPROVAL status
  if (!isPrivileged) {
    if (!faculty.is_active || (faculty.status !== 'PUBLISHED' && faculty.status !== 'PENDING_APPROVAL')) {
      return null;
    }
  }

  const [education, experience, publications, patents] = await Promise.all([
    query('SELECT * FROM faculty_education WHERE faculty_id = ? ORDER BY display_order ASC, id ASC;', [faculty.id]),
    query('SELECT * FROM faculty_experience WHERE faculty_id = ? ORDER BY display_order ASC, id ASC;', [faculty.id]),
    query('SELECT * FROM faculty_publications WHERE faculty_id = ? ORDER BY publication_year DESC, id DESC;', [faculty.id]),
    query('SELECT * FROM faculty_patents WHERE faculty_id = ? ORDER BY filing_date DESC, id DESC;', [faculty.id])
  ]);

  const { profile_data: profileData, ...publicFaculty } = faculty;
  return {
    ...publicFaculty,
    source_data: profileData ? JSON.parse(profileData) as Record<string, unknown> : null,
    education,
    experience,
    publications,
    patents
  };
}

/**
 * Admin view: List all faculty with status, filters, and assigned user accounts
 */
export async function getAdminFacultyList(options?: FacultyFilterOptions) {
  const whereClauses: string[] = [];
  const params: any[] = [];

  if (options?.departmentId) {
    whereClauses.push("f.department_id = ?");
    params.push(options.departmentId);
  }

  if (options?.designation) {
    whereClauses.push("f.designation = ?");
    params.push(options.designation);
  }

  if (options?.status) {
    whereClauses.push("f.status = ?");
    params.push(options.status);
  }

  if (options?.isActive !== undefined) {
    whereClauses.push("f.is_active = ?");
    params.push(options.isActive ? 1 : 0);
  }

  if (options?.search) {
    const searchPattern = `%${options.search.toLowerCase()}%`;
    whereClauses.push("(LOWER(f.full_name) LIKE ? OR LOWER(f.employee_id) LIKE ? OR LOWER(f.email) LIKE ?)");
    params.push(searchPattern, searchPattern, searchPattern);
  }

  const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const sql = `
    SELECT 
      f.*,
      d.name as department_name, d.short_name as department_short_name, d.slug as department_slug,
      u.id as user_id, u.username as user_username, u.email as user_email,
      r.username as rejected_by_name
    FROM faculty f
    JOIN departments d ON f.department_id = d.id
    LEFT JOIN users u ON u.faculty_id = f.id
    LEFT JOIN users r ON f.rejected_by = r.id
    ${whereSql}
    ORDER BY f.display_order ASC, f.id ASC;
  `;

  return query(sql, params);
}

/**
 * Fetch complete faculty profile by ID with all relational collections
 */
export async function getFacultyById(id: number): Promise<FacultyProfileComplete | null> {
  const faculty = await queryOne<any>(
    `SELECT 
      f.*,
      d.name as department_name, d.short_name as department_short_name, d.slug as department_slug,
      u.id as user_id, u.username as user_username, u.email as user_email,
      r.username as rejected_by_name
    FROM faculty f
    JOIN departments d ON f.department_id = d.id
    LEFT JOIN users u ON u.faculty_id = f.id
    LEFT JOIN users r ON f.rejected_by = r.id
    WHERE f.id = ?;`,
    [id]
  );

  if (!faculty) return null;

  const [education, experience, publications, patents] = await Promise.all([
    query('SELECT * FROM faculty_education WHERE faculty_id = ? ORDER BY display_order ASC, id ASC;', [id]),
    query('SELECT * FROM faculty_experience WHERE faculty_id = ? ORDER BY display_order ASC, id ASC;', [id]),
    query('SELECT * FROM faculty_publications WHERE faculty_id = ? ORDER BY publication_year DESC, id DESC;', [id]),
    query('SELECT * FROM faculty_patents WHERE faculty_id = ? ORDER BY filing_date DESC, id DESC;', [id])
  ]);

  return {
    ...faculty,
    education,
    experience,
    publications,
    patents,
    assigned_user: faculty.user_id ? {
      id: faculty.user_id,
      username: faculty.user_username,
      email: faculty.user_email
    } : null
  };
}

/**
 * Create Faculty Profile
 */
export async function createFaculty(
  data: Partial<FacultyProfileComplete> & {
    education?: any[];
    experience?: any[];
    publications?: any[];
    patents?: any[];
  },
  userId: number,
  req?: Request
): Promise<FacultyProfileComplete> {
  // Validate duplicate employee_id, email, or profile_slug
  const existing = await queryOne(
    'SELECT id FROM faculty WHERE employee_id = ? OR email = ? OR profile_slug = ?;',
    [data.employee_id, data.email, data.profile_slug]
  );
  if (existing) {
    throw new Error('A faculty member with this Employee ID, Email, or Profile URL Slug already exists.');
  }

  // Construct full_name if not explicitly given
  const fullName = data.full_name || [data.title, data.first_name, data.middle_name, data.last_name].filter(Boolean).join(' ');

  const { lastInsertId } = await execute(
    `INSERT INTO faculty (
      employee_id, title, first_name, middle_name, last_name, full_name,
      designation, department_id, faculty_type, email, alternate_email, phone,
      office_location, office_room, profile_photo, profile_slug, highest_qualification,
      specialization, research_interests, areas_of_expertise, biography,
      academic_experience, industry_experience, research_keywords,
      google_scholar_url, orcid_url, scopus_url, researchgate_url, vidwan_url, linkedin_url,
      display_order, status, is_active
    ) VALUES (
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?
    );`,
    [
      data.employee_id, data.title || 'Dr.', data.first_name, data.middle_name || null, data.last_name, fullName,
      data.designation, data.department_id, data.faculty_type || 'Regular', data.email, data.alternate_email || null, data.phone || null,
      data.office_location || null, data.office_room || null, data.profile_photo || null, data.profile_slug, data.highest_qualification || null,
      data.specialization || null, data.research_interests || null, data.areas_of_expertise || null, data.biography || null,
      data.academic_experience || null, data.industry_experience || null, data.research_keywords || null,
      data.google_scholar_url || null, data.orcid_url || null, data.scopus_url || null, data.researchgate_url || null, data.vidwan_url || null, data.linkedin_url || null,
      data.display_order || 0, data.status || 'DRAFT', data.is_active !== undefined ? (data.is_active ? 1 : 0) : 1
    ]
  );

  const facultyId = lastInsertId;

  // Insert child records
  await saveChildCollections(facultyId, data);

  const created = await getFacultyById(facultyId);

  // Version snapshot
  await execute(
    `INSERT INTO faculty_profile_versions (faculty_id, changed_by, change_type, new_data, status)
     VALUES (?, ?, 'CREATED', ?, ?);`,
    [facultyId, userId, JSON.stringify(created), created?.status || 'DRAFT']
  );

  await recordAuditLog({
    userId,
    action: 'PROFILE_CREATED',
    entityType: 'faculty',
    entityId: facultyId,
    newValue: created,
    req
  });

  return created!;
}

/**
 * Update Faculty Profile (Admin or Faculty Self-Service)
 */
export async function updateFaculty(
  id: number,
  data: Partial<FacultyProfileComplete> & {
    education?: any[];
    experience?: any[];
    publications?: any[];
    patents?: any[];
    submitForApprovalImmediately?: boolean;
  },
  userId: number,
  isSelfService: boolean = false,
  req?: Request
): Promise<FacultyProfileComplete> {
  const current = await getFacultyById(id);
  if (!current) {
    throw new Error('Faculty profile not found');
  }

  // Check unique constraints on slug or email changes
  if (data.profile_slug && data.profile_slug !== current.profile_slug) {
    const slugTaken = await queryOne('SELECT id FROM faculty WHERE profile_slug = ? AND id != ?;', [data.profile_slug, id]);
    if (slugTaken) throw new Error(`Profile slug '${data.profile_slug}' is already taken.`);
  }

  if (data.email && data.email !== current.email) {
    const emailTaken = await queryOne('SELECT id FROM faculty WHERE email = ? AND id != ?;', [data.email, id]);
    if (emailTaken) throw new Error(`Email '${data.email}' is already taken.`);
  }

  const fullName = data.full_name || [
    data.title !== undefined ? data.title : current.title,
    data.first_name !== undefined ? data.first_name : current.first_name,
    data.middle_name !== undefined ? data.middle_name : current.middle_name,
    data.last_name !== undefined ? data.last_name : current.last_name
  ].filter(Boolean).join(' ');

  // Workflow status logic
  let nextStatus = current.status;
  let rejectionReason = current.rejection_reason;
  let rejectedBy = current.rejected_by;
  let rejectedAt = current.rejected_at;

  if (isSelfService) {
    // When faculty edits:
    // If they click "Submit for Approval", status becomes PENDING_APPROVAL
    // If they click "Save Draft", status becomes DRAFT
    if (data.submitForApprovalImmediately) {
      nextStatus = 'PENDING_APPROVAL';
      rejectionReason = null;
      rejectedBy = null;
      rejectedAt = null;
    } else if (current.status === 'PUBLISHED') {
      // Editing a published profile without submitting for approval keeps draft state or flags pending
      nextStatus = 'DRAFT';
    } else if (current.status === 'REJECTED') {
      nextStatus = 'DRAFT';
    }
  } else {
    // Admin directly updating status
    if (data.status) {
      nextStatus = data.status;
      if (nextStatus !== 'REJECTED') {
        rejectionReason = null;
        rejectedBy = null;
        rejectedAt = null;
      }
    }
  }

  await execute(
    `UPDATE faculty SET
      employee_id = COALESCE(?, employee_id),
      title = COALESCE(?, title),
      first_name = COALESCE(?, first_name),
      middle_name = COALESCE(?, middle_name),
      last_name = COALESCE(?, last_name),
      full_name = ?,
      designation = COALESCE(?, designation),
      department_id = COALESCE(?, department_id),
      faculty_type = COALESCE(?, faculty_type),
      email = COALESCE(?, email),
      alternate_email = COALESCE(?, alternate_email),
      phone = COALESCE(?, phone),
      office_location = COALESCE(?, office_location),
      office_room = COALESCE(?, office_room),
      profile_photo = COALESCE(?, profile_photo),
      profile_slug = COALESCE(?, profile_slug),
      highest_qualification = COALESCE(?, highest_qualification),
      specialization = COALESCE(?, specialization),
      research_interests = COALESCE(?, research_interests),
      areas_of_expertise = COALESCE(?, areas_of_expertise),
      biography = COALESCE(?, biography),
      academic_experience = COALESCE(?, academic_experience),
      industry_experience = COALESCE(?, industry_experience),
      research_keywords = COALESCE(?, research_keywords),
      google_scholar_url = COALESCE(?, google_scholar_url),
      orcid_url = COALESCE(?, orcid_url),
      scopus_url = COALESCE(?, scopus_url),
      researchgate_url = COALESCE(?, researchgate_url),
      vidwan_url = COALESCE(?, vidwan_url),
      linkedin_url = COALESCE(?, linkedin_url),
      display_order = COALESCE(?, display_order),
      status = ?,
      rejection_reason = ?,
      rejected_by = ?,
      rejected_at = ?,
      is_active = COALESCE(?, is_active),
      updated_at = datetime('now')
    WHERE id = ?;`,
    [
      data.employee_id !== undefined ? data.employee_id : null,
      data.title !== undefined ? data.title : null,
      data.first_name !== undefined ? data.first_name : null,
      data.middle_name !== undefined ? data.middle_name : null,
      data.last_name !== undefined ? data.last_name : null,
      fullName,
      data.designation !== undefined ? data.designation : null,
      data.department_id !== undefined ? data.department_id : null,
      data.faculty_type !== undefined ? data.faculty_type : null,
      data.email !== undefined ? data.email : null,
      data.alternate_email !== undefined ? data.alternate_email : null,
      data.phone !== undefined ? data.phone : null,
      data.office_location !== undefined ? data.office_location : null,
      data.office_room !== undefined ? data.office_room : null,
      data.profile_photo !== undefined ? data.profile_photo : null,
      data.profile_slug !== undefined ? data.profile_slug : null,
      data.highest_qualification !== undefined ? data.highest_qualification : null,
      data.specialization !== undefined ? data.specialization : null,
      data.research_interests !== undefined ? data.research_interests : null,
      data.areas_of_expertise !== undefined ? data.areas_of_expertise : null,
      data.biography !== undefined ? data.biography : null,
      data.academic_experience !== undefined ? data.academic_experience : null,
      data.industry_experience !== undefined ? data.industry_experience : null,
      data.research_keywords !== undefined ? data.research_keywords : null,
      data.google_scholar_url !== undefined ? data.google_scholar_url : null,
      data.orcid_url !== undefined ? data.orcid_url : null,
      data.scopus_url !== undefined ? data.scopus_url : null,
      data.researchgate_url !== undefined ? data.researchgate_url : null,
      data.vidwan_url !== undefined ? data.vidwan_url : null,
      data.linkedin_url !== undefined ? data.linkedin_url : null,
      data.display_order !== undefined ? data.display_order : null,
      nextStatus,
      rejectionReason,
      rejectedBy,
      rejectedAt,
      data.is_active !== undefined ? (data.is_active ? 1 : 0) : null,
      id
    ]
  );

  // Replace child collections if provided in payload
  if (data.education !== undefined || data.experience !== undefined || data.publications !== undefined || data.patents !== undefined) {
    await saveChildCollections(id, data);
  }

  const updated = await getFacultyById(id);

  // Version snapshot
  const changeType = data.submitForApprovalImmediately
    ? 'SUBMITTED_FOR_APPROVAL'
    : (isSelfService ? 'DRAFT_SAVED' : 'ADMIN_EDIT');

  await execute(
    `INSERT INTO faculty_profile_versions (faculty_id, changed_by, change_type, old_data, new_data, status)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [id, userId, changeType, JSON.stringify(current), JSON.stringify(updated), nextStatus]
  );

  await recordAuditLog({
    userId,
    action: isSelfService ? 'PROFILE_EDITED_BY_FACULTY' : 'PROFILE_EDITED_BY_ADMIN',
    entityType: 'faculty',
    entityId: id,
    oldValue: { status: current.status, fullName: current.full_name },
    newValue: { status: updated?.status, fullName: updated?.full_name },
    req
  });

  return updated!;
}

/**
 * Submit for Approval
 */
export async function submitFacultyForApproval(facultyId: number, userId: number, req?: Request) {
  const current = await getFacultyById(facultyId);
  if (!current) throw new Error('Faculty profile not found');

  await execute(
    `UPDATE faculty 
     SET status = 'PENDING_APPROVAL', rejection_reason = NULL, rejected_by = NULL, rejected_at = NULL, updated_at = datetime('now')
     WHERE id = ?;`,
    [facultyId]
  );

  const updated = await getFacultyById(facultyId);

  await execute(
    `INSERT INTO faculty_profile_versions (faculty_id, changed_by, change_type, old_data, new_data, status)
     VALUES (?, ?, 'SUBMITTED_FOR_APPROVAL', ?, ?, 'PENDING_APPROVAL');`,
    [facultyId, userId, JSON.stringify(current), JSON.stringify(updated)]
  );

  await recordAuditLog({
    userId,
    action: 'PROFILE_SUBMITTED',
    entityType: 'faculty',
    entityId: facultyId,
    newValue: { status: 'PENDING_APPROVAL' },
    req
  });

  return updated;
}

/**
 * Admin: Approve Faculty Profile -> PUBLISHED
 */
export async function approveFacultyProfile(facultyId: number, adminUserId: number, req?: Request) {
  const current = await getFacultyById(facultyId);
  if (!current) throw new Error('Faculty profile not found');

  await execute(
    `UPDATE faculty 
     SET status = 'PUBLISHED', is_active = 1, rejection_reason = NULL, rejected_by = NULL, rejected_at = NULL, updated_at = datetime('now')
     WHERE id = ?;`,
    [facultyId]
  );

  const updated = await getFacultyById(facultyId);

  await execute(
    `INSERT INTO faculty_profile_versions (faculty_id, changed_by, change_type, old_data, new_data, status, approved_at, approved_by)
     VALUES (?, ?, 'APPROVED', ?, ?, 'PUBLISHED', datetime('now'), ?);`,
    [facultyId, adminUserId, JSON.stringify(current), JSON.stringify(updated), adminUserId]
  );

  await recordAuditLog({
    userId: adminUserId,
    action: 'PROFILE_APPROVED',
    entityType: 'faculty',
    entityId: facultyId,
    oldValue: { status: current.status },
    newValue: { status: 'PUBLISHED' },
    req
  });

  return updated;
}

/**
 * Admin: Reject Faculty Profile
 */
export async function rejectFacultyProfile(facultyId: number, adminUserId: number, rejectionReason: string, req?: Request) {
  if (!rejectionReason || rejectionReason.trim().length === 0) {
    throw new Error('A rejection reason must be provided');
  }

  const current = await getFacultyById(facultyId);
  if (!current) throw new Error('Faculty profile not found');

  await execute(
    `UPDATE faculty 
     SET status = 'REJECTED', rejection_reason = ?, rejected_by = ?, rejected_at = datetime('now'), updated_at = datetime('now')
     WHERE id = ?;`,
    [rejectionReason.trim(), adminUserId, facultyId]
  );

  const updated = await getFacultyById(facultyId);

  await execute(
    `INSERT INTO faculty_profile_versions (faculty_id, changed_by, change_type, old_data, new_data, status, rejection_reason)
     VALUES (?, ?, 'REJECTED', ?, ?, 'REJECTED', ?);`,
    [facultyId, adminUserId, JSON.stringify(current), JSON.stringify(updated), rejectionReason.trim()]
  );

  await recordAuditLog({
    userId: adminUserId,
    action: 'PROFILE_REJECTED',
    entityType: 'faculty',
    entityId: facultyId,
    oldValue: { status: current.status },
    newValue: { status: 'REJECTED', rejectionReason: rejectionReason.trim() },
    req
  });

  return updated;
}

/**
 * Reorder Faculty display order
 */
export async function reorderFaculty(orderedIds: number[], adminUserId: number, req?: Request) {
  for (let index = 0; index < orderedIds.length; index++) {
    const id = orderedIds[index];
    await execute('UPDATE faculty SET display_order = ? WHERE id = ?;', [index + 1, id]);
  }

  await recordAuditLog({
    userId: adminUserId,
    action: 'FACULTY_REORDERED',
    entityType: 'faculty',
    newValue: { order: orderedIds },
    req
  });
}

/**
 * Delete Faculty Profile
 */
export async function deleteFaculty(facultyId: number, adminUserId: number, req?: Request) {
  const current = await getFacultyById(facultyId);
  if (!current) throw new Error('Faculty profile not found');

  // Remove foreign link in users
  await execute('UPDATE users SET faculty_id = NULL WHERE faculty_id = ?;', [facultyId]);
  // Cascade delete child tables
  await execute('DELETE FROM faculty_education WHERE faculty_id = ?;', [facultyId]);
  await execute('DELETE FROM faculty_experience WHERE faculty_id = ?;', [facultyId]);
  await execute('DELETE FROM faculty_publications WHERE faculty_id = ?;', [facultyId]);
  await execute('DELETE FROM faculty_patents WHERE faculty_id = ?;', [facultyId]);
  await execute('DELETE FROM faculty_profile_versions WHERE faculty_id = ?;', [facultyId]);
  await execute('DELETE FROM faculty WHERE id = ?;', [facultyId]);

  await recordAuditLog({
    userId: adminUserId,
    action: 'PROFILE_DELETED',
    entityType: 'faculty',
    entityId: facultyId,
    oldValue: { fullName: current.full_name, employeeId: current.employee_id, email: current.email },
    req
  });
}

/**
 * Version History for a Faculty Profile
 */
export async function getFacultyVersionHistory(facultyId: number) {
  const rows = await query<any>(
    `SELECT v.*, u.username as changed_by_name, a.username as approved_by_name
     FROM faculty_profile_versions v
     LEFT JOIN users u ON v.changed_by = u.id
     LEFT JOIN users a ON v.approved_by = a.id
     WHERE v.faculty_id = ?
     ORDER BY v.id DESC;`,
    [facultyId]
  );

  return rows.map(r => ({
    id: r.id,
    faculty_id: r.faculty_id,
    changed_by: r.changed_by,
    changed_by_name: r.changed_by_name || 'System',
    change_type: r.change_type,
    old_data: r.old_data ? JSON.parse(r.old_data) : null,
    new_data: r.new_data ? JSON.parse(r.new_data) : null,
    status: r.status,
    submitted_at: r.submitted_at,
    approved_at: r.approved_at,
    approved_by: r.approved_by,
    approved_by_name: r.approved_by_name,
    rejection_reason: r.rejection_reason,
    created_at: r.created_at
  }));
}

/**
 * Child collection synchronizer (Education, Experience, Publications, Patents)
 */
async function saveChildCollections(
  facultyId: number,
  data: {
    education?: any[];
    experience?: any[];
    publications?: any[];
    patents?: any[];
  }
) {
  if (data.education !== undefined) {
    await execute('DELETE FROM faculty_education WHERE faculty_id = ?;', [facultyId]);
    for (let i = 0; i < data.education.length; i++) {
      const item = data.education[i];
      if (!item.degree || !item.institution) continue;
      await execute(
        `INSERT INTO faculty_education (faculty_id, degree, specialization, institution, year, description, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [facultyId, item.degree, item.specialization || null, item.institution, item.year || null, item.description || null, i + 1]
      );
    }
  }

  if (data.experience !== undefined) {
    await execute('DELETE FROM faculty_experience WHERE faculty_id = ?;', [facultyId]);
    for (let i = 0; i < data.experience.length; i++) {
      const item = data.experience[i];
      if (!item.organization || !item.designation) continue;
      await execute(
        `INSERT INTO faculty_experience (faculty_id, organization, designation, start_date, end_date, description, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [facultyId, item.organization, item.designation, item.start_date || null, item.end_date || null, item.description || null, i + 1]
      );
    }
  }

  if (data.publications !== undefined) {
    await execute('DELETE FROM faculty_publications WHERE faculty_id = ?;', [facultyId]);
    for (let i = 0; i < data.publications.length; i++) {
      const item = data.publications[i];
      if (!item.title || !item.authors) continue;
      await execute(
        `INSERT INTO faculty_publications (faculty_id, title, authors, journal_or_conference, publication_year, doi, url, publication_type)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          facultyId,
          item.title,
          item.authors,
          item.journal_or_conference || 'Peer Reviewed',
          item.publication_year ? parseInt(item.publication_year, 10) : null,
          item.doi || null,
          item.url || null,
          item.publication_type || 'Journal'
        ]
      );
    }
  }

  if (data.patents !== undefined) {
    await execute('DELETE FROM faculty_patents WHERE faculty_id = ?;', [facultyId]);
    for (let i = 0; i < data.patents.length; i++) {
      const item = data.patents[i];
      if (!item.title) continue;
      await execute(
        `INSERT INTO faculty_patents (faculty_id, title, patent_number, status, filing_date, publication_date, inventors, url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          facultyId,
          item.title,
          item.patent_number || null,
          item.status || 'Published',
          item.filing_date || null,
          item.publication_date || null,
          item.inventors || null,
          item.url || null
        ]
      );
    }
  }
}

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'FACULTY';

export type FacultyStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'PUBLISHED' | 'REJECTED' | 'ARCHIVED';

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  facultyId: number | null;
  isActive?: boolean;
  lastLogin?: string | null;
  createdAt?: string;
  facultyName?: string;
  employeeId?: string;
  designation?: string;
  departmentShortName?: string;
  faculty?: {
    fullName: string;
    designation: string;
    profileSlug: string;
    profilePhoto?: string | null;
    status: FacultyStatus;
    rejectionReason?: string | null;
  } | null;
}

export interface Department {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  description: string | null;
  is_active: number | boolean;
  display_order: number;
  faculty_count?: number;
}

export interface EducationItem {
  id?: number;
  degree: string;
  specialization?: string;
  institution: string;
  year?: string;
  description?: string;
}

export interface ExperienceItem {
  id?: number;
  organization: string;
  designation: string;
  start_date?: string;
  end_date?: string;
  description?: string;
}

export interface PublicationItem {
  id?: number;
  title: string;
  authors: string;
  journal_or_conference: string;
  publication_year?: number | string;
  doi?: string;
  url?: string;
  publication_type: 'Journal' | 'Conference' | 'Book Chapter' | 'Book' | 'Workshop' | 'Patent' | 'Preprint';
}

export interface PatentItem {
  id?: number;
  title: string;
  patent_number?: string;
  status: 'Filed' | 'Published' | 'Granted' | 'Commercialized';
  filing_date?: string;
  publication_date?: string;
  inventors?: string;
  url?: string;
}

export interface Faculty {
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
  status: FacultyStatus;
  rejection_reason?: string | null;
  rejected_by?: number | null;
  rejected_by_name?: string | null;
  rejected_at?: string | null;
  is_active: number | boolean;
  created_at?: string;
  updated_at?: string;
  education?: EducationItem[];
  experience?: ExperienceItem[];
  publications?: PublicationItem[];
  patents?: PatentItem[];
  user_id?: number | null;
  user_username?: string | null;
  user_email?: string | null;
  assigned_user?: {
    id: number;
    username: string;
    email: string;
  } | null;
}

export interface ProfileVersion {
  id: number;
  faculty_id: number;
  changed_by: number | null;
  changed_by_name: string;
  change_type: string;
  old_data: Faculty | null;
  new_data: Faculty | null;
  status: FacultyStatus;
  submitted_at: string;
  approved_at?: string | null;
  approved_by?: number | null;
  approved_by_name?: string | null;
  rejection_reason?: string | null;
  created_at: string;
}

export interface AuditLog {
  id: number;
  user_id: number | null;
  username: string;
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

export interface DashboardStats {
  totalFaculty: number;
  publishedFaculty: number;
  pendingApproval: number;
  totalDepartments: number;
  totalUsers: number;
}

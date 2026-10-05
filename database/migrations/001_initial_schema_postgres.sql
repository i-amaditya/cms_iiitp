-- ==============================================================================
-- Indian Institute of Information Technology Pune (IIIT Pune)
-- CMS Architecture - Database Schema Migration for PostgreSQL
-- Module: Faculty Management & Core CMS Foundation
-- Version: 1.0.0
-- Compatible with: PostgreSQL 14+, Cloud SQL for PostgreSQL, Supabase, Neon
-- ==============================================================================

-- 1. DEPARTMENTS TABLE
-- Reusable across academic modules (Faculty, Students, Courses, Research)
CREATE TABLE IF NOT EXISTS departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_departments_slug ON departments(slug);
CREATE INDEX IF NOT EXISTS idx_departments_active ON departments(is_active);

-- 2. FACULTY PROFILES TABLE
-- Master record for faculty members
CREATE TABLE IF NOT EXISTS faculty (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(20) NOT NULL DEFAULT 'Dr.',
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    full_name VARCHAR(250) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department_id INT NOT NULL REFERENCES departments(id) ON DELETE RESTRICT,
    faculty_type VARCHAR(50) NOT NULL DEFAULT 'Regular', -- Regular, Adjunct, Visiting, Emeritus, Guest
    email VARCHAR(150) NOT NULL UNIQUE,
    alternate_email VARCHAR(150),
    phone VARCHAR(50),
    office_location VARCHAR(150),
    office_room VARCHAR(50),
    profile_photo VARCHAR(255),
    profile_slug VARCHAR(150) NOT NULL UNIQUE,
    
    -- Academic Credentials
    highest_qualification VARCHAR(150),
    specialization TEXT,
    research_interests TEXT,
    areas_of_expertise TEXT,
    biography TEXT,
    academic_experience TEXT,
    industry_experience TEXT,
    
    -- Research & Professional Profiles
    research_keywords TEXT,
    google_scholar_url VARCHAR(255),
    orcid_url VARCHAR(255),
    scopus_url VARCHAR(255),
    researchgate_url VARCHAR(255),
    vidwan_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    
    -- CMS Governance & Publishing Workflow
    display_order INT NOT NULL DEFAULT 0,
    status VARCHAR(30) NOT NULL DEFAULT 'DRAFT', -- DRAFT, PENDING_APPROVAL, PUBLISHED, REJECTED, ARCHIVED
    rejection_reason TEXT,
    rejected_by INT,
    rejected_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_faculty_slug ON faculty(profile_slug);
CREATE INDEX IF NOT EXISTS idx_faculty_dept ON faculty(department_id);
CREATE INDEX IF NOT EXISTS idx_faculty_status ON faculty(status, is_active);
CREATE INDEX IF NOT EXISTS idx_faculty_order ON faculty(display_order);

-- 3. USERS & CMS ACCESS CONTROL (RBAC)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(30) NOT NULL DEFAULT 'FACULTY', -- SUPER_ADMIN, ADMIN, FACULTY
    faculty_id INT REFERENCES faculty(id) ON DELETE SET NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_faculty_id ON users(faculty_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Now add foreign key constraint on faculty.rejected_by
ALTER TABLE faculty ADD CONSTRAINT fk_faculty_rejected_by FOREIGN KEY (rejected_by) REFERENCES users(id) ON DELETE SET NULL;

-- 4. FACULTY EDUCATION
CREATE TABLE IF NOT EXISTS faculty_education (
    id SERIAL PRIMARY KEY,
    faculty_id INT NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    degree VARCHAR(100) NOT NULL,
    specialization VARCHAR(150),
    institution VARCHAR(200) NOT NULL,
    year VARCHAR(20),
    description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_faculty_education_faculty ON faculty_education(faculty_id);

-- 5. FACULTY EXPERIENCE
CREATE TABLE IF NOT EXISTS faculty_experience (
    id SERIAL PRIMARY KEY,
    faculty_id INT NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    organization VARCHAR(200) NOT NULL,
    designation VARCHAR(150) NOT NULL,
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    description TEXT,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_faculty_experience_faculty ON faculty_experience(faculty_id);

-- 6. FACULTY PUBLICATIONS (Normalized relational storage)
CREATE TABLE IF NOT EXISTS faculty_publications (
    id SERIAL PRIMARY KEY,
    faculty_id INT NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    journal_or_conference TEXT NOT NULL,
    publication_year INT,
    doi VARCHAR(100),
    url VARCHAR(255),
    publication_type VARCHAR(50) NOT NULL DEFAULT 'Journal', -- Journal, Conference, Book Chapter, Book, Workshop, Patent, Preprint
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_publications_faculty ON faculty_publications(faculty_id);
CREATE INDEX IF NOT EXISTS idx_publications_year ON faculty_publications(publication_year DESC);

-- 7. FACULTY PATENTS
CREATE TABLE IF NOT EXISTS faculty_patents (
    id SERIAL PRIMARY KEY,
    faculty_id INT NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    patent_number VARCHAR(100),
    status VARCHAR(50) NOT NULL DEFAULT 'Published', -- Filed, Published, Granted, Commercialized
    filing_date VARCHAR(50),
    publication_date VARCHAR(50),
    inventors TEXT,
    url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_patents_faculty ON faculty_patents(faculty_id);

-- 8. FACULTY PROFILE VERSIONS & APPROVAL AUDIT
CREATE TABLE IF NOT EXISTS faculty_profile_versions (
    id SERIAL PRIMARY KEY,
    faculty_id INT NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    changed_by INT REFERENCES users(id) ON DELETE SET NULL,
    change_type VARCHAR(50) NOT NULL, -- DRAFT_SAVED, SUBMITTED_FOR_APPROVAL, APPROVED, REJECTED, ADMIN_DIRECT_EDIT
    old_data JSONB,
    new_data JSONB,
    status VARCHAR(30) NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP WITH TIME ZONE,
    approved_by INT REFERENCES users(id) ON DELETE SET NULL,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_profile_versions_faculty ON faculty_profile_versions(faculty_id);

-- 9. AUDIT LOGS (System-wide traceable actions)
CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id VARCHAR(50),
    old_value JSONB,
    new_value JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

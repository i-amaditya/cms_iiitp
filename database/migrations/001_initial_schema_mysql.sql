-- ==============================================================================
-- Indian Institute of Information Technology Pune (IIIT Pune)
-- CMS Architecture - Database Schema Migration for MySQL / MariaDB
-- Module: Faculty Management & Core CMS Foundation
-- Target: MySQL 8.0+ / MariaDB 10.4+ (Compatible with Hostinger cPanel / VPS)
-- Engine: InnoDB with UTF8MB4 Unicode charset
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS `departments` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `short_name` VARCHAR(50) NOT NULL,
    `slug` VARCHAR(100) NOT NULL UNIQUE,
    `description` TEXT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `display_order` INT NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_dept_slug` (`slug`),
    INDEX `idx_dept_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. FACULTY TABLE
CREATE TABLE IF NOT EXISTS `faculty` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `employee_id` VARCHAR(50) NOT NULL UNIQUE,
    `title` VARCHAR(20) NOT NULL DEFAULT 'Dr.',
    `first_name` VARCHAR(100) NOT NULL,
    `middle_name` VARCHAR(100) NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `full_name` VARCHAR(250) NOT NULL,
    `designation` VARCHAR(100) NOT NULL,
    `department_id` INT NOT NULL,
    `faculty_type` VARCHAR(50) NOT NULL DEFAULT 'Regular',
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `alternate_email` VARCHAR(150) NULL,
    `phone` VARCHAR(50) NULL,
    `office_location` VARCHAR(150) NULL,
    `office_room` VARCHAR(50) NULL,
    `profile_photo` VARCHAR(255) NULL,
    `profile_slug` VARCHAR(150) NOT NULL UNIQUE,
    
    -- Academic Credentials
    `highest_qualification` VARCHAR(150) NULL,
    `specialization` TEXT NULL,
    `research_interests` TEXT NULL,
    `areas_of_expertise` TEXT NULL,
    `biography` TEXT NULL,
    `academic_experience` TEXT NULL,
    `industry_experience` TEXT NULL,
    
    -- Research & Academic Portals
    `research_keywords` TEXT NULL,
    `google_scholar_url` VARCHAR(255) NULL,
    `orcid_url` VARCHAR(255) NULL,
    `scopus_url` VARCHAR(255) NULL,
    `researchgate_url` VARCHAR(255) NULL,
    `vidwan_url` VARCHAR(255) NULL,
    `linkedin_url` VARCHAR(255) NULL,
    
    -- Publishing and Workflow State
    `display_order` INT NOT NULL DEFAULT 0,
    `status` ENUM('DRAFT', 'PENDING_APPROVAL', 'PUBLISHED', 'REJECTED', 'ARCHIVED') NOT NULL DEFAULT 'DRAFT',
    `rejection_reason` TEXT NULL,
    `rejected_by` INT NULL,
    `rejected_at` DATETIME NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX `idx_fac_slug` (`profile_slug`),
    INDEX `idx_fac_dept` (`department_id`),
    INDEX `idx_fac_status` (`status`, `is_active`),
    INDEX `idx_fac_order` (`display_order`),
    CONSTRAINT `fk_faculty_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. USERS TABLE (RBAC & Auth)
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `password_change_required` TINYINT(1) NOT NULL DEFAULT 0,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'FACULTY') NOT NULL DEFAULT 'FACULTY',
    `faculty_id` INT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `last_login` DATETIME NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX `idx_users_role` (`role`),
    INDEX `idx_users_faculty` (`faculty_id`),
    CONSTRAINT `fk_users_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add rejected_by foreign key to faculty table
ALTER TABLE `faculty` ADD CONSTRAINT `fk_faculty_rejected_by` FOREIGN KEY (`rejected_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

-- 4. FACULTY EDUCATION
CREATE TABLE IF NOT EXISTS `faculty_education` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `faculty_id` INT NOT NULL,
    `degree` VARCHAR(100) NOT NULL,
    `specialization` VARCHAR(150) NULL,
    `institution` VARCHAR(200) NOT NULL,
    `year` VARCHAR(20) NULL,
    `description` TEXT NULL,
    `display_order` INT NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    INDEX `idx_edu_faculty` (`faculty_id`),
    CONSTRAINT `fk_edu_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. FACULTY EXPERIENCE
CREATE TABLE IF NOT EXISTS `faculty_experience` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `faculty_id` INT NOT NULL,
    `organization` VARCHAR(200) NOT NULL,
    `designation` VARCHAR(150) NOT NULL,
    `start_date` VARCHAR(50) NULL,
    `end_date` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `display_order` INT NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    INDEX `idx_exp_faculty` (`faculty_id`),
    CONSTRAINT `fk_exp_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. FACULTY PUBLICATIONS
CREATE TABLE IF NOT EXISTS `faculty_publications` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `faculty_id` INT NOT NULL,
    `title` TEXT NOT NULL,
    `authors` TEXT NOT NULL,
    `journal_or_conference` TEXT NOT NULL,
    `publication_year` INT NULL,
    `doi` VARCHAR(100) NULL,
    `url` VARCHAR(255) NULL,
    `publication_type` ENUM('Journal', 'Conference', 'Book Chapter', 'Book', 'Workshop', 'Patent', 'Preprint') NOT NULL DEFAULT 'Journal',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX `idx_pub_faculty` (`faculty_id`),
    INDEX `idx_pub_year` (`publication_year`),
    CONSTRAINT `fk_pub_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. FACULTY PATENTS
CREATE TABLE IF NOT EXISTS `faculty_patents` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `faculty_id` INT NOT NULL,
    `title` TEXT NOT NULL,
    `patent_number` VARCHAR(100) NULL,
    `status` ENUM('Filed', 'Published', 'Granted', 'Commercialized') NOT NULL DEFAULT 'Published',
    `filing_date` VARCHAR(50) NULL,
    `publication_date` VARCHAR(50) NULL,
    `inventors` TEXT NULL,
    `url` VARCHAR(255) NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX `idx_pat_faculty` (`faculty_id`),
    CONSTRAINT `fk_pat_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. FACULTY PROFILE VERSIONS
CREATE TABLE IF NOT EXISTS `faculty_profile_versions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `faculty_id` INT NOT NULL,
    `changed_by` INT NULL,
    `change_type` VARCHAR(50) NOT NULL,
    `old_data` LONGTEXT NULL,
    `new_data` LONGTEXT NULL,
    `status` VARCHAR(30) NOT NULL,
    `submitted_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `approved_at` DATETIME NULL,
    `approved_by` INT NULL,
    `rejection_reason` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    INDEX `idx_ver_faculty` (`faculty_id`),
    CONSTRAINT `fk_ver_faculty` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_ver_user` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. AUDIT LOGS
CREATE TABLE IF NOT EXISTS `audit_logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NULL,
    `action` VARCHAR(100) NOT NULL,
    `entity_type` VARCHAR(50) NOT NULL,
    `entity_id` VARCHAR(50) NULL,
    `old_value` LONGTEXT NULL,
    `new_value` LONGTEXT NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    INDEX `idx_aud_user` (`user_id`),
    INDEX `idx_aud_action` (`action`),
    INDEX `idx_aud_created` (`created_at`),
    CONSTRAINT `fk_aud_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

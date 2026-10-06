-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `name` TEXT NOT NULL,
    `google_sub` VARCHAR(255) NULL,
    `avatar_url` TEXT NULL,
    `role` ENUM('admin', 'editor', 'faculty') NOT NULL DEFAULT 'editor',
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `last_login_at` DATETIME(3) NULL,
    `token_version` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_google_sub_key`(`google_sub`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'editor', 'faculty') NOT NULL,
    `sections` JSON NULL,
    `invited_by` INTEGER NULL,
    `token` VARCHAR(128) NOT NULL,
    `accepted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NULL,

    UNIQUE INDEX `invites_email_key`(`email`),
    UNIQUE INDEX `invites_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `editor_section_assignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `section` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `editor_section_assignments_user_id_section_key`(`user_id`, `section`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty_profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(255) NOT NULL,
    `user_id` INTEGER NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` TEXT NOT NULL,
    `designation` TEXT NULL,
    `department` VARCHAR(20) NULL,
    `bio` TEXT NULL,
    `education` TEXT NULL,
    `expertise` TEXT NULL,
    `phone` TEXT NULL,
    `linkedin_url` TEXT NULL,
    `google_scholar` TEXT NULL,
    `orcid` TEXT NULL,
    `scopus_url` TEXT NULL,
    `resume_url` TEXT NULL,
    `photo_url` TEXT NULL,
    `is_published` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `faculty_profiles_slug_key`(`slug`),
    UNIQUE INDEX `faculty_profiles_user_id_key`(`user_id`),
    UNIQUE INDEX `faculty_profiles_email_key`(`email`),
    INDEX `faculty_profiles_department_is_published_idx`(`department`, `is_published`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty_publications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `faculty_id` INTEGER NOT NULL,
    `title` TEXT NOT NULL,
    `authors` TEXT NULL,
    `journal` TEXT NULL,
    `year` SMALLINT NULL,
    `doi_or_link` TEXT NULL,
    `pub_type` VARCHAR(30) NOT NULL DEFAULT 'journal',
    `display_order` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty_projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `faculty_id` INTEGER NOT NULL,
    `title` TEXT NOT NULL,
    `funding_agency` TEXT NULL,
    `amount` TEXT NULL,
    `duration` TEXT NULL,
    `status` VARCHAR(20) NOT NULL DEFAULT 'ongoing',
    `display_order` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty_patents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `faculty_id` INTEGER NOT NULL,
    `title` TEXT NOT NULL,
    `patent_number` TEXT NULL,
    `status` TEXT NULL,
    `year` SMALLINT NULL,
    `display_order` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty_seminars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `faculty_id` INTEGER NOT NULL,
    `title` TEXT NOT NULL,
    `event_name` TEXT NULL,
    `venue` TEXT NULL,
    `date_text` TEXT NULL,
    `display_order` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `faculty_supervisions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `faculty_id` INTEGER NOT NULL,
    `student_name` TEXT NULL,
    `degree` VARCHAR(20) NULL,
    `topic` TEXT NULL,
    `status` VARCHAR(20) NULL,
    `year` SMALLINT NULL,
    `display_order` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notices` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `category` VARCHAR(100) NULL,
    `link_url` TEXT NULL,
    `file_url` TEXT NULL,
    `notice_date` DATE NOT NULL,
    `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    `draft_title` TEXT NULL,
    `draft_category` VARCHAR(100) NULL,
    `draft_link_url` TEXT NULL,
    `draft_file_url` TEXT NULL,
    `draft_notice_date` DATE NULL,
    `has_unpublished_draft` BOOLEAN NOT NULL DEFAULT false,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `notices_status_notice_date_idx`(`status`, `notice_date` DESC),
    INDEX `notices_category_status_idx`(`category`, `status`),
    FULLTEXT INDEX `notices_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `excerpt` TEXT NULL,
    `link_url` TEXT NULL,
    `file_url` TEXT NULL,
    `news_date` DATE NOT NULL,
    `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    `draft_title` TEXT NULL,
    `draft_excerpt` TEXT NULL,
    `draft_link_url` TEXT NULL,
    `draft_file_url` TEXT NULL,
    `draft_news_date` DATE NULL,
    `has_unpublished_draft` BOOLEAN NOT NULL DEFAULT false,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `news_status_news_date_idx`(`status`, `news_date` DESC),
    FULLTEXT INDEX `news_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `careers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `career_type` VARCHAR(10) NOT NULL DEFAULT 'live',
    `post_date` DATE NULL,
    `last_date` DATE NULL,
    `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    `draft_title` TEXT NULL,
    `draft_last_date` DATE NULL,
    `has_unpublished_draft` BOOLEAN NOT NULL DEFAULT false,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `careers_career_type_status_last_date_idx`(`career_type`, `status`, `last_date` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `career_buttons` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `career_id` INTEGER NOT NULL,
    `label` VARCHAR(100) NOT NULL,
    `url` TEXT NULL,
    `file_url` TEXT NULL,
    `display_order` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etenders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `tender_number` TEXT NULL,
    `tender_type` VARCHAR(10) NOT NULL DEFAULT 'live',
    `file_url` TEXT NULL,
    `corrigendum_url` TEXT NULL,
    `submission_date` TEXT NULL,
    `status` ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    `draft_title` TEXT NULL,
    `draft_file_url` TEXT NULL,
    `draft_corrigendum_url` TEXT NULL,
    `has_unpublished_draft` BOOLEAN NOT NULL DEFAULT false,
    `created_by` INTEGER NULL,
    `updated_by` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `etenders_tender_type_status_idx`(`tender_type`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `scholarships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sr_no` SMALLINT NULL,
    `category` TEXT NULL,
    `scheme_name` TEXT NOT NULL,
    `governed_by` TEXT NULL,
    `link_url` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `non_teaching_staff` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `designation` TEXT NULL,
    `department` TEXT NULL,
    `department_short` TEXT NULL,
    `photo_url` TEXT NULL,
    `email` TEXT NULL,
    `staff_type` VARCHAR(20) NOT NULL DEFAULT 'Regular',
    `display_order` SMALLINT NOT NULL DEFAULT 0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alumni` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `branch_year` TEXT NULL,
    `alumni_type` TEXT NULL,
    `university` TEXT NULL,
    `degree` TEXT NULL,
    `company` TEXT NULL,
    `batch` TEXT NULL,
    `display_order` SMALLINT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mous` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `organization` TEXT NOT NULL,
    `department` TEXT NULL,
    `signed_date` TEXT NULL,
    `valid_till` TEXT NULL,
    `description` TEXT NULL,
    `logo_url` TEXT NULL,
    `year` SMALLINT NULL,
    `tags` JSON NULL,
    `gallery_urls` JSON NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `press_coverage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `press_date` TEXT NULL,
    `description` TEXT NULL,
    `articles` JSON NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media_files` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(255) NOT NULL,
    `original_name` VARCHAR(255) NULL,
    `mime_type` VARCHAR(100) NULL,
    `size_bytes` INTEGER NULL,
    `url` TEXT NOT NULL,
    `storage_path` TEXT NULL,
    `is_pdf` BOOLEAN NOT NULL DEFAULT false,
    `uploaded_by` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `media_files_uploaded_by_created_at_idx`(`uploaded_by`, `created_at` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NULL,
    `user_email` VARCHAR(255) NULL,
    `action` VARCHAR(50) NOT NULL,
    `resource` VARCHAR(100) NOT NULL,
    `resource_id` VARCHAR(50) NULL,
    `old_value` JSON NULL,
    `new_value` JSON NULL,
    `ip_address` VARCHAR(50) NULL,
    `user_agent` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_resource_created_at_idx`(`resource`, `created_at` DESC),
    INDEX `audit_logs_user_id_created_at_idx`(`user_id`, `created_at` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `invites` ADD CONSTRAINT `invites_invited_by_fkey` FOREIGN KEY (`invited_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `editor_section_assignments` ADD CONSTRAINT `editor_section_assignments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faculty_profiles` ADD CONSTRAINT `faculty_profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faculty_publications` ADD CONSTRAINT `faculty_publications_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faculty_projects` ADD CONSTRAINT `faculty_projects_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faculty_patents` ADD CONSTRAINT `faculty_patents_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faculty_seminars` ADD CONSTRAINT `faculty_seminars_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faculty_supervisions` ADD CONSTRAINT `faculty_supervisions_faculty_id_fkey` FOREIGN KEY (`faculty_id`) REFERENCES `faculty_profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notices` ADD CONSTRAINT `notices_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notices` ADD CONSTRAINT `notices_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `news_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `news_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `careers` ADD CONSTRAINT `careers_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `careers` ADD CONSTRAINT `careers_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `career_buttons` ADD CONSTRAINT `career_buttons_career_id_fkey` FOREIGN KEY (`career_id`) REFERENCES `careers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `etenders` ADD CONSTRAINT `etenders_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `etenders` ADD CONSTRAINT `etenders_updated_by_fkey` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `media_files` ADD CONSTRAINT `media_files_uploaded_by_fkey` FOREIGN KEY (`uploaded_by`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

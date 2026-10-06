# IIIT Pune Website → Backend CMS: Implementation Plan

> **Codebase snapshot (Aug 2026)**: React 19 + Vite + TailwindCSS v3, hosted on Vercel.
> 13 JSON data files in `src/data/`, 105 page components, ~19 public asset directories.
> No existing backend or database.

---

## 1. Recommended Architecture

```
┌─────────────────────────────────────────────────┐
│  Browser                                        │
│  ┌──────────────┐  ┌──────────────────────────┐ │
│  │ Public Site  │  │  Admin Dashboard (SPA)   │ │
│  │ React/Vite   │  │  React/Vite (separate)   │ │
│  └──────┬───────┘  └────────────┬─────────────┘ │
└─────────┼──────────────────────┼────────────────┘
          │  REST/JSON           │  REST/JSON + JWT
          ▼                      ▼
┌────────────────────────────────────────────────┐
│              Node.js + Express API             │
│  ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │  Auth    │ │  CRUD    │ │  File Upload  │  │
│  │  Google  │ │  Router  │ │  (Multer)     │  │
│  │  OAuth2  │ │          │ │               │  │
│  └────┬─────┘ └────┬─────┘ └───────┬───────┘  │
└───────┼────────────┼───────────────┼────────────┘
        │            │               │
        ▼            ▼               ▼
┌──────────────┐  ┌──────────┐  ┌──────────────┐
│  PostgreSQL  │  │  Prisma  │  │ File Storage │
│  Database    │  │   ORM    │  │ (Cloudinary  │
│              │  │          │  │  or local)   │
└──────────────┘  └──────────┘  └──────────────┘
```

### Component Roles

| Layer | Technology | Hosting |
|---|---|---|
| Public Website | React 19 + Vite (existing) | Vercel (existing) |
| Admin Dashboard | React 19 + Vite (new SPA) | Vercel or same host |
| Backend API | Node.js + Express + Prisma | **Hostinger Cloud VPS** |
| Database | **MySQL** | **Hostinger Cloud (built-in)** |
| File Storage | **`/uploads` on Hostinger VPS disk** | Served via Nginx from Hostinger VPS |
| Auth | Google OAuth2 (via `google-auth-library`) | — |

---

## 2. Technology Stack Recommendation

### Comparison

| Criterion | **Node/Express + Prisma + MySQL** | NestJS + TypeORM | Django + DRF | Directus / Strapi |
|---|---|---|---|---|
| Team familiarity (JS) | ✅ High | ✅ High | ❌ Python switch | ✅ No-code UI |
| Custom auth logic | ✅ Full control | ✅ Full control | ✅ Full control | ⚠️ Plugin required |
| Invite-only login | ✅ Easy | ✅ Easy | ✅ Easy | ⚠️ Complex |
| Prisma schema-first | ✅ Yes (MySQL supported) | ⚠️ TypeORM | ✅ Django models | — |
| Student-team friendly | ✅ Very | ⚠️ Steep decorators | ❌ Python overhead | ✅ But rigid |
| Custom role rules | ✅ Middleware | ✅ Guards | ✅ Permissions | ⚠️ Limited |
| Audit log | ✅ Custom | ✅ Custom | ✅ django-auditlog | ⚠️ Built-in basic |
| Hostinger MySQL compat | ✅ Native | ✅ Native | ✅ Native | ✅ Native |

### ✅ Recommended: **Node.js + Express + Prisma + MySQL**

**Justification:**
- The team already writes JavaScript/JSX; switching to Python or NestJS decorators adds ramp-up time.
- Express is minimal — the team writes exactly what they need, no magic.
- Prisma gives type-safe DB access, auto-generated migrations, and a visual schema. **Prisma fully supports MySQL** — no adapter change needed.
- **Hostinger Cloud's built-in MySQL** eliminates a separate paid DB service. The database is already provisioned and accessible within the same server network (low latency).
- MySQL 8.0+ supports `JSON` columns (needed for `tags`, `gallery_urls`, etc.), `ENUM` types, and full-text indexing.
- Directus/Strapi would make invite-only Google-OAuth + custom role rules painful to customize; they're CMS frameworks, not just backends.

### Supporting Libraries

```
express              - HTTP server
prisma + @prisma/client - ORM + migrations
google-auth-library  - Google ID token verification
jsonwebtoken         - JWT issuance/verification
multer               - File upload middleware
sharp                - Image resize/thumbnail
express-rate-limit   - Rate limiting
helmet               - Security headers
cors                 - CORS config
zod                  - Request body validation
winston              - Structured logging
envalid              - Startup env-variable validation (fails fast if secrets are missing)
http-graceful-shutdown - Graceful shutdown (drains in-flight requests before process exit)
```

> [!IMPORTANT]
> **Production-grade additions over the baseline:** `envalid` validates every required env variable at startup, crashing loudly with a clear error rather than silently running with missing secrets. `http-graceful-shutdown` ensures that when PM2 restarts the process (e.g. after a deploy), in-flight API requests are not abruptly terminated — preventing data corruption on active file uploads or DB writes.

---

## 3. Database Schema Design

### 3.1 Users & Auth

> [!IMPORTANT]
> **MySQL-specific schema adjustments** (Hostinger Cloud uses MySQL 8.x):
> - MySQL uses `ENUM('val1','val2')` inline — Prisma handles this automatically via `enum` blocks.
> - No native array columns — use `JSON` columns for lists like `tags` and `gallery_urls`.
> - Use `DATETIME` or `TIMESTAMP` instead of `TIMESTAMPTZ`. Set `timezone: 'UTC'` in your MySQL connection.
> - In `prisma/schema.prisma`, set `provider = "mysql"` and set `url = env("DATABASE_URL")` pointing to your Hostinger MySQL credentials (`mysql://user:pass@localhost:3306/dbname`).
> - Primary keys: Use `@id @default(autoincrement())` — maps to `INT AUTO_INCREMENT` in MySQL.

```sql
-- Prisma schema enum (auto-maps to MySQL ENUM):
-- enum UserRole { admin editor faculty }

-- MySQL equivalent (Prisma generates this from schema.prisma):
CREATE TABLE users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE, -- must be @iiitp.ac.in
  name          TEXT NOT NULL,
  google_sub    VARCHAR(255) UNIQUE,          -- Google account subject ID (indexed; TEXT cannot be indexed)
  avatar_url    TEXT,
  role          user_role NOT NULL DEFAULT 'editor',
  is_active     BOOLEAN NOT NULL DEFAULT true,
  last_login_at DATETIME,                    -- [FIX #4] track for anomaly detection
  token_version INT NOT NULL DEFAULT 0,      -- [FIX #4] increment to invalidate all sessions instantly
  created_at    DATETIME DEFAULT NOW(),
  updated_at    DATETIME DEFAULT NOW()
);

-- [FIX #1] invites table now stores sections so they are not lost at claim-time
CREATE TABLE invites (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  role          user_role NOT NULL,
  sections      JSON,                        -- [FIX #1] stores ["notices","news"] for editor invites
  invited_by    INT REFERENCES users(id) ON DELETE SET NULL,
  token         VARCHAR(128) UNIQUE NOT NULL, -- one-time invite token
  accepted      BOOLEAN DEFAULT false,
  created_at    DATETIME DEFAULT NOW(),
  expires_at    DATETIME                     -- NULL = never expires
);

-- Editor section assignments
CREATE TABLE editor_section_assignments (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  section    VARCHAR(100) NOT NULL,  -- 'notices','news','careers','etenders', etc.
  UNIQUE(user_id, section)
);
```

> [!IMPORTANT]
> **[FIX #1 — Editor Sections Lost at Invite Claim]:** The `invites` table now carries a `sections` JSON column. When an admin creates an invite with sections `["notices","news"]`, those sections are stored in the invite row. When the invited editor logs in for the first time and claims the invite, the auth handler MUST read `invite.sections` and call `editorSectionAssignment.createMany()` **in the same DB transaction** before marking `accepted = true`. If the section insert fails, the invite claim rolls back atomically.

> [!IMPORTANT]
> **[FIX #4 — Instant Session Invalidation]:** The `token_version` column starts at 0 and is embedded in every JWT payload as `tv`. When an admin deactivates a user or logs them out forcibly, the backend increments `token_version`. The JWT middleware checks `decoded.tv === user.token_version` on **every request**. If they don't match, the token is rejected with 401 immediately — no waiting for token expiry.

### 3.2 Faculty Profiles

> Mirrors the structure of `faculty_details.json`. Each faculty user maps to exactly one profile via `email`.

```sql
CREATE TABLE faculty_profiles (
  id              SERIAL PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,        -- 'bhupendra-singh' (URL key)
  user_id         INTEGER REFERENCES users(id), -- NULL until faculty registers
  email           TEXT NOT NULL UNIQUE,
  name            TEXT NOT NULL,
  designation     TEXT,
  department      TEXT,                        -- 'CSE','ECE','ASH'
  bio             TEXT,
  education       TEXT,
  expertise       TEXT,
  phone           TEXT,
  linkedin_url    TEXT,
  google_scholar  TEXT,
  orcid           TEXT,
  scopus_url      TEXT,
  resume_url      TEXT,                        -- path in file storage
  photo_url       TEXT,
  is_published    BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE faculty_publications (
  id              SERIAL PRIMARY KEY,
  faculty_id      INTEGER REFERENCES faculty_profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  authors         TEXT,
  journal         TEXT,
  year            SMALLINT,
  doi_or_link     TEXT,
  pub_type        TEXT DEFAULT 'journal',     -- 'journal','conference','book_chapter'
  display_order   SMALLINT DEFAULT 0
);

CREATE TABLE faculty_projects (
  id              SERIAL PRIMARY KEY,
  faculty_id      INTEGER REFERENCES faculty_profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  funding_agency  TEXT,
  amount          TEXT,
  duration        TEXT,
  status          TEXT DEFAULT 'ongoing',     -- 'ongoing','completed'
  display_order   SMALLINT DEFAULT 0
);

CREATE TABLE faculty_patents (
  id              SERIAL PRIMARY KEY,
  faculty_id      INTEGER REFERENCES faculty_profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  patent_number   TEXT,
  status          TEXT,
  year            SMALLINT,
  display_order   SMALLINT DEFAULT 0
);

CREATE TABLE faculty_seminars (
  id              SERIAL PRIMARY KEY,
  faculty_id      INTEGER REFERENCES faculty_profiles(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  event_name      TEXT,
  venue           TEXT,
  date_text       TEXT,
  display_order   SMALLINT DEFAULT 0
);

CREATE TABLE faculty_supervisions (
  id              SERIAL PRIMARY KEY,
  faculty_id      INTEGER REFERENCES faculty_profiles(id) ON DELETE CASCADE,
  student_name    TEXT,
  degree          TEXT,                       -- 'PhD','MTech','BTech'
  topic           TEXT,
  status          TEXT,                       -- 'ongoing','completed'
  year            SMALLINT,
  display_order   SMALLINT DEFAULT 0
);
```

### 3.3 Notices, News, Careers, E-Tenders

> [!IMPORTANT]
> **[FIX #2 — Live Content Disappears on Edit]:** Every content table now has `draft_*` shadow columns for each major editable field, plus a `has_unpublished_draft BOOLEAN`. When an editor edits a *published* record, changes are written only to the `draft_*` fields and `has_unpublished_draft` is set `true` — **the live content is untouched**. An editor or admin then publishes the draft by copying `draft_*` fields into the live fields and resetting `has_unpublished_draft`. This is the "working copy" pattern used by WordPress and Contentful.

> [!NOTE]
> **[FIX #3 — FK Crash on User Delete]:** All `created_by` / `updated_by` FK columns use `ON DELETE SET NULL`. Deleting a user will never crash the DB with a FK constraint error. Historical content is preserved; authorship is marked `NULL`.

```sql
-- Shared content status enum (MySQL ENUM via Prisma)
-- enum ContentStatus { draft published archived }

CREATE TABLE notices (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  -- === LIVE (public) fields ===
  title                 TEXT NOT NULL,
  category              VARCHAR(100),                 -- 'Academic','Admissions','General'
  link_url              TEXT,
  file_url              TEXT,
  notice_date           DATE NOT NULL,
  status                ENUM('draft','published','archived') DEFAULT 'draft',
  -- === DRAFT (working copy) fields [FIX #2] ===
  draft_title           TEXT,
  draft_category        VARCHAR(100),
  draft_link_url        TEXT,
  draft_file_url        TEXT,
  draft_notice_date     DATE,
  has_unpublished_draft BOOLEAN NOT NULL DEFAULT false,
  -- === Audit ===
  created_by            INT REFERENCES users(id) ON DELETE SET NULL, -- [FIX #3]
  updated_by            INT REFERENCES users(id) ON DELETE SET NULL, -- [FIX #3]
  created_at            DATETIME DEFAULT NOW(),
  updated_at            DATETIME DEFAULT NOW(),
  -- === Search index [FIX #5] ===
  FULLTEXT INDEX ft_notices_title (title)
);

CREATE TABLE news (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  title                 TEXT NOT NULL,
  excerpt               TEXT,
  link_url              TEXT,
  file_url              TEXT,
  news_date             DATE NOT NULL,
  status                ENUM('draft','published','archived') DEFAULT 'draft',
  -- Draft fields [FIX #2]
  draft_title           TEXT,
  draft_excerpt         TEXT,
  draft_link_url        TEXT,
  draft_file_url        TEXT,
  draft_news_date       DATE,
  has_unpublished_draft BOOLEAN NOT NULL DEFAULT false,
  created_by            INT REFERENCES users(id) ON DELETE SET NULL, -- [FIX #3]
  updated_by            INT REFERENCES users(id) ON DELETE SET NULL, -- [FIX #3]
  created_at            DATETIME DEFAULT NOW(),
  updated_at            DATETIME DEFAULT NOW(),
  FULLTEXT INDEX ft_news_title (title)
);

CREATE TABLE careers (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  title                 TEXT NOT NULL,
  career_type           VARCHAR(10) DEFAULT 'live',    -- 'live','past'
  post_date             DATE,
  last_date             DATE,
  status                ENUM('draft','published','archived') DEFAULT 'draft',
  draft_title           TEXT,
  draft_last_date       DATE,
  has_unpublished_draft BOOLEAN NOT NULL DEFAULT false,
  created_by            INT REFERENCES users(id) ON DELETE SET NULL, -- [FIX #3]
  updated_by            INT REFERENCES users(id) ON DELETE SET NULL, -- [FIX #3]
  created_at            DATETIME DEFAULT NOW(),
  updated_at            DATETIME DEFAULT NOW()
);

CREATE TABLE career_buttons (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  career_id     INT NOT NULL REFERENCES careers(id) ON DELETE CASCADE,
  label         VARCHAR(100) NOT NULL,           -- 'Details','Apply Now','Result'
  url           TEXT,
  file_url      TEXT,
  display_order SMALLINT DEFAULT 0
);

CREATE TABLE etenders (
  id                    INT AUTO_INCREMENT PRIMARY KEY,
  title                 TEXT NOT NULL,
  tender_number         VARCHAR(100),
  tender_type           VARCHAR(10) DEFAULT 'live',  -- 'live','past'
  file_url              TEXT,
  corrigendum_url       TEXT,
  submission_date       TEXT,
  status                ENUM('draft','published','archived') DEFAULT 'draft',
  draft_title           TEXT,
  draft_file_url        TEXT,
  draft_corrigendum_url TEXT,
  has_unpublished_draft BOOLEAN NOT NULL DEFAULT false,
  created_by            INT REFERENCES users(id) ON DELETE SET NULL, -- [FIX #3]
  updated_by            INT REFERENCES users(id) ON DELETE SET NULL, -- [FIX #3]
  created_at            DATETIME DEFAULT NOW(),
  updated_at            DATETIME DEFAULT NOW()
);
```

### 3.4 Supplementary Content Tables

```sql
CREATE TABLE scholarships (
  id           SERIAL PRIMARY KEY,
  sr_no        SMALLINT,
  category     TEXT,                         -- 'National','Maharashtra', etc.
  scheme_name  TEXT NOT NULL,
  governed_by  TEXT,
  link_url     TEXT,
  is_active    BOOLEAN DEFAULT true
);

CREATE TABLE non_teaching_staff (
  id               SERIAL PRIMARY KEY,
  name             TEXT NOT NULL,
  designation      TEXT,
  department       TEXT,
  department_short TEXT,
  photo_url        TEXT,
  email            TEXT,
  staff_type       TEXT DEFAULT 'Regular',   -- 'Regular','Contract'
  display_order    SMALLINT DEFAULT 0,
  is_active        BOOLEAN DEFAULT true
);

CREATE TABLE alumni (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  branch_year  TEXT,                         -- 'CSE-2016-2020'
  alumni_type  TEXT,                         -- 'higher_ed_abroad','higher_ed_india','placement'
  university   TEXT,                         -- for higher_ed
  degree       TEXT,                         -- for higher_ed
  company      TEXT,                         -- for placement
  batch        TEXT,                         -- e.g. '2017_2021'
  display_order SMALLINT DEFAULT 0
);

CREATE TABLE mous (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  organization  TEXT NOT NULL,
  department    TEXT,
  signed_date   DATE,
  valid_till    DATE,
  description   TEXT,
  logo_url      TEXT,
  year          SMALLINT,
  tags          JSON,                        -- MySQL 8.0 JSON column (replaces PG array)
  gallery_urls  JSON,                        -- e.g. ["url1","url2"]
  is_active     BOOLEAN DEFAULT true
);

CREATE TABLE press_coverage (
  id          SERIAL PRIMARY KEY,
  title       TEXT NOT NULL,
  source      TEXT,
  link_url    TEXT,
  image_url   TEXT,
  press_date  DATE,
  is_active   BOOLEAN DEFAULT true
);
```

### 3.5 Media Files

```sql
CREATE TABLE media_files (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  filename       VARCHAR(255) NOT NULL,
  original_name  VARCHAR(255),
  mime_type      VARCHAR(100),
  size_bytes     INT,
  url            TEXT NOT NULL,             -- CDN / server URL
  storage_path   TEXT,                      -- relative path on disk / Cloudinary public_id
  is_pdf         BOOLEAN NOT NULL DEFAULT false, -- [FIX #6] tracked for Content-Disposition enforcement
  uploaded_by    INT REFERENCES users(id) ON DELETE SET NULL, -- [FIX #3]
  created_at     DATETIME DEFAULT NOW()
);
```

> [!CAUTION]
> **[FIX #6 — PDF XSS via Self-Hosted Files]:** When serving files from the VPS `/uploads` directory, the Nginx config MUST set `Content-Disposition: attachment` for all PDF responses. Without this, a browser may render the PDF inline and execute any embedded JavaScript, potentially stealing admin session cookies. See Section 10 (Deployment) for the exact Nginx directive. Cloudinary is the safer default as it enforces `Content-Disposition: attachment` automatically for non-image files.

### 3.6 Audit Logs

```sql
CREATE TABLE audit_logs (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  user_id      INT,                         -- NOT a FK — intentionally denormalized so log survives user deletion
  user_email   VARCHAR(255),                -- [FIX #3] snapshot of email at time of action
  action       VARCHAR(50) NOT NULL,        -- 'CREATE','UPDATE','DELETE','LOGIN','LOGOUT','INVITE','PUBLISH','REJECT'
  resource     VARCHAR(100) NOT NULL,       -- 'notice','faculty_profile','user', etc.
  resource_id  VARCHAR(50),                 -- ID of the affected record
  old_value    JSON,                        -- snapshot before change (MySQL JSON)
  new_value    JSON,                        -- snapshot after change
  ip_address   VARCHAR(50),
  user_agent   TEXT,
  created_at   DATETIME DEFAULT NOW()
);
CREATE INDEX idx_audit_resource ON audit_logs(resource, created_at DESC);
CREATE INDEX idx_audit_user ON audit_logs(user_id, created_at DESC);
```

> [!NOTE]
> `user_id` in `audit_logs` is deliberately **not a foreign key**. If a user is deleted from the `users` table, the audit trail must remain intact for compliance. Instead, `user_email` is snapshotted at log-write time. This makes the audit log a true append-only ledger that can never be invalidated by user deletions.

### 3.7 Approval Workflow (Removed)

> [!NOTE]
> The separate Content Approval workflow table has been removed in favor of a direct edit and publish model. Users with appropriate permissions can directly edit drafts and publish them.

### 3.8 DB-Level Performance Indexes

> [!TIP]
> These indexes must be added in Phase 1 migrations. They are critical for paginated list endpoints to be fast at production scale.

```sql
-- Notices: most common query pattern (public page)
CREATE INDEX idx_notices_status_date ON notices(status, notice_date DESC);
CREATE INDEX idx_notices_category ON notices(category, status);

-- News
CREATE INDEX idx_news_status_date ON news(status, news_date DESC);

-- Careers
CREATE INDEX idx_careers_type_status ON careers(career_type, status, last_date DESC);

-- E-Tenders
CREATE INDEX idx_etenders_type_status ON etenders(tender_type, status);

-- Faculty
CREATE INDEX idx_faculty_dept ON faculty_profiles(department, is_published);

-- Media files (admin library sort)
CREATE INDEX idx_media_uploader ON media_files(uploaded_by, created_at DESC);
```

---

## 4. Authorization Rules

### Role Matrix

| Action | `admin` | `editor` | `faculty` |
|---|:---:|:---:|:---:|
| Manage users (invite/deactivate) | ✅ | ❌ | ❌ |
| Assign editor sections | ✅ | ❌ | ❌ |
| View audit logs | ✅ | ❌ | ❌ |
| CRUD **all** notices/news/careers/tenders | ✅ | ✅ assigned sections only | ❌ |
| Publish (set status=published) | ✅ | ✅ | ❌ |
| View faculty profiles (all) | ✅ | ✅ | ✅ |
| Edit **own** faculty profile | ✅ | ❌ | ✅ own only |
| Edit **any** faculty profile | ✅ | ❌ | ❌ |
| Upload media files | ✅ | ✅ | ✅ (own profile only) |
| CRUD scholarships/staff/alumni/MoUs | ✅ | ✅ if assigned | ❌ |

### Faculty Self-Edit Rule

The backend middleware must enforce:
```
if (req.user.role === 'faculty') {
  const profile = await prisma.facultyProfile.findUnique({ where: { id: req.params.id } });
  if (profile.email !== req.user.email) → return 403 Forbidden
}
```

This maps by **email**, not just user ID, so it works even before the faculty account is linked.

### Editor Section Check

```
if (req.user.role === 'editor') {
  const allowed = await prisma.editorSectionAssignment.findFirst({
    where: { user_id: req.user.id, section: 'notices' }
  });
  if (!allowed) → return 403 Forbidden
}
```

---

## 5. API Design

### Base URL: `https://api.iiitp.ac.in/v1`

### 5.1 Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/auth/google` | Exchange Google ID token → issue JWT cookies | None |
| `GET` | `/auth/me` | Return current user profile + role | JWT |
| `POST` | `/auth/refresh` | Issue new access token using refresh cookie | Refresh cookie |
| `POST` | `/auth/logout` | Clear auth cookies + bump `token_version` | JWT |
| `GET` | `/health` | Liveness check (returns DB connectivity status) | None |

**POST /auth/google — Request:**
```json
{ "id_token": "<Google ID token from frontend OAuth flow>", "nonce": "<random-nonce>" }
```
**Response (200):**
```json
{ "user": { "id": 1, "email": "name@iiitp.ac.in", "role": "faculty", "name": "..." } }
```
> [!NOTE]
> Access and refresh tokens are set as **httpOnly, SameSite=Strict, Secure cookies** — they are NOT returned in the response body. This prevents any XSS script from reading them.

**Failure cases (401/403):**
- Google token invalid or expired
- `nonce` in token doesn't match submitted nonce (replay attack)
- Email domain ≠ `iiitp.ac.in`
- Email not found in `invites` table OR invite `accepted = true` already
- User `is_active = false` (deactivated account) → 403

**[FIX #7 — Faculty Profile Auto-Link on First Login]:**
On every successful login, if `user.role === 'faculty'`, the handler must attempt to link their account inside the login transaction:
```js
// In the login DB transaction (atomic with invite claim):
const profile = await prisma.facultyProfile.findUnique({ where: { email: user.email } });
if (profile && profile.user_id === null) {
  await prisma.facultyProfile.update({
    where: { id: profile.id },
    data: { user_id: user.id }
  });
} else if (!profile) {
  // Log a warning — admin needs to create a profile for this faculty member
  logger.warn(`Faculty ${user.email} logged in but has no faculty_profile row. Create one in admin.`);
}
```
This ensures a faculty member always sees their seeded profile on first login. If no profile exists, the admin is alerted via server logs.

### 5.2 User & Invite Management (admin only)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/admin/users` | List all users |
| `PATCH` | `/admin/users/:id` | Update role / deactivate |
| `POST` | `/admin/invites` | Create invite (email + role) |
| `GET` | `/admin/invites` | List all invites |
| `DELETE` | `/admin/invites/:id` | Revoke invite |
| `POST` | `/admin/users/:id/sections` | Assign sections to editor |
| `DELETE` | `/admin/users/:id/sections/:section` | Remove section from editor |

**POST /admin/invites — Body:**
```json
{ "email": "staff@iiitp.ac.in", "role": "editor", "sections": ["notices","news"] }
```

### 5.3 Notices

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/notices` | List (paginated, filterable, searchable) | Public |
| `GET` | `/notices/:id` | Single notice (returns live fields) | Public |
| `POST` | `/notices` | Create notice (saved as `draft`) | editor (notices) / admin |
| `PATCH` | `/notices/:id` | Update draft fields only | editor (notices) / admin |
| `DELETE` | `/notices/:id` | Delete notice (soft-delete or hard) | admin |
| `PATCH` | `/notices/:id/publish` | Copy draft fields to live fields → `published` | editor / admin |
| `PATCH` | `/notices/:id/archive` | Set status=archived | editor / admin |

> [!IMPORTANT]
> **[FIX #2 — Working Copy Pattern]:** `PATCH /notices/:id` ONLY writes to the `draft_*` columns and sets `has_unpublished_draft = true`. The live `title`, `link_url`, `file_url`, `notice_date` columns are **not touched**. The public `GET /notices` endpoint always reads live columns. `PATCH /notices/:id/publish` atomically copies `draft_*` → live fields and resets `has_unpublished_draft = false`. This guarantees that editors can never accidentally take down a published notice by saving a draft.

**GET /notices — Query params:** `?category=Academic&status=published&page=1&limit=20&search=admission`

> [!NOTE]
> **[FIX #5 — Server-Side Full-Text Search]:** The `search` param uses MySQL's `MATCH(title) AGAINST(? IN BOOLEAN MODE)` (powered by the `FULLTEXT INDEX` on `title`). Do **not** use `LIKE '%keyword%'` — it table-scans millions of rows. Since Prisma doesn't support `FULLTEXT` natively for `@db.Text` fields, implement this query via `prisma.$queryRaw`.

### 5.4 News, Careers, E-Tenders

Same RESTful pattern as notices, including the **working-copy draft/publish split** [FIX #2]:
- `GET/POST /news`, `PATCH/DELETE /news/:id`, `PATCH /news/:id/submit`, `PATCH /news/:id/publish`
- `GET/POST /careers`, `PATCH/DELETE /careers/:id`, `PATCH /careers/:id/submit`, `PATCH /careers/:id/publish`
- `GET/POST /etenders`, `PATCH/DELETE /etenders/:id`, `PATCH /etenders/:id/submit`, `PATCH /etenders/:id/publish`

All list endpoints support `?search=` full-text query. [FIX #5]

For careers, a sub-resource handles buttons:
- `POST /careers/:id/buttons`
- `PATCH /careers/:id/buttons/:btnId`
- `DELETE /careers/:id/buttons/:btnId`

### 5.5 Faculty Profiles

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/faculty` | List all published profiles | Public |
| `GET` | `/faculty/:slug` | Get profile by slug | Public |
| `PATCH` | `/faculty/:id` | Update profile | admin OR own faculty |
| `POST` | `/faculty/:id/publications` | Add publication | admin OR own faculty |
| `PATCH` | `/faculty/:id/publications/:pubId` | Edit publication | admin OR own faculty |
| `DELETE` | `/faculty/:id/publications/:pubId` | Delete | admin OR own faculty |
| *(same for projects, patents, seminars, supervisions)* | | | |

### 5.6 Media Upload

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/media/upload` | Upload file → returns URL | editor/admin/faculty |
| `GET` | `/media` | List files (admin media library) | admin |
| `DELETE` | `/media/:id` | Delete file | admin |

**POST /media/upload — multipart/form-data**
```
field: file  (PDF, JPG, PNG, WebP — max: images 5MB, PDFs 20MB)
field: context  (optional: 'notice','faculty','tender')
```
**Response:**
```json
{ "id": 45, "url": "https://res.cloudinary.com/iiitp/.../filename.pdf", "filename": "...", "is_pdf": true }
```

> [!CAUTION]
> **[FIX #6 — PDF Serving]:** When a client requests a self-hosted file with `is_pdf = true`, the backend MUST respond with `Content-Disposition: attachment; filename="originalname.pdf"`. This forces a download rather than inline rendering, preventing PDF-embedded JavaScript from executing in the browser and stealing admin session cookies. See the Nginx config in Section 10 for server-level enforcement.



### 5.8 Audit Logs

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/admin/audit-logs` | List logs (paginated) | admin |
| `GET` | `/admin/audit-logs?resource=notice&from=2026-01-01` | Filtered | admin |

### 5.9 Other Resources

| Resource | Endpoints |
|---|---|
| Scholarships | `GET/POST /scholarships`, `PATCH/DELETE /scholarships/:id` |
| Non-teaching staff | `GET/POST /staff`, `PATCH/DELETE /staff/:id` |
| Alumni | `GET/POST /alumni`, `PATCH/DELETE /alumni/:id` |
| MoUs | `GET/POST /mous`, `PATCH/DELETE /mous/:id` |
| Shortlistings | `GET/POST /shortlistings`, `PATCH/DELETE /shortlistings/:id` |
| Press | `GET/POST /press`, `PATCH/DELETE /press/:id` |

---

## 6. Frontend Migration Plan

### Strategy: **Parallel → Swap**

Keep JSON files in `src/data/` working during migration. Replace one section at a time with an API call. Old JSON stays as fallback until the endpoint is stable and seeded.

### Migration Priority Order

#### Priority 1 (Phase 5) — High-frequency updates

| Page | Current source | Migration approach |
|---|---|---|
| **Notices** | `src/data/notices.json` | `useFetch('/api/notices')` hook, replace array import |
| **News** | `src/data/news.json` | Same hook pattern |
| **Careers** | `src/data/careers.json` | `live`/`past` arrays become API query params |
| **E-Tenders** | `src/data/etenders.json` | Same, `live`/`past` filter |

**Migration snippet (NoticePage.jsx before):**
```js
import notices from '../data/notices.json';
```
**After:**
```js
const { data: notices, loading } = useApi('/notices?status=published&limit=50');
```

Create a shared `useApi(url)` hook that handles loading/error states and falls back gracefully.

#### Priority 2 (Phase 5) — Faculty profiles

`FacultyPage.jsx` and `FacultyProfilePage.jsx` import from `faculty_details.json` (276 KB, 4329 lines).
- Replace with `GET /faculty` (list) and `GET /faculty/:slug` (profile).
- Faculty can then log in and edit their own records via the dashboard.

#### Priority 3 (Phase 6) — Lower-frequency content (Deferred)

| Page | Source | Notes |
|---|---|---|
| Shortlistings | `shortlistings.json` | Complex nested structure; needs careful schema mapping |
| MoUs | `mous.json` | Gallery URLs need migration to file storage |
| Alumni | `alumni.json` | Nested groups; flatten into rows with `alumni_type` |
| Non-teaching staff | `non_teaching_staff.json` | Straightforward |
| Scholarships | `scholarshipsData.json` | Small table, easy |
| Press | `press.json` | — |

#### Priority 4 (Phase 6) — Hardcoded JSX pages

Pages like `CseDepartmentPage.jsx` (40 KB), `UgPgSchemesPage.jsx` (76 KB), `AshDepartmentPage.jsx` (35 KB) have content hardcoded in JSX. These are lowest priority — migrate only when content requires frequent updates.

---

## 7. Admin Dashboard Plan

**Tech**: Separate React + Vite app at `/admin` or `admin.iiitp.ac.in`.

### Screens

| Screen | Role access | Key features |
|---|---|---|
| **Login** | All | "Sign in with Google" button only. No username/password. |
| **Dashboard Home** | All | Quick stats: # notices, # recent updates, recent activity feed |
| **User Management** | admin | Table of users, invite form, role switcher, deactivate button |
| **Invites** | admin | List of pending invites, revoke, copy invite link |
| **Notices Manager** | admin, editor (notices) | Table with filters, Create/Edit modal, publish/archive toggle |
| **News Manager** | admin, editor (news) | Same pattern as notices |
| **Careers Manager** | admin, editor (careers) | Create job post, attach PDF/link buttons, set dates |
| **E-Tenders Manager** | admin, editor (etenders) | Tender number field, corrigendum upload, submission date |
| **Faculty Profile Editor** | admin, faculty (own) | Rich form: bio, education, + sub-lists for publications/projects/patents |
| **All Faculty Profiles** | admin | Browse/edit any profile |
| **Non-Teaching Staff** | admin | Table with photo upload |
| **Alumni** | admin | Table grouped by batch |
| **Scholarships** | admin | Simple table CRUD |
| **MoUs** | admin | Card-style list, gallery upload |
| **Shortlistings** | admin | Category accordion, candidate list, PDF upload |
| **Media Library** | admin | Grid of uploaded files, copy URL, delete |
| **Audit Log** | admin | Filterable table: who, what, when, old/new values |
| **My Profile (Faculty)** | faculty | Same as Faculty Profile Editor but scoped to own record |

### Dashboard UX Notes
- After login, redirect based on role: admin → dashboard home; faculty → "My Profile"; editor → their assigned section(s).
- Use a sidebar navigation that hides sections the user doesn't have access to.
- All delete actions require a confirmation dialog.
- Unsaved changes should warn before navigation.

---

## 8. Security Plan

### 8.1 Authentication Flow

```
1.  User clicks "Sign in with Google" (Google OAuth popup)
2.  Frontend generates a random nonce, stores it in sessionStorage
3.  Frontend receives id_token (JWT signed by Google)
4.  Frontend POSTs { id_token, nonce } to POST /auth/google
5.  Backend verifies token with google-auth-library:
    - Checks signature against Google's public keys
    - Checks aud matches your CLIENT_ID
    - Checks exp (not expired)
    - Checks nonce matches (prevents token replay attacks) [Security+]
6.  Backend extracts email from payload
7.  Backend checks: email domain === 'iiitp.ac.in' → else 401
8.  Backend checks: email EXISTS in invites table AND accepted = false → else 401
9.  Backend checks: if user row exists, is_active must be true → else 403
10. BEGIN TRANSACTION:
    a. Upsert user row (create if first login; update last_login_at + google_sub)
    b. If claiming invite: read invite.sections → insert editor_section_assignments
       → mark invite.accepted = true  [FIX #1 — sections claimed atomically]
    c. If user.role === 'faculty': attempt to link faculty_profile by email [FIX #7]
    d. Write audit log: action='LOGIN', user_email snapshot
    e. COMMIT
11. Backend issues own JWT:
    - Access token:  15 minutes (short-lived)  [FIX #4 — reduced from 1h]
    - Refresh token: 7 days
    - JWT payload: { sub: user.id, role, tv: token_version } [FIX #4]
12. Both tokens set as httpOnly, SameSite=Strict, Secure cookies — NOT returned in response body
```

> [!IMPORTANT]
> **[FIX #4 — Reduced Access Token Lifetime]:** Access tokens are now **15 minutes**. The admin SPA silently calls `POST /auth/refresh` (using the refresh cookie) before each user action if the access token is near expiry. A deactivated user loses API access within 15 minutes at most — and immediately if `token_version` has been incremented (e.g. via the "Deactivate" button in User Management).

### 8.2 JWT Strategy

| Token | Lifetime | Storage | Use |
|---|---|---|---|
| Access token | **15 minutes** [FIX #4] | httpOnly, SameSite=Strict, Secure cookie | Every API request |
| Refresh token | 7 days | httpOnly, SameSite=Strict, Secure cookie | `POST /auth/refresh` only |

**Never store tokens in `localStorage`** — vulnerable to XSS.

**JWT Payload structure:**
```json
{ "sub": 42, "role": "editor", "tv": 3, "iat": 1234567890, "exp": 1234568790 }
```

**JWT middleware must perform these checks on every request:**
1. Verify signature and `exp` (standard)
2. Read `decoded.tv` and compare against `users.token_version` from DB
3. Verify `users.is_active === true`
4. Reject with 401 if **any** check fails

This enables instant revocation: incrementing `token_version` (on user deactivation or forced logout) invalidates all existing tokens immediately, regardless of remaining access token lifetime. [FIX #4]

> [!TIP]
> To avoid a DB hit on every single request, cache the `{ token_version, is_active }` tuple in a short-lived in-memory LRU cache (e.g. `lru-cache`, TTL 30 seconds). This keeps the revocation window at 30 seconds maximum while eliminating the DB overhead for normal traffic.

### 8.3 File Upload Validation

```
- Allowed MIME types: image/jpeg, image/png, image/webp, application/pdf
- Validate MIME type via file magic bytes (not just extension)
- Max size: Images = 5 MB, PDFs = 20 MB
- Sanitize filename: strip special chars, use UUID as stored name
- Store files outside web root (or use Cloudinary)
- Never execute uploaded files
```

### 8.4 Content Sanitization

- Sanitize all text inputs with `DOMPurify` on the frontend and `sanitize-html` on the backend before storing.
- Never render user-provided HTML without sanitization.
- Validate URLs: only allow `https://` and relative paths starting with `/`.

### 8.5 CSRF Protection

Since JWT is stored in httpOnly cookies:
- Use `SameSite=Strict` or `SameSite=Lax` cookies.
- Add `CSRF-Token` header for state-changing requests (double-submit pattern).
- Or use a CSRF library: `csurf` (Express) or `csrf-csrf`.

### 8.6 Rate Limiting

```js
// Login endpoint: strict
rateLimit({ windowMs: 15 * 60 * 1000, max: 10 })

// Upload endpoint: moderate
rateLimit({ windowMs: 60 * 1000, max: 20 })

// General API: lenient
rateLimit({ windowMs: 60 * 1000, max: 200 })
```

### 8.7 Additional Security

| Measure | Implementation |
|---|---|
| HTTPS everywhere | Let's Encrypt / Vercel / Railway built-in |
| Security headers | `helmet()` middleware |
| CORS | Whitelist only `iiitp.ac.in` and `admin.iiitp.ac.in` |
| SQL injection | Prisma parameterized queries (built-in) |
| Dependency audit | `npm audit` in CI pipeline |
| Secrets management | `.env` + platform secrets (Railway/Render env vars) |
| Database backups | Daily automated backups → S3/cloud storage |
| Audit logging | Log every CREATE/UPDATE/DELETE with old+new values |

---

## 9. Data Migration Plan

### Step 1: Write seed scripts for each JSON file

Create `backend/prisma/seed/` directory with one script per data source:

```
seed/
  notices.seed.ts
  news.seed.ts
  careers.seed.ts
  etenders.seed.ts
  faculty.seed.ts
  alumni.seed.ts
  non_teaching_staff.seed.ts
  scholarships.seed.ts
  mous.seed.ts
  shortlistings.seed.ts
  press.seed.ts
```

Each script:
1. Reads the corresponding JSON file
2. Maps fields to DB columns (see schema above)
3. Runs `prisma.table.createMany({ data: [...] })`

### Step 2: Handle existing file URLs

Files currently in `public/` (notices PDFs, career PDFs, tender PDFs, faculty photos, etc.) have URLs like `/documents/filename.pdf`, `/assets/faculty_photos/bhupendrasingh.jpg`.

> [!IMPORTANT]
> **Decision: Option A — Keep existing URLs as-is.** Store the current URL strings directly in the DB. The Vercel-hosted frontend already resolves these relative URLs against the existing public host. No file migration needed for seed data.

**For new uploads** (Phase 2+): Files uploaded via the admin dashboard are stored in `/uploads` on the Hostinger VPS and served via Nginx at `https://api.iiitp.ac.in/uploads/<filename>`. The `UPLOAD_BASE_URL` env var controls this base URL.

### Step 3: Handle faculty_details.json

The faculty JSON uses a slug as the key (`"bhupendra-singh": {...}`). Migration:
1. Each key becomes the `slug` column in `faculty_profiles`
2. Nested arrays (`publications`, `projects`, `patents`, `seminars`, `supervisions`) become rows in their respective child tables
3. `email` field links to the future `users` table when the faculty logs in

### Step 4: Validate after seeding

- Run count checks: `SELECT COUNT(*) FROM notices` should match JSON array length
- Spot-check 5–10 records manually
- Run the public website against the API and compare rendered output visually

---

## 10. Deployment Plan

> [!IMPORTANT]
> The team is using **Hostinger Cloud** which includes a built-in MySQL database. This eliminates the need for an external DB service and keeps everything on one server.

### ✅ Recommended: Hostinger Cloud (All-in-One)

| Component | Service | Notes |
|---|---|---|
| Frontend (public site) | **Vercel** (existing) | No change needed. Point API calls to `api.iiitp.ac.in` |
| Admin Dashboard | **Vercel** (second project) | Free tier, auto-deploy from `admin/` folder |
| Backend API | **Hostinger Cloud VPS** | Deploy Node.js app via PM2 + Nginx reverse proxy |
| Database | **Hostinger MySQL** (built-in) | Already provisioned; access via `localhost:3306` from VPS |
| File storage | **Hostinger VPS local disk** `/uploads` | Served by Nginx; enforce `Content-Disposition: attachment` for PDFs [FIX #6] |
| SSL | **Let's Encrypt** via Certbot | Free, auto-renews |
| Process manager | **PM2** | Keeps Node.js running, restarts on crash |

### Hostinger MySQL Setup

1. Log in to Hostinger hPanel → **Databases → MySQL Databases**
2. Create a database: `iiitp_cms`
3. Create a DB user: `iiitp_user` with a strong password
4. Grant all privileges on `iiitp_cms` to `iiitp_user`
5. Note the host — on Hostinger Cloud it's typically `localhost` (same server)
6. Set your backend `.env`:
```env
DATABASE_URL="mysql://iiitp_user:yourpassword@localhost:3306/iiitp_cms"
```
7. In `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### Nginx Reverse Proxy Config (on Hostinger VPS)

```nginx
# /etc/nginx/sites-available/api.iiitp.ac.in
server {
    listen 443 ssl;
    server_name api.iiitp.ac.in;

    # [FIX #6] Force PDF downloads — never allow inline rendering in browser
    location ~* \.pdf$ {
        add_header Content-Disposition "attachment" always;
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Production timeouts
        proxy_connect_timeout 10s;
        proxy_read_timeout    30s;
        proxy_send_timeout    30s;

        # Buffer tuning for file uploads (max PDF size + margin)
        client_max_body_size  25M;
        proxy_request_buffering off;
    }

    # Liveness probe — bypass rate limiting for load balancer health checks
    location = /health {
        proxy_pass http://localhost:4000/health;
    }
}
```

### PM2 Process Setup

```bash
npm install -g pm2
cd /var/www/backend

# Cluster mode — one worker per CPU core for maximum throughput
pm2 start dist/index.js --name iiitp-api -i max --max-memory-restart 400M
pm2 save
pm2 startup   # auto-start on server reboot
```

**`ecosystem.config.js` (commit to repo, never hardcode secrets here):**
```js
module.exports = {
  apps: [{
    name: 'iiitp-api',
    script: 'dist/index.js',
    instances: 'max',           // one per CPU core
    exec_mode: 'cluster',
    max_memory_restart: '400M',
    env_production: { NODE_ENV: 'production' },
    kill_timeout:   5000,       // wait 5s before SIGKILL
    wait_ready:     true,       // wait for process.send('ready') from app
    listen_timeout: 10000,
  }]
};
```

**In `src/index.ts` — Graceful shutdown handler:**
```ts
import gracefulShutdown from 'http-graceful-shutdown';

const server = app.listen(env.PORT, () => {
  logger.info(`API listening on port ${env.PORT}`);
  process.send?.('ready'); // signal PM2 that the process is ready
});

gracefulShutdown(server, {
  signals: 'SIGINT SIGTERM',
  timeout: 5000,               // wait up to 5s for in-flight requests
  onShutdown: async () => {
    await prisma.$disconnect(); // drain DB connection pool cleanly
    logger.info('DB disconnected. Exiting.');
  },
});
```

### Environment Variables (backend `.env`)

> [!CAUTION]
> **Never commit `.env` to Git.** Add `.env` to `.gitignore` on Day 1. Use platform secrets (Hostinger → SSH → hPanel env vars) in production. The backend validates all required variables at startup via `envalid` — if any are missing the process crashes with a clear message rather than silently failing later.

```env
# Hostinger MySQL
DATABASE_URL="mysql://iiitp_user:yourpassword@localhost:3306/iiitp_cms"

# Google OAuth2
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com

# JWT Secrets — generate with: openssl rand -hex 64
JWT_SECRET=<64-byte-hex-string>
JWT_REFRESH_SECRET=<different-64-byte-hex-string>
JWT_ACCESS_EXPIRES_IN=15m    # [FIX #4]
JWT_REFRESH_EXPIRES_IN=7d

# Domain
ALLOWED_DOMAIN=iiitp.ac.in
CORS_ORIGINS=https://iiitp.ac.in,https://admin.iiitp.ac.in
COOKIE_DOMAIN=.iiitp.ac.in
COOKIE_SECURE=true

# File storage — local VPS disk
FILE_STORAGE=local
UPLOAD_DIR=/var/www/backend/uploads
UPLOAD_BASE_URL=https://api.iiitp.ac.in/uploads

NODE_ENV=production
PORT=4000
LOG_LEVEL=info
```

**Startup env validation (`src/config/env.ts`):**
```ts
import { cleanEnv, str, port } from 'envalid';

export const env = cleanEnv(process.env, {
  DATABASE_URL:       str(),
  GOOGLE_CLIENT_ID:   str(),
  JWT_SECRET:         str({ minLength: 32 }),
  JWT_REFRESH_SECRET: str({ minLength: 32 }),
  ALLOWED_DOMAIN:     str({ default: 'iiitp.ac.in' }),
  CORS_ORIGINS:       str(),
  NODE_ENV:           str({ choices: ['development', 'production', 'test'] }),
  PORT:               port({ default: 4000 }),
  FILE_STORAGE:       str({ choices: ['cloudinary', 'local'], default: 'cloudinary' }),
});
// If any required variable is missing, envalid throws here with a clear, human-readable
// error — not silently hours later when the missing var is first accessed at runtime.
```

### Backup Strategy

- **Database**: Schedule a daily `mysqldump` cron job on the Hostinger VPS:
  ```bash
  # crontab -e
  0 2 * * * mysqldump -u iiitp_user -pyourpassword iiitp_cms > /backups/iiitp_$(date +\%F).sql
  ```
  Upload dumps to cloud storage (Backblaze B2 / Google Drive) via `rclone`.
- **Uploaded files**: Sync `/uploads` directory to cloud storage daily via `rclone` (Backblaze B2 / Google Drive). Command example:
  ```bash
  0 3 * * * rclone sync /var/www/backend/uploads remote:iiitp-uploads-backup
  ```
- **Code**: Git is source of truth. DB schema tracked in `prisma/migrations/` — never edit the DB directly.

---

## 11. Phased Roadmap

### Phase 0 — Content & Codebase Audit (1–2 weeks)

- [x] List every JSON file and hardcoded JSX data block
- [x] Catalog all files in `public/` that are referenced by data files
- [x] Set up a shared spreadsheet / tracker: file name → DB table → migration status
- [x] Set up the monorepo: `frontend/` (existing), `admin/` (new), `backend/` (new)
- [x] Set up local **MySQL 8.x** + Prisma (provider = `mysql`, NOT `postgresql`)
- [x] Document all current URL patterns that must be preserved
- [x] Add `.env` to `.gitignore` immediately (do this before creating `.env`)
- [x] Create `GOOGLE_OAUTH_CLIENT_ID` in Google Cloud Console with correct authorized JS origins and redirect URIs

### Phase 1 — Backend Core: Auth + User Model (2–3 weeks)

- [x] Initialize Express app with TypeScript, Prisma schema, MySQL connection
- [x] Set up `envalid` env validation as the very first call in `src/index.ts`
- [x] Set up centralized error handler middleware (consistent JSON error responses with `requestId`)
- [x] Create `users`, `invites` (with `sections` JSON column [FIX #1]), `editor_section_assignments` tables
- [x] Add all performance indexes from Section 3.8
- [x] Implement `POST /auth/google` with nonce verification, atomic invite claim + section seeding [FIX #1], faculty profile auto-link [FIX #7]
- [x] Implement JWT issuance (15m access + 7d refresh, `tv` field in payload) [FIX #4]
- [x] Implement JWT middleware with `token_version` and `is_active` checks (with LRU cache) [FIX #4]
- [x] Implement `POST /auth/refresh` and `POST /auth/logout` (bumps `token_version`)
- [x] Implement `GET /health` liveness endpoint (checks DB connectivity)
- [x] Implement role middleware (`requireRole`, `requireSection`)
- [x] Implement audit log middleware (auto-log on mutations; snapshot `user_email` not just `user_id`) [FIX #3 audit]
- [x] Set up PM2 cluster config + graceful shutdown handler
- [x] Implement `POST /admin/invites` (stores sections in invite row) [FIX #1]
- [x] Build Login page in dev sandbox UI (Google OAuth button with nonce)
- [x] Build User Management API with deactivation that increments `token_version` [FIX #4]
- [x] Write integration tests for: valid invite, expired invite, wrong domain, deactivated user, replayed token
- [x] **Deliverable**: Admin can invite users with section assignments; invited users can log in via Google. Deactivated users are blocked immediately.

### Phase 2 — CMS for Notices, News, Careers, E-Tenders (3–4 weeks)

- [x] Prisma schema + migrations for 4 tables (`notices`, `news`, `careers`, `career_buttons`, `etenders`)
- [x] CRUD API endpoints for all 4 sections with Working-Copy Draft Engine [FIX #2] and MySQL Fulltext Search [FIX #5]
- [x] Media upload endpoint (Multer + Sharp WebP compression + PDF download security [FIX #6])
- [x] Seed database from JSON files (`npm run db:seed`)
- [ ] Admin dashboard: Notices/News/Careers/Tenders manager screens
- [ ] **Deliverable**: Editors can manage notices/news/careers/tenders via dashboard without touching code. (Frontend continues using JSON)

### Phase 3 — Faculty Self-Editing (2–3 weeks)

- [ ] Schema + migrations for `faculty_profiles` and all sub-tables
- [ ] Seed from `faculty_details.json`
- [ ] `GET /faculty`, `GET /faculty/:slug` endpoints (public)
- [ ] `PATCH /faculty/:id` with self-edit authorization check
- [ ] Sub-resource endpoints for publications/projects/patents/seminars
- [ ] Admin dashboard: Faculty profile browser + editor
- [ ] Faculty dashboard: "My Profile" edit page
- [ ] **Deliverable**: Faculty can log in and edit their own profile from a dashboard. (Frontend continues using JSON)

### Phase 4 — Security Hardening & Admin Tools (2 weeks)

- [x] Dashboard: "Publish Draft" button that atomically copies draft fields → live fields [FIX #2]
- [ ] CSRF protection hardening (`csrf-csrf` package)
- [x] Rate limiting on all endpoints (stricter on `/auth/*` and `/media/upload`)
- [x] Security audit: review all auth checks, test role boundaries with automated tests
- [x] Penetration test: verify `PATCH /notices/:id` never overwrites live fields directly [FIX #2]
- [x] Penetration test: verify deactivated user tokens are rejected immediately [FIX #4]
- [x] Verify PDF files served with `Content-Disposition: attachment` header [FIX #6]
- [ ] Set up automated daily DB backup (`mysqldump` cron → rclone → cloud storage)
- [ ] Add `audit_logs` viewer screen in dashboard
- [x] Run `npm audit --audit-level=high` and resolve all critical findings
- [ ] **Deliverable**: Direct publish workflow, audit log viewer, and security hardening complete.

### Phase 5 — Frontend API Integration & Life Page CMS (2–3 weeks)

- [ ] Build shared `useApi(url)` hook with loading, error states, caching, and fallback handling
- [ ] Migrate `NoticePage.jsx`, `NewsPage.jsx`, `CareersPage.jsx`, `ETenderPage.jsx` to live API calls
- [ ] Migrate `FacultyPage.jsx` and `FacultyProfilePage.jsx` to `GET /faculty` and `GET /faculty/:slug`
- [ ] Schema, APIs, Admin screens, and Frontend Migration for **Life Page Data** (`lifePageData.json` -> `GET /life-events` used by `Life*` pages)
- [ ] Connect search, filter, and pagination with backend query params (`?search=`, `?page=`, `?limit=`)
- [ ] Update frontend environment configuration (`VITE_API_BASE_URL`)
- [ ] Remove old JSON imports after verifying API output matches
- [ ] Remove migrated static JSON files from `src/data/`
- [ ] **Deliverable**: Core frontend pages (Notices, News, Careers, Tenders, Faculty, Life pages) fully driven by backend database & REST APIs.

### Phase 6 — Deferred Supplementary Content & Hardcoded Pages (Post-MVP / Future Phase)

> **Note:** The seed scripts for the Phase 6 sections below (mous, alumni, staff, press, scholarships) have already been written and tested in advance. The work done so far is retained. Their API routes, dashboard screens, and frontend integration are deferred to Phase 6.

- [ ] Scholarships, non-teaching staff, alumni, MoUs, press, shortlistings schemas + APIs
- [ ] Admin dashboard manager screens for supplementary sections (Scholarships, Staff, Alumni, MoUs, Press, Shortlistings)
- [ ] Migrate remaining supplementary pages: `ScholarshipPage`, `NonTeachingStaffPage`, `AlumniPage`, `MousPage`, `LifePressPage` (press data), `ShortlistingsPage`
- [ ] Begin migrating hardcoded JSX pages (`CseDepartmentPage.jsx`, `EceDepartmentPage.jsx`, `AshDepartmentPage.jsx`, `UgPgSchemesPage.jsx`, etc.)
- [ ] Remove remaining static JSON files once all supplementary pages are fully migrated
- [ ] **Deliverable**: All remaining secondary content, committees, and departmental JSX pages migrated to CMS.

---

## 12. Risks and Tradeoffs

| Risk | Likelihood | Impact | Mitigation | Fix Applied |
|---|---|---|---|---|
| **Editor sections lost at invite claim** — invited editor logs in with no section permissions | High | Critical | `sections` JSON column added to `invites` table; claimed atomically in login transaction | ✅ FIX #1 |
| **Live content disappears on edit** — editing a published notice overwrites it directly | High | High | Working-copy pattern: edits write to `draft_*` columns only; live fields unchanged until explicitly published | ✅ FIX #2 |
| **FK crash on user delete** — deleting a user crashes DB due to FK violations | Medium | High | All content `created_by`/`updated_by` FKs use `ON DELETE SET NULL`; audit log `user_id` is not a FK | ✅ FIX #3 |
| **Deactivated user retains API access for up to 1h** — rogue editor keeps posting | Medium | Critical | Access token reduced to 15m; `token_version` check invalidates all tokens instantly on deactivation | ✅ FIX #4 |
| **Search broken after JSON → API migration** — frontend search bar stops working | High | High | All list endpoints support `?search=` with MySQL FULLTEXT indexes on title columns | ✅ FIX #5 |
| **PDF XSS via self-hosted uploads** — embedded JS in PDF steals admin cookies | Low | Critical | Nginx enforces `Content-Disposition: attachment` for all `.pdf` URL matches | ✅ FIX #6 |
| **Faculty sees blank profile on first login** — email mismatch between `users` and `faculty_profiles` | Medium | High | Auth flow auto-links `faculty_profiles` by email inside the login transaction; warns via log if no profile found | ✅ FIX #7 |
| **Missing env variable silently breaks production** — undefined secret causes cryptic error in wrong code path | Medium | High | `envalid` validates all required env vars at process startup; fails fast with clear error message | ✅ Prod+ |
| **PM2 restart drops in-flight requests** — active file upload or DB write cut mid-way on deploy | Low | High | `http-graceful-shutdown` drains in-flight requests before process exits | ✅ Prod+ |
| **Stale JSON during migration** — public site shows old data while DB is being populated | High | Medium | Keep JSON imports working as fallback during transition; use per-page feature flags to switch | — |
| **Schema mismatch** — JSON structure doesn't map cleanly to relational schema | Medium | Medium | Audit JSON thoroughly in Phase 0; use JSON columns for very irregular nested data | — |
| **File URL breakage** — old public URLs (`/documents/...`) break when migrated to Cloudinary | High | High | Option A: Keep serving from same host. Option B: Set up 301 redirects from old URLs to new CDN URLs | — |
| **Authentication misconfiguration** — domain check bypassed, students can log in | Low | Critical | Unit-test auth middleware; invite check is the secondary guard; nonce prevents replay | — |
| **Migration complexity** — `faculty_details.json` is 276 KB with deeply nested data | Medium | Medium | Write and test seed script with count + spot-check validation before removing JSON | — |
| **File storage costs** — Cloudinary free tier fills up with PDFs | Medium | Low | Monitor usage; upgrade plan is cheap; self-host `/uploads` with Nginx PDF fix as fallback | — |
| **Team bandwidth** — student dev team may be part-time | High | Medium | Phased plan delivers value at each phase; Phase 1+2 alone enables non-technical editing | — |
| **Downtime during cutover** — switching from JSON to API may briefly break pages | Low | High | Deploy API + seed data BEFORE migrating frontend; test on staging environment first | — |

---

## Appendix: Project Folder Structure

```
iiitp-website/          ← existing repo
├── frontend/           ← existing React site (rename src/ → here)
│   └── src/data/       ← JSON files (delete after migration)
├── admin/              ← NEW: admin dashboard React app
│   └── src/
│       ├── pages/
│       ├── components/
│       └── hooks/
└── backend/            ← NEW: Express API
    ├── src/
    │   ├── routes/
    │   ├── middleware/
    │   ├── controllers/
    │   └── services/
    ├── prisma/
    │   ├── schema.prisma
    │   ├── migrations/
    │   └── seed/
    └── uploads/        ← if using local file storage
```

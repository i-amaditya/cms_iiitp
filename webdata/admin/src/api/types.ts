export type UserRole = 'admin' | 'editor' | 'faculty';

export type ContentStatus = 'draft' | 'published' | 'archived';

export interface User {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  avatar_url?: string | null;
  last_login_at?: string | null;
  sections?: string[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthorRef {
  id: number;
  name: string;
  email: string;
}

// ── Notices ──────────────────────────────────────────────────────────────────
export interface Notice {
  id: number;
  title: string;
  category: string | null;
  link_url: string | null;
  file_url: string | null;
  notice_date: string;
  status: ContentStatus;
  draft_title?: string | null;
  draft_category?: string | null;
  draft_link_url?: string | null;
  draft_file_url?: string | null;
  draft_notice_date?: string | null;
  has_unpublished_draft?: boolean;
  created_by?: number | null;
  updated_by?: number | null;
  created_at: string;
  updated_at: string;
  creator?: AuthorRef | null;
  updater?: AuthorRef | null;
}

export interface NoticeListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  status?: ContentStatus;
}

export interface NoticeListResponse {
  notices: Notice[];
  pagination: Pagination;
}

export interface CreateNoticePayload {
  title: string;
  category?: string;
  link_url?: string;
  file_url?: string;
  notice_date: string;
}

export interface UpdateNoticeDraftPayload {
  title?: string;
  category?: string | null;
  link_url?: string | null;
  file_url?: string | null;
  notice_date?: string;
}

// ── News ─────────────────────────────────────────────────────────────────────
export interface News {
  id: number;
  title: string;
  excerpt: string | null;
  link_url: string | null;
  file_url: string | null;
  news_date: string;
  status: ContentStatus;
  draft_title?: string | null;
  draft_excerpt?: string | null;
  draft_link_url?: string | null;
  draft_file_url?: string | null;
  draft_news_date?: string | null;
  has_unpublished_draft?: boolean;
  created_by?: number | null;
  updated_by?: number | null;
  created_at: string;
  updated_at: string;
  creator?: AuthorRef | null;
  updater?: AuthorRef | null;
}

export interface NewsListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: ContentStatus;
}

export interface NewsListResponse {
  news: News[];
  pagination: Pagination;
}

export interface CreateNewsPayload {
  title: string;
  excerpt?: string;
  link_url?: string;
  file_url?: string;
  news_date: string;
}

export interface UpdateNewsDraftPayload {
  title?: string;
  excerpt?: string | null;
  link_url?: string | null;
  file_url?: string | null;
  news_date?: string;
}

// ── Careers & Buttons ────────────────────────────────────────────────────────
export interface CareerButton {
  id: number;
  career_id: number;
  label: string;
  url?: string | null;
  file_url?: string | null;
  display_order: number;
}

export interface Career {
  id: number;
  title: string;
  career_type: 'live' | 'past';
  post_date?: string | null;
  last_date?: string | null;
  status: ContentStatus;
  draft_title?: string | null;
  draft_last_date?: string | null;
  has_unpublished_draft?: boolean;
  buttons?: CareerButton[];
  created_by?: number | null;
  updated_by?: number | null;
  created_at: string;
  updated_at: string;
  creator?: AuthorRef | null;
  updater?: AuthorRef | null;
}

export interface CareerListParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: 'live' | 'past';
  status?: ContentStatus;
}

export interface CareerListResponse {
  careers: Career[];
  pagination: Pagination;
}

export interface CreateCareerPayload {
  title: string;
  career_type?: 'live' | 'past';
  post_date?: string;
  last_date?: string;
}

export interface UpdateCareerDraftPayload {
  title?: string;
  career_type?: 'live' | 'past';
  last_date?: string | null;
}

export interface CareerButtonPayload {
  label: string;
  url?: string | null;
  file_url?: string | null;
  display_order?: number;
}

// ── E-Tenders ────────────────────────────────────────────────────────────────
export interface Etender {
  id: number;
  title: string;
  tender_number: string | null;
  tender_type: 'live' | 'past';
  file_url: string | null;
  corrigendum_url: string | null;
  submission_date: string | null;
  status: ContentStatus;
  draft_title?: string | null;
  draft_file_url?: string | null;
  draft_corrigendum_url?: string | null;
  has_unpublished_draft?: boolean;
  created_by?: number | null;
  updated_by?: number | null;
  created_at: string;
  updated_at: string;
  creator?: AuthorRef | null;
  updater?: AuthorRef | null;
}

export interface EtenderListParams {
  page?: number;
  limit?: number;
  search?: string;
  type?: 'live' | 'past';
  status?: ContentStatus;
}

export interface EtenderListResponse {
  etenders: Etender[];
  pagination: Pagination;
}

export interface CreateEtenderPayload {
  title: string;
  tender_number?: string;
  tender_type?: 'live' | 'past';
  file_url?: string;
  corrigendum_url?: string;
  submission_date?: string;
}

export interface UpdateEtenderDraftPayload {
  title?: string;
  tender_number?: string | null;
  tender_type?: 'live' | 'past';
  file_url?: string | null;
  corrigendum_url?: string | null;
  submission_date?: string | null;
}

// ── Media ────────────────────────────────────────────────────────────────────
export interface MediaFile {
  id: number;
  url: string;
  filename: string;
  original_name?: string | null;
  mime_type?: string | null;
  size_bytes?: number | null;
  is_pdf: boolean;
  created_at: string;
}

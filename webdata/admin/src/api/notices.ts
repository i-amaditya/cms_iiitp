import { apiRequest } from './client';
import type {
  Notice,
  NoticeListParams,
  NoticeListResponse,
  CreateNoticePayload,
  UpdateNoticeDraftPayload,
} from './types';

export async function getNotices(params: NoticeListParams = {}): Promise<NoticeListResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.category) query.set('category', params.category);
  if (params.status) query.set('status', params.status);

  const qs = query.toString();
  return apiRequest<NoticeListResponse>(`/v1/notices${qs ? `?${qs}` : ''}`);
}

export async function getNoticeById(id: number): Promise<{ notice: Notice }> {
  return apiRequest<{ notice: Notice }>(`/v1/notices/${id}`);
}

export async function createNotice(payload: CreateNoticePayload): Promise<{ message: string; notice: Notice }> {
  return apiRequest<{ message: string; notice: Notice }>('/v1/notices', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateNoticeDraft(
  id: number,
  payload: UpdateNoticeDraftPayload
): Promise<{ message: string; notice: Notice }> {
  return apiRequest<{ message: string; notice: Notice }>(`/v1/notices/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function publishNotice(id: number): Promise<{ message: string; notice: Notice }> {
  return apiRequest<{ message: string; notice: Notice }>(`/v1/notices/${id}/publish`, {
    method: 'PATCH',
  });
}

export async function archiveNotice(id: number): Promise<{ message: string; notice: Notice }> {
  return apiRequest<{ message: string; notice: Notice }>(`/v1/notices/${id}/archive`, {
    method: 'PATCH',
  });
}

export async function deleteNotice(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/v1/notices/${id}`, {
    method: 'DELETE',
  });
}

// Re-export types for backward compatibility
export type { Notice, NoticeListResponse, CreateNoticePayload, UpdateNoticeDraftPayload as UpdateNoticePayload };
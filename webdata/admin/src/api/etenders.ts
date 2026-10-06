import { apiRequest } from './client';
import type {
  Etender,
  EtenderListParams,
  EtenderListResponse,
  CreateEtenderPayload,
  UpdateEtenderDraftPayload,
} from './types';

export async function getEtenders(params: EtenderListParams = {}): Promise<EtenderListResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.type) query.set('type', params.type);
  if (params.status) query.set('status', params.status);

  const qs = query.toString();
  return apiRequest<EtenderListResponse>(`/v1/etenders${qs ? `?${qs}` : ''}`);
}

export async function getEtenderById(id: number): Promise<{ etender: Etender }> {
  return apiRequest<{ etender: Etender }>(`/v1/etenders/${id}`);
}

export async function createEtender(payload: CreateEtenderPayload): Promise<{ message: string; etender: Etender }> {
  return apiRequest<{ message: string; etender: Etender }>('/v1/etenders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateEtenderDraft(
  id: number,
  payload: UpdateEtenderDraftPayload
): Promise<{ message: string; etender: Etender }> {
  return apiRequest<{ message: string; etender: Etender }>(`/v1/etenders/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function publishEtender(id: number): Promise<{ message: string; etender: Etender }> {
  return apiRequest<{ message: string; etender: Etender }>(`/v1/etenders/${id}/publish`, {
    method: 'PATCH',
  });
}

export async function archiveEtender(id: number): Promise<{ message: string; etender: Etender }> {
  return apiRequest<{ message: string; etender: Etender }>(`/v1/etenders/${id}/archive`, {
    method: 'PATCH',
  });
}

export async function deleteEtender(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/v1/etenders/${id}`, {
    method: 'DELETE',
  });
}

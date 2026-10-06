import { apiRequest } from './client';
import type {
  Career,
  CareerButton,
  CareerListParams,
  CareerListResponse,
  CreateCareerPayload,
  UpdateCareerDraftPayload,
  CareerButtonPayload,
} from './types';

export async function getCareers(params: CareerListParams = {}): Promise<CareerListResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.type) query.set('type', params.type);
  if (params.status) query.set('status', params.status);

  const qs = query.toString();
  return apiRequest<CareerListResponse>(`/v1/careers${qs ? `?${qs}` : ''}`);
}

export async function getCareerById(id: number): Promise<{ career: Career }> {
  return apiRequest<{ career: Career }>(`/v1/careers/${id}`);
}

export async function createCareer(payload: CreateCareerPayload): Promise<{ message: string; career: Career }> {
  return apiRequest<{ message: string; career: Career }>('/v1/careers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCareerDraft(
  id: number,
  payload: UpdateCareerDraftPayload
): Promise<{ message: string; career: Career }> {
  return apiRequest<{ message: string; career: Career }>(`/v1/careers/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function publishCareer(id: number): Promise<{ message: string; career: Career }> {
  return apiRequest<{ message: string; career: Career }>(`/v1/careers/${id}/publish`, {
    method: 'PATCH',
  });
}

export async function archiveCareer(id: number): Promise<{ message: string; career: Career }> {
  return apiRequest<{ message: string; career: Career }>(`/v1/careers/${id}/archive`, {
    method: 'PATCH',
  });
}

export async function deleteCareer(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/v1/careers/${id}`, {
    method: 'DELETE',
  });
}

// ── Career Buttons Sub-resource ──────────────────────────────────────────────

export async function addCareerButton(
  careerId: number,
  payload: CareerButtonPayload
): Promise<{ message: string; button: CareerButton }> {
  return apiRequest<{ message: string; button: CareerButton }>(`/v1/careers/${careerId}/buttons`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateCareerButton(
  careerId: number,
  btnId: number,
  payload: Partial<CareerButtonPayload>
): Promise<{ message: string; button: CareerButton }> {
  return apiRequest<{ message: string; button: CareerButton }>(`/v1/careers/${careerId}/buttons/${btnId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function deleteCareerButton(
  careerId: number,
  btnId: number
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/v1/careers/${careerId}/buttons/${btnId}`, {
    method: 'DELETE',
  });
}

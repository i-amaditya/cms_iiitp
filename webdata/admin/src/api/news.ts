import { apiRequest } from './client';
import type {
  News,
  NewsListParams,
  NewsListResponse,
  CreateNewsPayload,
  UpdateNewsDraftPayload,
} from './types';

export async function getNews(params: NewsListParams = {}): Promise<NewsListResponse> {
  const query = new URLSearchParams();
  if (params.page) query.set('page', String(params.page));
  if (params.limit) query.set('limit', String(params.limit));
  if (params.search) query.set('search', params.search);
  if (params.status) query.set('status', params.status);

  const qs = query.toString();
  return apiRequest<NewsListResponse>(`/v1/news${qs ? `?${qs}` : ''}`);
}

export async function getNewsById(id: number): Promise<{ news: News }> {
  return apiRequest<{ news: News }>(`/v1/news/${id}`);
}

export async function createNews(payload: CreateNewsPayload): Promise<{ message: string; news: News }> {
  return apiRequest<{ message: string; news: News }>('/v1/news', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function updateNewsDraft(
  id: number,
  payload: UpdateNewsDraftPayload
): Promise<{ message: string; news: News }> {
  return apiRequest<{ message: string; news: News }>(`/v1/news/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function publishNews(id: number): Promise<{ message: string; news: News }> {
  return apiRequest<{ message: string; news: News }>(`/v1/news/${id}/publish`, {
    method: 'PATCH',
  });
}

export async function archiveNews(id: number): Promise<{ message: string; news: News }> {
  return apiRequest<{ message: string; news: News }>(`/v1/news/${id}/archive`, {
    method: 'PATCH',
  });
}

export async function deleteNews(id: number): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/v1/news/${id}`, {
    method: 'DELETE',
  });
}

import { apiRequest } from './client';
import type { MediaFile } from './types';

export async function uploadMedia(file: File, context?: string): Promise<{ message: string; file: MediaFile }> {
  const formData = new FormData();
  formData.append('file', file);
  if (context) {
    formData.append('context', context);
  }

  return apiRequest<{ message: string; file: MediaFile }>('/v1/media/upload', {
    method: 'POST',
    body: formData,
  });
}

import { apiRequest } from './client';
import type { User } from './types';

export async function getMe(): Promise<{ user: User }> {
  return apiRequest<{ user: User }>('/v1/auth/me');
}

export async function logout(): Promise<{ message: string }> {
  return apiRequest<{ message: string }>('/v1/auth/logout', {
    method: 'POST',
  });
}

export async function googleLogin(idToken: string, nonce?: string): Promise<{ user: User }> {
  return apiRequest<{ user: User }>('/v1/auth/google', {
    method: 'POST',
    body: JSON.stringify({ id_token: idToken, nonce }),
  });
}

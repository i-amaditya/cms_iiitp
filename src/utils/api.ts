const TOKEN_STORAGE_KEY = 'iiitp_cms_token';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

export function clearStoredToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    let errorMessage = `HTTP error ${response.status}`;
    try {
      const errorJson = await response.json();
      errorMessage = errorJson.error || errorMessage;
    } catch {
      // not json
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const api = {
  get: <T = any>(url: string) => apiRequest<T>(url, { method: 'GET' }),
  post: <T = any>(url: string, body?: any) =>
    apiRequest<T>(url, {
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body)
    }),
  put: <T = any>(url: string, body?: any) =>
    apiRequest<T>(url, {
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body)
    }),
  delete: <T = any>(url: string) => apiRequest<T>(url, { method: 'DELETE' }),
  
  uploadPhoto: async (file: File): Promise<{ url: string; filename: string }> => {
    const formData = new FormData();
    formData.append('photo', file);
    return apiRequest<{ url: string; filename: string }>('/api/upload/photo', {
      method: 'POST',
      body: formData
    });
  }
};

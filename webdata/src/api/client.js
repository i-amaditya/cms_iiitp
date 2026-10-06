// Base fetch wrapper for the public content API (Phase 5B).
// Falls back silently on failure — callers keep whatever data they already have (bundled JSON).
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export async function apiGet(path, params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });
  const qs = query.toString();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(`${API_BASE_URL}${path}${qs ? `?${qs}` : ''}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request to ${path} failed with status ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

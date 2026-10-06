const FACULTY_API_BASE_URL = (
  import.meta.env.VITE_FACULTY_API_BASE_URL || 'http://localhost:3000'
).replace(/\/+$/, '');

export async function fetchCmsFaculty(path, { signal } = {}) {
  const response = await fetch(`${FACULTY_API_BASE_URL}${path}`, { signal });
  if (!response.ok) {
    throw new Error(`Faculty service request failed (${response.status}).`);
  }
  return response.json();
}

export function resolveFacultyAssetUrl(value) {
  if (!value) return '';
  if (/^(?:https?:|data:|blob:)/i.test(value)) return value;
  return new URL(value, `${FACULTY_API_BASE_URL}/`).toString();
}

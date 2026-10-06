const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 
  import.meta.env.VITE_API_URL || 
  'https://eduflow-teacher-lms.onrender.com'
).replace(/\/$/, '');

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('access_token');
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  let data = null;
  try { data = await response.json(); } catch { /* empty response */ }

  if (response.status === 401) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('teacher');
  }
  if (!response.ok) {
    throw new Error(data?.detail || data?.message || `Request failed with status ${response.status}`);
  }
  return data;
}

export { API_BASE_URL };
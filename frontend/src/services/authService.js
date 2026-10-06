import { apiRequest } from './api';

export async function loginTeacher(phone, password) {
  const data = await apiRequest('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone, password }),
  });
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('teacher', JSON.stringify(data.teacher));
  return data;
}

export async function getCurrentTeacher() {
  return apiRequest('/api/v1/auth/me');
}

export function logoutTeacher() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('teacher');
}

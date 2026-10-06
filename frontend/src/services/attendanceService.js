import { apiRequest } from './api';

export const getAttendance = () => apiRequest('/api/v1/attendance');
export const getAttendanceSummary = () => apiRequest('/api/v1/attendance/summary');
export const getStudents = () => apiRequest('/api/v1/students');
export const markAttendance = (records) => apiRequest('/api/v1/attendance/mark', {
  method: 'POST',
  body: JSON.stringify(records),
});

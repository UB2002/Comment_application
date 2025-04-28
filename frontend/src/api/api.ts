import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

// Add request interceptor to include token
API.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add response interceptor to handle errors
API.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response?.status === 401) {
    // Handle unauthorized error
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

// Auth
export const login = (data: { email: string; password: string }) => API.post('/auth/login', data);
export const register = (data: { email: string; password: string }) => API.post('/auth/register', data);

// Comments
export const fetchComments = () => API.get('/comments');
export const postComment = (data: { content: string; parentId?: string }) => API.post('/comments', data);
export const editComment = (id: string, content: string) => API.patch(`/comments/${id}`, { content });
export const deleteComment = (id: string) => API.delete(`/comments/${id}`);
export const restoreComment = (id: string) => API.patch(`/comments/${id}/restore`);

// Notifications
export const getNotifications = () => API.get('/notifications');

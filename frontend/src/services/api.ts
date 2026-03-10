import axios from 'axios';
import type { Task, TasksResponse } from '@/types/task';

const API = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
});

export const getTasks = async (
  page: number = 1,
  limit: number = 10,
  status?: string
): Promise<TasksResponse> => {
  const params: Record<string, string | number> = { page, limit };
  if (status) params.status = status;
  const { data } = await API.get('/api/tasks', { params });
  return data;
};

export const createTask = async (task: {
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
}): Promise<Task> => {
  const { data } = await API.post('/api/tasks', task);
  return data;
};

export const updateTaskStatus = async (
  id: string,
  status: 'todo' | 'in-progress' | 'done'
): Promise<Task> => {
  const { data } = await API.patch(`/api/tasks/${id}`, { status });
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await API.delete(`/api/tasks/${id}`);
};

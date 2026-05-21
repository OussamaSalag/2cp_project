/**
 * src/services/taskService.ts
 * All task-related API calls.
 */

import { api } from "@/lib/api";
import type { TaskResponse, DashboardResponse, TaskStatus } from "@/types/api";

export interface CreateTaskPayload {
  title: string;
  description?: string;
  project_id?: string;
  assignee_id?: string;
  status?: TaskStatus;
  source?: "project" | "mentor" | "personal" | "system";
  category?: string;
  due_date?: string;
}

export interface UpdateTaskPayload {
  title?: string;
  description?: string;
  status?: TaskStatus;
  category?: string;
  due_date?: string;
  assignee_id?: string;
}

const taskService = {
  /** GET /tasks — all my tasks */
  getMyTasks: () => api.get<TaskResponse[]>("/tasks/"),

  /** GET /tasks/dashboard */
  getDashboard: () => api.get<DashboardResponse>("/tasks/dashboard"),

  /** GET /tasks/project/{projectId} */
  getProjectTasks: (projectId: string) =>
    api.get<TaskResponse[]>(`/tasks/project/${projectId}`),

  /** POST /tasks */
  createTask: (data: CreateTaskPayload) =>
    api.post<TaskResponse>("/tasks/", data),

  /** PUT /tasks/{id} */
  updateTask: (id: string, data: UpdateTaskPayload) =>
    api.put<TaskResponse>(`/tasks/${id}`, data),

  /** PATCH /tasks/{id}/status */
  updateTaskStatus: (id: string, status: TaskStatus) =>
    api.patch<TaskResponse>(`/tasks/${id}/status`, { status }),

  /** DELETE /tasks/{id} */
  deleteTask: (id: string) => api.del(`/tasks/${id}`),
};

export default taskService;

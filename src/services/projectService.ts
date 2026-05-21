/**
 * src/services/projectService.ts
 * All project-related API calls.
 */

import { api } from "@/lib/api";
import type {
  ProjectResponse,
  JoinRequestResponse,
} from "@/types/api";

export interface ListProjectsParams {
  status?: string;
  page?: number;
  limit?: number;
}

export interface CreateProjectPayload {
  title: string;
  description: string;
  max_members?: number;
  required_skill_ids?: string[];
}

const projectService = {
  /** GET /projects — browse all projects */
  listProjects: (params: ListProjectsParams = {}) => {
    const qs = new URLSearchParams();
    if (params.status) qs.set("status", params.status);
    if (params.page) qs.set("page", String(params.page));
    if (params.limit) qs.set("limit", String(params.limit));
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return api.get<ProjectResponse[]>(`/projects/${query}`);
  },

  /** GET /projects/my-teams — projects I'm a member of */
  getMyTeams: () => api.get<ProjectResponse[]>("/projects/my-teams"),

  /** GET /projects/search?q= */
  searchProjects: (q: string) =>
    api.get<ProjectResponse[]>(`/projects/search?q=${encodeURIComponent(q)}`),

  /** GET /projects/{id} */
  getProject: (id: string) => api.get<ProjectResponse>(`/projects/${id}`),

  /** POST /projects */
  createProject: (data: CreateProjectPayload) =>
    api.post<ProjectResponse>("/projects/", data),

  /** POST /projects/{id}/join */
  joinProject: (projectId: string, message?: string) =>
    api.post<JoinRequestResponse>(`/projects/${projectId}/join`, { message }),

  /** GET /projects/{id}/requests */
  listJoinRequests: (projectId: string) =>
    api.get<JoinRequestResponse[]>(`/projects/${projectId}/requests`),

  /** POST /projects/{id}/requests/{reqId}/respond */
  respondToRequest: (
    projectId: string,
    requestId: string,
    status: "accepted" | "rejected"
  ) =>
    api.post<JoinRequestResponse>(
      `/projects/${projectId}/requests/${requestId}/respond`,
      { status }
    ),
};

export default projectService;

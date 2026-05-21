/**
 * src/services/userService.ts
 * All user profile API calls.
 */

import { api } from "@/lib/api";
import type {
  UserProfileResponse,
  UserPublicResponse,
  SkillResponse,
} from "@/types/api";

export interface UpdateProfilePayload {
  full_name?: string;
  bio?: string;
  grade?: number;
  avatar_url?: string;
}

const userService = {
  /** GET /users/me — own full profile */
  getProfile: () => api.get<UserProfileResponse>("/users/me"),

  /** PUT /users/me */
  updateProfile: (data: UpdateProfilePayload) =>
    api.put<UserProfileResponse>("/users/me", data),

  /** GET /users/me/skills */
  getMySkills: () => api.get<SkillResponse[]>("/users/me/skills"),

  /** GET /users/skills — full catalogue */
  getAllSkills: () => api.get<SkillResponse[]>("/users/skills"),

  /** POST /users/me/skills */
  addSkill: (skillId: string) =>
    api.post<SkillResponse[]>("/users/me/skills", { skill_id: skillId }),

  /** DELETE /users/me/skills/{id} */
  removeSkill: (skillId: string) =>
    api.del<SkillResponse[]>(`/users/me/skills/${skillId}`),

  /** GET /users/search?q= */
  searchUsers: (q: string) =>
    api.get<UserPublicResponse[]>(`/users/search?q=${encodeURIComponent(q)}`),

  /** GET /users/{id} */
  getUserById: (id: string) => api.get<UserProfileResponse>(`/users/${id}`),
};

export default userService;

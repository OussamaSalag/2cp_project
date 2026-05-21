/**
 * src/types/api.ts
 * TypeScript interfaces mirroring the FastAPI Pydantic response schemas.
 */

// ── Auth ──────────────────────────────────────────────────────────────────

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user_id: string;
  role: string;
  full_name: string;
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  grade: number | null;
  is_email_verified: boolean;
  created_at: string;
}

// ── Users ─────────────────────────────────────────────────────────────────

export interface SkillResponse {
  id: string;
  name: string;
  category: string;
}

export interface UserProfileResponse {
  id: string;
  email: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  grade: number | null;
  is_email_verified: boolean;
  created_at: string;
  skills?: SkillResponse[];
}

export interface UserPublicResponse {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
}

// ── Projects ──────────────────────────────────────────────────────────────

export interface MemberResponse {
  user_id: string;
  full_name: string;
  username: string;
  avatar_url: string | null;
  role: string;
  joined_at: string;
}

export interface ProjectResponse {
  id: string;
  title: string;
  description: string;
  cover_url: string | null;
  owner_id: string;
  status: string;
  max_members: number;
  created_at: string;
  updated_at: string;
  member_count: number;
  members: MemberResponse[];
  required_skills: SkillResponse[];
}

export interface JoinRequestResponse {
  id: string;
  project_id: string;
  user_id: string;
  username: string;
  full_name: string;
  message: string | null;
  status: string;
  created_at: string;
}

// ── Tasks ─────────────────────────────────────────────────────────────────

export type TaskStatus = "todo" | "in_progress" | "done";
export type TaskSource = "project" | "mentor" | "personal" | "system";

export interface TaskResponse {
  id: string;
  project_id: string | null;
  assignee_id: string | null;
  created_by: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  source: TaskSource;
  category: string | null;
  due_date: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardResponse {
  my_projects: ProjectResponse[];
  tasks_summary: {
    todo: number;
    in_progress: number;
    done: number;
  };
  recent_tasks: TaskResponse[];
  total_members_across_projects: number;
}

// ── Notifications ─────────────────────────────────────────────────────────

export interface NotificationResponse {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  is_read: boolean;
  created_at: string;
}

export interface UnreadCountResponse {
  count: number;
}

/**
 * src/services/authService.ts
 * All authentication API calls.
 */

import { api } from "@/lib/api";
import { setToken, setUser, clearAuth } from "@/lib/auth-storage";
import type { TokenResponse, UserResponse } from "@/types/api";

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
  username: string;
}


export interface LoginPayload {
  email: string;
  password: string;
}

const authService = {
  /** Signup — send registration data, receive JWT token */
  register: async (data: RegisterPayload): Promise<TokenResponse> => {
    const res = await api.post<TokenResponse>("/auth/register", data, true);
    setToken(res.access_token);
    setUser({ user_id: res.user_id, full_name: res.full_name, role: res.role });
    return res;
  },

  /** Login with email + password, receive JWT token */
  login: async (data: LoginPayload): Promise<TokenResponse> => {
    const res = await api.post<TokenResponse>("/auth/login", data, true);
    setToken(res.access_token);
    setUser({ user_id: res.user_id, full_name: res.full_name, role: res.role });
    return res;
  },

  /** Get current authenticated user profile */
  getMe: () => api.get<UserResponse>("/auth/me"),

  /** Clear local auth state */
  logout: () => {
    clearAuth();
    window.location.href = "/login";
  },
};

export default authService;

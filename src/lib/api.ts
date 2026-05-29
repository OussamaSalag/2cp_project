/**
 * src/lib/api.ts
 * Central HTTP client for all TeamUp API calls.
 * SSR-safe: no localStorage or window access at module load time.
 */

import { getToken, clearAuth } from "./auth-storage";

const BASE_URL =
  (typeof import.meta !== "undefined" && (import.meta.env?.VITE_API_URL as string)) ||
  "http://localhost:8000/api/v1";

// ── Error class ───────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public status: number,
    public detail: string
  ) {
    super(detail);
    this.name = "ApiError";
  }
}

// ── Core fetch wrapper ────────────────────────────────────────────────────

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  skipAuth = false
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (!skipAuth) {
    const token = getToken(); // SSR-safe — returns null on server
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // 401 → clear auth and redirect (browser-only)
  if (response.status === 401) {
    clearAuth();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new ApiError(401, "Session expired. Please login again.");
  }

  // Parse body (may be empty for 204)
  let data: unknown;
  const contentType = response.headers.get("content-type") || "";
  if (response.status !== 204 && contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    const detail =
      typeof data === "object" && data !== null && "detail" in data
        ? Array.isArray((data as { detail: unknown }).detail)
          ? ((data as { detail: any[] }).detail).map((e) => e.msg).join(", ")
          : String((data as { detail: unknown }).detail)
        : `HTTP ${response.status}`;
    throw new ApiError(response.status, detail);
  }

  return data as T;
}

// ── Typed helpers ─────────────────────────────────────────────────────────

export const api = {
  get: <T>(path: string, skipAuth = false) =>
    request<T>("GET", path, undefined, skipAuth),

  post: <T>(path: string, body: unknown, skipAuth = false) =>
    request<T>("POST", path, body, skipAuth),

  put: <T>(path: string, body: unknown) =>
    request<T>("PUT", path, body),

  patch: <T>(path: string, body: unknown) =>
    request<T>("PATCH", path, body),

  del: <T = void>(path: string) =>
    request<T>("DELETE", path),
};

export default api;

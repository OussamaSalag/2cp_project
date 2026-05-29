/**
 * src/lib/auth-storage.ts
 * Typed helpers for persisting auth state in localStorage.
 * All functions are SSR-safe (guard with typeof window check).
 */

const TOKEN_KEY = "access_token";
const USER_KEY = "teamup_user";

export interface StoredUser {
  user_id: string;
  full_name: string;
  role: string;
}

/** True only when running in a real browser (not SSR). */
const isBrowser = typeof window !== "undefined" && typeof localStorage !== "undefined";

// ── Token ─────────────────────────────────────────────────────────────────

export function getToken(): string | null {
  if (!isBrowser) return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (!isBrowser) return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (!isBrowser) return;
  localStorage.removeItem(TOKEN_KEY);
}

// ── User ──────────────────────────────────────────────────────────────────

export function getUser(): StoredUser | null {
  if (!isBrowser) return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function setUser(user: StoredUser): void {
  if (!isBrowser) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearUser(): void {
  if (!isBrowser) return;
  localStorage.removeItem(USER_KEY);
}

// ── Convenience ───────────────────────────────────────────────────────────

export function clearAuth(): void {
  clearToken();
  clearUser();
}

export function isLoggedIn(): boolean {
  if (!isBrowser) return false;
  return !!getToken();
}

/**
 * src/context/AuthContext.tsx
 * Global auth state — provides user, token, and auth actions to the whole app.
 * Hydrates from localStorage on mount and validates the token against GET /auth/me.
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import authService from "@/services/authService";
import {
  getToken,
  getUser,
  clearAuth,
  type StoredUser,
} from "@/lib/auth-storage";
import type { UserResponse } from "@/types/api";

// ── Context shape ─────────────────────────────────────────────────────────

interface AuthContextValue {
  /** Full profile from GET /auth/me (null when loading or logged out) */
  user: UserResponse | null;
  /** Cached basic info from localStorage (available immediately) */
  storedUser: StoredUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** Call after a successful login/verify to reload the profile */
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [storedUser, setStoredUser] = useState<StoredUser | null>(() =>
    getUser()
  );
  const [token, setToken] = useState<string | null>(() => getToken());
  const [isLoading, setIsLoading] = useState<boolean>(!!getToken()); // loading only if there's a token to validate

  const refreshUser = useCallback(async () => {
    try {
      const me = await authService.getMe();
      setUser(me);
      setToken(getToken());
      setStoredUser(getUser());
    } catch {
      // Token invalid — clear and stay logged out
      clearAuth();
      setUser(null);
      setToken(null);
      setStoredUser(null);
    }
  }, []);

  // On mount: if there's a saved token, validate it
  useEffect(() => {
    const savedToken = getToken();
    if (!savedToken) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    refreshUser().finally(() => setIsLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
    setToken(null);
    setStoredUser(null);
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        storedUser,
        token,
        isAuthenticated: !!token && !!storedUser,
        isLoading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export default AuthContext;

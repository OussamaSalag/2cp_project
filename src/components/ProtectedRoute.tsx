/**
 * src/components/ProtectedRoute.tsx
 * Wraps any route that requires authentication.
 * Shows a loading screen while validating the token,
 * then redirects to /login if not authenticated.
 */

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

interface Props {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      window.location.replace("/login");
    }
  }, [isAuthenticated, isLoading]);

  // While checking auth, show a centered spinner
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  // Not authenticated — blank screen while redirect fires
  if (!isAuthenticated) return null;

  return <>{children}</>;
}

export default ProtectedRoute;

import { Outlet, Link, createRootRoute } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";

// Single QueryClient instance shared across the app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,          // 30 seconds
      retry: (failureCount, error) => {
        // Don't retry on 401/403/404
        if (
          error instanceof Error &&
          "status" in error &&
          [401, 403, 404].includes((error as { status: number }).status)
        ) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold font-display gradient-text">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground font-display">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="retro-btn inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "TeamUp — Collaborative Student Projects" },
      {
        name: "description",
        content:
          "A platform for students and mentors to collaborate on projects, manage tasks, and communicate within teams.",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <Outlet />
          <Toaster richColors position="top-right" />
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

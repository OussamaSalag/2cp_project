import { Sidebar } from "./Sidebar";
import { Search, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage } from "@/i18n/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isDark, toggle } = useTheme();
  const { t } = useLanguage();
  const { user, storedUser } = useAuth();

  const displayName = user?.full_name ?? storedUser?.full_name ?? "User";
  const role = user ? "student" : storedUser?.role ?? "student";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-6 py-3">
          <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 w-96">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
            </button>
            <div className="flex items-center gap-3">
              {/* Avatar initials — no hardcoded image */}
              <div className="h-9 w-9 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">{initial}</span>
              </div>
              <div>
                <p className="text-sm font-semibold">{displayName}</p>
                <p className="text-xs text-muted-foreground capitalize">{t("student")}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

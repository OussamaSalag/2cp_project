import { Link, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  LayoutDashboard,
  ListTodo,
  User,
  Users,
  Bell,
  FolderOpen,
  Settings,
  HelpCircle,
  Handshake,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import notificationService from "@/services/notificationService";
import { isLoggedIn } from "@/lib/auth-storage";

export function Sidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  // Only poll when authenticated
  const { data: unreadData } = useQuery({
    queryKey: ["notifications-unread"],
    queryFn: () => notificationService.getUnreadCount(),
    refetchInterval: 30_000,
    enabled: isLoggedIn(),
  });

  const unreadCount = unreadData?.count ?? 0;

  const navItems = [
    { to: "/dashboard", label: t("dashboard"), icon: LayoutDashboard, badge: 0 },
    { to: "/projects",  label: t("projects"),  icon: FolderOpen,       badge: 0 },
    { to: "/tasks",     label: t("tasks"),      icon: ListTodo,         badge: 0 },
    { to: "/group",     label: t("group"),      icon: Users,            badge: 0 },
    { to: "/inbox",     label: t("inbox"),      icon: Bell,             badge: unreadCount },
    { to: "/profile",   label: t("profile"),    icon: User,             badge: 0 },
  ] as const;

  const bottomItems = [
    { to: "/settings", label: t("settings"), icon: Settings },
    { to: "/help",     label: t("help"),     icon: HelpCircle },
  ] as const;

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <Handshake className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold font-display tracking-tight">TeamUp</span>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {t("overview")}
        </p>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
              {item.badge > 0 && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground px-1">
                  {item.badge > 99 ? "99+" : item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-sidebar-border px-3 py-4 space-y-1">
        {bottomItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

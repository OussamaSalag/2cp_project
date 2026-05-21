import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Bell, CheckCheck, Circle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { toast } from "sonner";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import notificationService from "@/services/notificationService";
import type { NotificationResponse } from "@/types/api";

export const Route = createFileRoute("/inbox")({
  component: () => (
    <ProtectedRoute>
      <InboxPage />
    </ProtectedRoute>
  ),
});

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className}`} />;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function NotificationItem({
  n,
  onMarkRead,
}: {
  n: NotificationResponse;
  onMarkRead: (id: string) => void;
}) {
  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
        n.is_read ? "bg-card" : "bg-primary/5 border border-primary/20"
      }`}
    >
      <div
        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          n.is_read ? "bg-muted" : "bg-primary/10"
        }`}
      >
        <Bell className={`h-4 w-4 ${n.is_read ? "text-muted-foreground" : "text-primary"}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{n.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.body}</p>
        <p className="text-[10px] text-muted-foreground mt-1">{timeAgo(n.created_at)}</p>
      </div>
      {!n.is_read && (
        <button
          onClick={() => onMarkRead(n.id)}
          className="shrink-0 flex items-center gap-1 text-[10px] font-semibold text-primary hover:underline mt-1"
        >
          <CheckCheck className="h-3 w-3" /> Mark read
        </button>
      )}
      {n.is_read && <Circle className="h-3 w-3 text-muted-foreground/30 mt-2 shrink-0" />}
    </div>
  );
}

function InboxPage() {
  const { t } = useLanguage();
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationService.getNotifications(),
    refetchInterval: 30_000, // poll every 30 seconds
  });

  const { data: unreadData } = useQuery({
    queryKey: ["notifications-unread"],
    queryFn: () => notificationService.getUnreadCount(),
    refetchInterval: 30_000,
  });

  const markReadMutation = useMutation({
    mutationFn: (ids: string[]) => notificationService.markRead(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications-unread"] });
    },
    onError: () => toast.error("Failed to mark as read"),
  });

  const handleMarkRead = (id: string) => markReadMutation.mutate([id]);

  const handleMarkAllRead = () => {
    const unreadIds = notifications.filter((n) => !n.is_read).map((n) => n.id);
    if (unreadIds.length === 0) return;
    markReadMutation.mutate(unreadIds);
  };

  const unreadCount = unreadData?.count ?? notifications.filter((n) => !n.is_read).length;

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold font-display">{t("inbox")}</h1>
          {unreadCount > 0 && (
            <span className="flex items-center justify-center h-6 min-w-6 rounded-full bg-primary text-[11px] font-bold text-primary-foreground px-1.5">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            disabled={markReadMutation.isPending}
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted transition-colors"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all read
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 w-full" />)}
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-2xl bg-card p-16 text-center text-muted-foreground">
          <Bell className="h-12 w-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm">No notifications yet.</p>
          <p className="text-xs mt-1 opacity-60">
            You'll see join requests, task assignments, and updates here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Unread first */}
          {notifications.filter((n) => !n.is_read).length > 0 && (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
                Unread
              </p>
              {notifications
                .filter((n) => !n.is_read)
                .map((n) => (
                  <NotificationItem key={n.id} n={n} onMarkRead={handleMarkRead} />
                ))}
            </>
          )}
          {notifications.filter((n) => n.is_read).length > 0 && (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1 mt-4">
                Earlier
              </p>
              {notifications
                .filter((n) => n.is_read)
                .map((n) => (
                  <NotificationItem key={n.id} n={n} onMarkRead={handleMarkRead} />
                ))}
            </>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}

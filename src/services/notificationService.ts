/**
 * src/services/notificationService.ts
 * All notification-related API calls.
 */

import { api } from "@/lib/api";
import type { NotificationResponse, UnreadCountResponse } from "@/types/api";

const notificationService = {
  /** GET /notifications */
  getNotifications: () => api.get<NotificationResponse[]>("/notifications/"),

  /** GET /notifications/unread-count */
  getUnreadCount: () =>
    api.get<UnreadCountResponse>("/notifications/unread-count"),

  /** POST /notifications/mark-read */
  markRead: (notificationIds: string[]) =>
    api.post<{ marked: number }>("/notifications/mark-read", {
      notification_ids: notificationIds,
    }),
};

export default notificationService;

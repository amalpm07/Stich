export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

export async function getNotifications(userId: string): Promise<Notification[]> {
  // Implement notification fetch logic
  return [];
}

export async function markNotificationRead(id: string): Promise<void> {
  // Implement mark as read logic
}

export async function scheduleNotification(notification: Notification): Promise<void> {
  // Implement scheduled notification logic
} 
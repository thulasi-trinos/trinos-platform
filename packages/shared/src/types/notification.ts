export type NotificationChannel = 'IN_APP' | 'EMAIL';

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  entityType?: string;
  entityId?: string;
  channel: NotificationChannel;
  readAt?: Date;
  createdAt: Date;
}

export interface NotificationPreference {
  id: string;
  userId: string;
  emailEnabled: boolean;
  inAppEnabled: boolean;
  perTypePrefs: Record<string, { emailEnabled: boolean; inAppEnabled: boolean }>;
}

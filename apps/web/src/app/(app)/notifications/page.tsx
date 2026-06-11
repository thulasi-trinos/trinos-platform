import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { NotificationList } from '@/components/modules/notifications/NotificationList';

export default function NotificationsPage(): ReactNode {
  return (
    <div>
      <PageHeader eyebrow="Communicate" title="Notifications" description="Everything that needs your attention." />
      <NotificationList />
    </div>
  );
}

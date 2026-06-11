'use client';

import type { ReactNode } from 'react';

import { Card, CardHead, CardPad, EmptyState } from '@/components/ui';

export function NotificationList(): ReactNode {
  return (
    <Card>
      <CardHead title="Notifications" subtitle="Reports, blockers, mentions, and routing events" />
      <CardPad>
        <EmptyState title="You're all caught up" description="New notifications will show up here." />
      </CardPad>
    </Card>
  );
}

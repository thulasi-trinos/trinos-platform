'use client';

import type { ReactNode } from 'react';

import { Card, CardHead, CardPad, EmptyState } from '@/components/ui';

interface AdminSectionProps {
  title: string;
  subtitle?: string;
  emptyTitle: string;
  emptyDescription?: string;
  children?: ReactNode;
}

/** Shared shell for the admin CRUD screens (users / teams / settings / audit). */
export function AdminSection({
  title,
  subtitle,
  emptyTitle,
  emptyDescription,
  children,
}: AdminSectionProps): ReactNode {
  return (
    <Card>
      <CardHead title={title} subtitle={subtitle} />
      <CardPad>{children ?? <EmptyState title={emptyTitle} description={emptyDescription} />}</CardPad>
    </Card>
  );
}

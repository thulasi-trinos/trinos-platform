'use client';

import type { ReactNode } from 'react';

import { Card, CardHead, CardPad, EmptyState } from '@/components/ui';

/** Organisation-wide rollup for MDs / admins. */
export function OrgOverview(): ReactNode {
  return (
    <Card>
      <CardHead title="Organisation compliance" subtitle="Submission rates across all teams" />
      <CardPad>
        <EmptyState title="No teams to show" description="Org metrics populate once teams submit reports." />
      </CardPad>
    </Card>
  );
}

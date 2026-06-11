'use client';

import type { ReactNode } from 'react';

import { BLOCKER_STATUS_LABELS } from '@trinos/shared';
import type { BlockerStatus } from '@trinos/shared';

import { Badge, Card, CardHead, CardPad, EmptyState } from '@/components/ui';
import type { BadgeTone } from '@/components/ui';

const TONE: Record<BlockerStatus, BadgeTone> = {
  OPEN: 'warn',
  ESCALATED: 'danger',
  RESOLVED: 'ok',
};

const COLUMNS: BlockerStatus[] = ['OPEN', 'ESCALATED', 'RESOLVED'];

/** Blocker triage board grouped by status (escalation path: TL → MD → super admin). */
export function BlockerBoard(): ReactNode {
  return (
    <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-3">
      {COLUMNS.map((status) => (
        <Card key={status}>
          <CardHead title={<Badge tone={TONE[status]}>{BLOCKER_STATUS_LABELS[status]}</Badge>} />
          <CardPad>
            <EmptyState title="Empty" description={`No ${BLOCKER_STATUS_LABELS[status].toLowerCase()} blockers.`} />
          </CardPad>
        </Card>
      ))}
    </div>
  );
}

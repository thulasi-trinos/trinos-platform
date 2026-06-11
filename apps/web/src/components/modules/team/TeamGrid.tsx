'use client';

import type { ReactNode } from 'react';

import { Card, CardHead, CardPad, EmptyState } from '@/components/ui';

/**
 * Weekly compliance grid for a team lead's direct reports (style guide §4.8).
 * Member rows × day cells; data wiring arrives in a later prompt.
 */
export function TeamGrid(): ReactNode {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  return (
    <Card>
      <CardHead title="This week" subtitle="Daily submission status per member" />
      <CardPad>
        <div
          className="grid items-center gap-2 text-[11px] font-bold uppercase tracking-[.07em] text-ink4"
          style={{ gridTemplateColumns: '1.6fr repeat(5, 46px) 1fr' }}
        >
          <span>Member</span>
          {days.map((d) => (
            <span key={d} className="text-center">
              {d}
            </span>
          ))}
          <span className="text-right">Rate</span>
        </div>
        <EmptyState title="No team members yet" description="Members appear here once they're assigned to your team." />
      </CardPad>
    </Card>
  );
}

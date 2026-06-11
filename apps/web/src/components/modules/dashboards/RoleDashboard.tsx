'use client';

import { AlertOctagon, CheckCircle2, Clock, Users } from 'lucide-react';
import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardHead, CardPad, EmptyState, StatCard } from '@/components/ui';
import { primaryRole } from '@/lib/permissions';
import { useUIStore } from '@/store/uiStore';

/**
 * Role-routed dashboard. The stat set shown depends on the viewer's highest
 * role — employees see their own compliance, leads/MDs see team/org rollups.
 * Data wiring lands in a later prompt; this establishes the layout + altitude.
 */
export function RoleDashboard(): ReactNode {
  const user = useUIStore((s) => s.currentUser);
  const role = primaryRole(user);
  const oversight = role === 'TEAM_LEAD' || role === 'MD' || role === 'ADMIN' || role === 'SUPER_ADMIN';

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title={`Welcome${user ? `, ${user.name.split(' ')[0]}` : ''}`}
        description="Your daily status at a glance — what's due, what's submitted, and what needs attention."
      />

      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Submitted" value="—" icon={<CheckCircle2 size={18} />} />
        <StatCard label="Pending today" value="—" icon={<Clock size={18} />} />
        <StatCard label="Open blockers" value="—" icon={<AlertOctagon size={18} />} />
        <StatCard label={oversight ? 'Team members' : 'Streak'} value="—" icon={<Users size={18} />} />
      </div>

      <div className="mt-[18px] grid grid-cols-1 gap-[18px] lg:grid-cols-[1.6fr_1fr]">
        <Card>
          <CardHead title="Recent activity" subtitle="Latest reports and routing events" />
          <CardPad>
            <EmptyState title="Nothing here yet" description="Activity will appear once reports start flowing." />
          </CardPad>
        </Card>
        <Card>
          <CardHead title={oversight ? 'Compliance' : 'Your week'} />
          <CardPad>
            <EmptyState title="No data" description="Metrics populate as the week progresses." />
          </CardPad>
        </Card>
      </div>
    </div>
  );
}

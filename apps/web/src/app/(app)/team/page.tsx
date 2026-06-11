import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { TeamGrid } from '@/components/modules/team/TeamGrid';

export default function TeamPage(): ReactNode {
  return (
    <div>
      <PageHeader
        eyebrow="Oversight"
        title="Team"
        description="Daily submission compliance for your direct reports."
      />
      <TeamGrid />
    </div>
  );
}

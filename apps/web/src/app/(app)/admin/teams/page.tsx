import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { AdminSection } from '@/components/modules/admin/AdminSection';

export default function AdminTeamsPage(): ReactNode {
  return (
    <div>
      <PageHeader eyebrow="Admin" title="Teams" description="Create teams and assign leads and members." />
      <AdminSection
        title="All teams"
        subtitle="Team structure and leadership"
        emptyTitle="No teams yet"
        emptyDescription="Team management is wired up in a later prompt."
      />
    </div>
  );
}

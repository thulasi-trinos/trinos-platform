import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { AdminSection } from '@/components/modules/admin/AdminSection';

export default function AdminAuditPage(): ReactNode {
  return (
    <div>
      <PageHeader eyebrow="Admin" title="Audit log" description="Immutable record of privileged actions across the platform." />
      <AdminSection
        title="Audit trail"
        subtitle="Who did what, and when"
        emptyTitle="No audit entries"
        emptyDescription="Audit logging is wired up in a later prompt."
      />
    </div>
  );
}

import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { AdminSection } from '@/components/modules/admin/AdminSection';

export default function AdminSettingsPage(): ReactNode {
  return (
    <div>
      <PageHeader eyebrow="Admin" title="Settings" description="System configuration: deadlines, routing, and notifications." />
      <AdminSection
        title="System configuration"
        subtitle="Platform-wide settings"
        emptyTitle="No settings to show"
        emptyDescription="Configuration controls are wired up in a later prompt."
      />
    </div>
  );
}

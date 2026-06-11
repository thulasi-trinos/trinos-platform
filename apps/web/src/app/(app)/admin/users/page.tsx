import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { AdminSection } from '@/components/modules/admin/AdminSection';

export default function AdminUsersPage(): ReactNode {
  return (
    <div>
      <PageHeader eyebrow="Admin" title="Users" description="Create users, assign roles, and manage status." />
      <AdminSection
        title="All users"
        subtitle="Accounts across the organisation"
        emptyTitle="No users yet"
        emptyDescription="User management is wired up in a later prompt."
      />
    </div>
  );
}

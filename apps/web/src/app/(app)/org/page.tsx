import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { OrgOverview } from '@/components/modules/org/OrgOverview';

export default function OrgPage(): ReactNode {
  return (
    <div>
      <PageHeader
        eyebrow="Oversight"
        title="Organisation"
        description="Cross-team submission rates and blocker trends."
      />
      <OrgOverview />
    </div>
  );
}

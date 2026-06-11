import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { BlockerBoard } from '@/components/modules/blockers/BlockerBoard';

export default function BlockersPage(): ReactNode {
  return (
    <div>
      <PageHeader
        eyebrow="Oversight"
        title="Blockers"
        description="Open, escalated, and resolved blockers across your scope."
      />
      <BlockerBoard />
    </div>
  );
}

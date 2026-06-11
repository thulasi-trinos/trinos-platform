import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardPad, EmptyState } from '@/components/ui';

export default function TeamReportReviewPage({
  params,
}: {
  params: { reportId: string };
}): ReactNode {
  return (
    <div>
      <PageHeader
        eyebrow="Review"
        title="Review report"
        description={`Reviewing ${params.reportId} — flag blockers or acknowledge.`}
      />
      <Card>
        <CardPad>
          <EmptyState
            title="Report not loaded"
            description="Review actions (flag / escalate / resolve) are wired up in a later prompt."
          />
        </CardPad>
      </Card>
    </div>
  );
}

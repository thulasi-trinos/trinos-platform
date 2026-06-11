import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardPad, EmptyState } from '@/components/ui';

export default function ReportDetailPage({ params }: { params: { id: string } }): ReactNode {
  return (
    <div>
      <PageHeader eyebrow="Report" title="Report detail" description={`Viewing ${params.id}`} />
      <Card>
        <CardPad>
          <EmptyState
            title="Report not loaded"
            description="Report fetching is wired up in a later prompt; this is the detail layout."
          />
        </CardPad>
      </Card>
    </div>
  );
}

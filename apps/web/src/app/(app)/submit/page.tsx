import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { ReportForm } from '@/components/modules/reports/ReportForm';
import { formatDate } from '@/lib/format';

export default function SubmitPage(): ReactNode {
  const today = new Date();
  const reportDate = today.toISOString().slice(0, 10);

  return (
    <div>
      <PageHeader
        eyebrow="Daily report"
        title="Submit today's report"
        description={`For ${formatDate(today)}. Fields autosave as a draft until you submit.`}
      />
      <ReportForm reportDate={reportDate} />
    </div>
  );
}

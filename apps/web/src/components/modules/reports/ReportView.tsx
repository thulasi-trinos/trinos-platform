import type { ReactNode } from 'react';

import { REPORT_FIELDS } from '@trinos/shared';
import type { Report } from '@trinos/shared';

import { Badge, Card, CardHead, CardPad } from '@/components/ui';
import { formatDate } from '@/lib/format';

interface ReportViewProps {
  report: Report;
}

/** Read-only render of a submitted report's four fields. */
export function ReportView({ report }: ReportViewProps): ReactNode {
  return (
    <Card formCard>
      <CardHead
        title={<span className="font-mono text-[15px]">{report.code}</span>}
        subtitle={formatDate(report.reportDate)}
        action={
          <Badge tone={report.status === 'SUBMITTED' ? 'ok' : 'warn'}>{report.status}</Badge>
        }
      />
      <CardPad className="flex flex-col gap-5">
        {REPORT_FIELDS.map((field) => {
          const value = report[field.key];
          return (
            <section key={field.key}>
              <h4 className="mb-1.5 text-[10.5px] font-bold uppercase tracking-[.07em] text-ink4">
                {field.label}
              </h4>
              <div
                className="text-[14.5px] leading-[1.6] text-ink"
                dangerouslySetInnerHTML={{ __html: value || '<em>—</em>' }}
              />
            </section>
          );
        })}
      </CardPad>
    </Card>
  );
}

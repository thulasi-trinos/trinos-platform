import Link from 'next/link';
import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { Button, Card, CardPad, EmptyState } from '@/components/ui';

export default function MyReportsPage(): ReactNode {
  return (
    <div>
      <PageHeader
        eyebrow="History"
        title="My reports"
        description="Every report you've submitted, with status and edit window."
        action={
          <Link href="/submit">
            <Button size="sm">New report</Button>
          </Link>
        }
      />
      <Card>
        <CardPad>
          <EmptyState
            title="No reports yet"
            description="Submit your first daily report to see it listed here."
            action={
              <Link href="/submit">
                <Button size="sm">Submit a report</Button>
              </Link>
            }
          />
        </CardPad>
      </Card>
    </div>
  );
}

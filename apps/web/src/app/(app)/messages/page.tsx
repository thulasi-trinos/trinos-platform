import type { ReactNode } from 'react';

import { PageHeader } from '@/components/layout/PageHeader';
import { MessagesView } from '@/components/modules/messages/MessagesView';

export default function MessagesPage(): ReactNode {
  return (
    <div>
      <PageHeader eyebrow="Communicate" title="Messages" description="Team channels and direct messages." />
      <MessagesView />
    </div>
  );
}

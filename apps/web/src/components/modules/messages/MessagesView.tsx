'use client';

import type { ReactNode } from 'react';

import { EmptyState } from '@/components/ui';

/**
 * Two-pane chat: channel/conversation list + message thread (style guide §5
 * chat layout). Realtime via socket.io; wiring lands in a later prompt.
 */
export function MessagesView(): ReactNode {
  return (
    <div
      className="grid overflow-hidden rounded-lg border border-line bg-paper"
      style={{ gridTemplateColumns: '288px 1fr', height: 'calc(100vh - 66px - 90px)' }}
    >
      <div className="border-r border-line bg-paper2">
        <div className="border-b border-line px-4 py-3 text-[13px] font-semibold text-ink2">Conversations</div>
        <EmptyState title="No conversations" description="Team channels and direct messages appear here." />
      </div>
      <div className="flex items-center justify-center">
        <EmptyState title="Select a conversation" description="Choose a channel or person to start messaging." />
      </div>
    </div>
  );
}

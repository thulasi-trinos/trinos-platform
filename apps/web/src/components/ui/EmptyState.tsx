import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center text-center py-[48px] px-6">
      <span className="text-silver500 mb-3">{icon ?? <Inbox size={40} strokeWidth={1.5} />}</span>
      <h3 className="font-sora text-[16px] font-semibold text-ink2">{title}</h3>
      {description && <p className="mt-1 text-[13.5px] text-ink4 max-w-[360px]">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

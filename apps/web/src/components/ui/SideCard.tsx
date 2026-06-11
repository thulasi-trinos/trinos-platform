import clsx from 'clsx';
import type { ReactNode } from 'react';

interface SideCardProps {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Compact secondary panel used in 2-column dashboard layouts. */
export function SideCard({ title, children, className }: SideCardProps): ReactNode {
  return (
    <aside className={clsx('bg-paper border border-line rounded-lg shadow-sm p-[18px]', className)}>
      {title && (
        <h4 className="font-sora text-[14px] font-semibold text-ink mb-3">{title}</h4>
      )}
      {children}
    </aside>
  );
}

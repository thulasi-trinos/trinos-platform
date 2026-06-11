import clsx from 'clsx';
import type { ReactNode } from 'react';

interface SectionDividerProps {
  label?: string;
  className?: string;
}

export function SectionDivider({ label, className }: SectionDividerProps): ReactNode {
  if (!label) return <hr className={clsx('border-0 border-t border-line my-4', className)} />;
  return (
    <div className={clsx('flex items-center gap-3 my-4', className)}>
      <span className="text-[10.5px] font-bold uppercase tracking-[.1em] text-ink4 whitespace-nowrap">
        {label}
      </span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

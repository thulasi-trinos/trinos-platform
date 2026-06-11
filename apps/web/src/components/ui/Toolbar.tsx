import clsx from 'clsx';
import type { ReactNode } from 'react';

export function Toolbar({ className, children }: { className?: string; children: ReactNode }): ReactNode {
  return (
    <div
      className={clsx(
        'flex gap-0.5 p-[5px] w-fit bg-paper2 border border-line rounded-[9px]',
        className
      )}
    >
      {children}
    </div>
  );
}

interface ToolbarButtonProps {
  active?: boolean;
  onClick?: () => void;
  label: string;
  children: ReactNode;
}

export function ToolbarButton({ active, onClick, label, children }: ToolbarButtonProps): ReactNode {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center w-[30px] h-[30px] rounded-[6px] transition-[.15s]',
        active ? 'bg-paper text-ink shadow-sm' : 'text-ink3 hover:bg-paper hover:text-ink hover:shadow-sm'
      )}
    >
      {children}
    </button>
  );
}

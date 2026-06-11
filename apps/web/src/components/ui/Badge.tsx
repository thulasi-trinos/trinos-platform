import clsx from 'clsx';
import type { ReactNode } from 'react';

export type BadgeTone = 'ok' | 'warn' | 'danger' | 'blue' | 'gray' | 'purple';

const tones: Record<BadgeTone, string> = {
  ok: 'bg-okBg text-ok',
  warn: 'bg-warnBg text-warn',
  danger: 'bg-dangerBg text-danger',
  blue: 'bg-blue50 text-blue600',
  gray: 'bg-paper3 text-ink3',
  purple: 'bg-purpleBg text-purple',
};

interface BadgeProps {
  tone?: BadgeTone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = 'gray', icon, children, className }: BadgeProps): ReactNode {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-[5px] px-[9px] py-[3px] rounded-[20px] text-[11.5px] font-semibold tracking-[.01em] font-hanken',
        tones[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

import clsx from 'clsx';
import type { ReactNode } from 'react';

import { initials } from '@/lib/format';

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarColor = 'default' | 'green' | 'purple' | 'warn' | 'silver' | 'deep';

const sizes: Record<AvatarSize, string> = {
  sm: 'w-8 h-8 text-[12px] rounded-[9px]',
  md: 'w-[38px] h-[38px] text-[14px] rounded-[11px]',
  lg: 'w-[52px] h-[52px] text-[18px] rounded-[14px]',
};

const colors: Record<AvatarColor, string> = {
  default: 'bg-grad-tri',
  green: 'bg-ok',
  purple: 'bg-purple',
  warn: 'bg-warn',
  silver: 'bg-silver600',
  deep: 'bg-blue800',
};

interface AvatarProps {
  name: string;
  size?: AvatarSize;
  color?: AvatarColor;
  className?: string;
}

export function Avatar({ name, size = 'md', color = 'default', className }: AvatarProps): ReactNode {
  return (
    <span
      aria-hidden="true"
      className={clsx(
        'inline-flex items-center justify-center font-sora font-semibold tracking-[.01em] text-white select-none',
        sizes[size],
        colors[color],
        className
      )}
    >
      {initials(name)}
    </span>
  );
}

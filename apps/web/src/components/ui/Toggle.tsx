'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, disabled }: ToggleProps): ReactNode {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative inline-flex h-[24px] w-[42px] items-center rounded-[20px] transition-[.15s] disabled:opacity-50',
        checked ? 'bg-blue500' : 'bg-silver300'
      )}
    >
      <span
        className={clsx(
          'inline-block h-[18px] w-[18px] rounded-full bg-paper shadow-sm transition-[.15s]',
          checked ? 'translate-x-[21px]' : 'translate-x-[3px]'
        )}
      />
    </button>
  );
}

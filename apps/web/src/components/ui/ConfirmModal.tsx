'use client';

import type { ReactNode } from 'react';

import { useConfirmState } from '@/hooks/useConfirm';

import { Button } from './Button';

/**
 * Single instance mounted in the AppShell. Driven by the useConfirm store so
 * any handler can `await confirm({...})` without rendering its own modal.
 */
export function ConfirmModal(): ReactNode {
  const { open, options, settle } = useConfirmState();
  if (!open || !options) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(23,36,48,.45)] animate-fadeIn"
      onClick={() => settle(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-[420px] max-w-[90vw] bg-paper rounded-lg shadow-lg p-[24px] animate-pop"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-sora text-[18px] font-semibold text-ink">{options.title}</h2>
        {options.description && <p className="mt-2 text-[14px] text-ink3">{options.description}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => settle(false)}>
            {options.cancelLabel ?? 'Cancel'}
          </Button>
          <Button
            variant={options.danger ? 'danger' : 'primary'}
            size="sm"
            onClick={() => settle(true)}
          >
            {options.confirmLabel ?? 'Confirm'}
          </Button>
        </div>
      </div>
    </div>
  );
}

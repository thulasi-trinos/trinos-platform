'use client';

import { useCallback } from 'react';

import { useUIStore } from '@/store/uiStore';
import type { Toast, ToastVariant } from '@/types';

function makeId(): string {
  return `toast_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

const AUTO_DISMISS_MS = 5000;

export function useToast(): {
  toasts: Toast[];
  toast: (variant: ToastVariant, title: string, description?: string) => void;
  dismiss: (id: string) => void;
} {
  const toasts = useUIStore((s) => s.toasts);
  const pushToast = useUIStore((s) => s.pushToast);
  const dismissToast = useUIStore((s) => s.dismissToast);

  const toast = useCallback(
    (variant: ToastVariant, title: string, description?: string) => {
      const id = makeId();
      pushToast({ id, variant, title, description });
      setTimeout(() => dismissToast(id), AUTO_DISMISS_MS);
    },
    [pushToast, dismissToast]
  );

  return { toasts, toast, dismiss: dismissToast };
}

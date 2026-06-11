'use client';

import clsx from 'clsx';
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';

import { useToast } from '@/hooks/useToast';
import type { Toast as ToastType, ToastVariant } from '@/types';

const config: Record<ToastVariant, { icon: ReactNode; accent: string }> = {
  success: { icon: <CheckCircle2 size={18} className="text-ok" />, accent: 'border-l-ok' },
  error: { icon: <XCircle size={18} className="text-danger" />, accent: 'border-l-danger' },
  warn: { icon: <AlertTriangle size={18} className="text-warn" />, accent: 'border-l-warn' },
  info: { icon: <Info size={18} className="text-blue500" />, accent: 'border-l-blue500' },
};

function ToastItem({ toast, onDismiss }: { toast: ToastType; onDismiss: (id: string) => void }): ReactNode {
  const cfg = config[toast.variant];
  return (
    <div
      role="status"
      className={clsx(
        'flex items-start gap-3 w-[340px] bg-paper rounded-md shadow-lg border-l-[3px] p-[14px] animate-toastSlideUp',
        cfg.accent
      )}
    >
      <span className="shrink-0 mt-0.5">{cfg.icon}</span>
      <div className="flex-1">
        <p className="text-[14px] font-semibold text-ink">{toast.title}</p>
        {toast.description && <p className="text-[13px] text-ink3 mt-0.5">{toast.description}</p>}
      </div>
      <button aria-label="Dismiss" onClick={() => onDismiss(toast.id)} className="text-ink4 hover:text-ink2">
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastContainer(): ReactNode {
  const { toasts, dismiss } = useToast();
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
      ))}
    </div>
  );
}

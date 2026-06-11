'use client';

import { create } from 'zustand';

import type { ConfirmOptions } from '@/types';

interface ConfirmState {
  open: boolean;
  options: ConfirmOptions | null;
  resolve: ((value: boolean) => void) | null;
  request: (options: ConfirmOptions) => Promise<boolean>;
  settle: (value: boolean) => void;
}

/**
 * Promise-based confirmation. A single <ConfirmModal /> mounted in the AppShell
 * subscribes to this store; `confirm(opts)` resolves to the user's choice.
 */
const useConfirmStore = create<ConfirmState>((set, get) => ({
  open: false,
  options: null,
  resolve: null,
  request: (options) =>
    new Promise<boolean>((resolve) => {
      set({ open: true, options, resolve });
    }),
  settle: (value) => {
    get().resolve?.(value);
    set({ open: false, options: null, resolve: null });
  },
}));

/** Imperative confirm() for event handlers. */
export function useConfirm(): (options: ConfirmOptions) => Promise<boolean> {
  return useConfirmStore((s) => s.request);
}

/** Used by the mounted ConfirmModal to read/close state. */
export function useConfirmState(): Pick<ConfirmState, 'open' | 'options' | 'settle'> {
  return useConfirmStore((s) => ({ open: s.open, options: s.options, settle: s.settle }));
}

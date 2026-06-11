import { create } from 'zustand';

import type { User } from '@trinos/shared';

import type { ActiveModal, Toast } from '@/types';

interface UIState {
  // Current user (hydrated by useAuth once /auth/me resolves).
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;

  // Active navigation path (drives sidebar highlight).
  activeNav: string;
  setActiveNav: (path: string) => void;

  // Sidebar collapse (mobile / dense view).
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Toasts.
  toasts: Toast[];
  pushToast: (toast: Toast) => void;
  dismissToast: (id: string) => void;

  // Modal stack.
  modal: ActiveModal | null;
  openModal: (modal: ActiveModal) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set({ currentUser }),

  activeNav: '/dashboard',
  setActiveNav: (activeNav) => set({ activeNav }),

  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),

  toasts: [],
  pushToast: (toast) => set((s) => ({ toasts: [...s.toasts, toast] })),
  dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),

  modal: null,
  openModal: (modal) => set({ modal }),
  closeModal: () => set({ modal: null }),
}));

import type { ReactNode } from 'react';

/** Frontend-only types. Domain entities come from @trinos/shared — never redefine them here. */

export type ToastVariant = 'success' | 'error' | 'warn' | 'info';

export interface Toast {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

export interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

export interface NavLink {
  href: string;
  label: string;
  /** lucide-react icon name resolved by the Sidebar. */
  icon: string;
  /** Capability required to see this link (checked via lib/permissions). */
  capability?: string;
  badgeCount?: number;
}

export interface NavSection {
  label?: string;
  links: NavLink[];
}

/** Generic modal descriptor held in the UI store. */
export interface ActiveModal {
  id: string;
  content?: ReactNode;
}

'use client';

import { can } from '@/lib/permissions';
import { useUIStore } from '@/store/uiStore';

/** Returns a predicate bound to the current user for capability checks in JSX. */
export function usePermission(): (capability: string) => boolean {
  const currentUser = useUIStore((s) => s.currentUser);
  return (capability: string) => can(currentUser, capability);
}

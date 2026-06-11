'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import type { User } from '@trinos/shared';

import { fetchCurrentUser } from '@/lib/auth';
import { useUIStore } from '@/store/uiStore';

/**
 * Loads the authenticated user via /auth/me and mirrors it into the UI store
 * so non-React-Query consumers (sidebar, permission checks) can read it.
 */
export function useAuth(): {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
} {
  const setCurrentUser = useUIStore((s) => s.setCurrentUser);

  const query = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: fetchCurrentUser,
    retry: false,
    staleTime: 5 * 60_000,
  });

  useEffect(() => {
    setCurrentUser(query.data ?? null);
  }, [query.data, setCurrentUser]);

  return { user: query.data ?? null, isLoading: query.isLoading, isError: query.isError };
}

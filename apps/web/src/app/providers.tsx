'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

import { makeQueryClient } from '@/lib/queryClient';

export function Providers({ children }: { children: ReactNode }): ReactNode {
  // One client per browser session, stable across re-renders.
  const [queryClient] = useState(makeQueryClient);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

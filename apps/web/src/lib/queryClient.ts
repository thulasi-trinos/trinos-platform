import { QueryClient } from '@tanstack/react-query';

/** Factory so each browser session gets its own cache (App Router friendly). */
export function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

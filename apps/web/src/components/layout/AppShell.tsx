'use client';

import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { disconnectSocket, getSocket } from '@/lib/socket';

import { ConfirmModal } from '../ui/ConfirmModal';
import { Skeleton } from '../ui/Skeleton';
import { ToastContainer } from '../ui/Toast';

import { RoleAwareSidebar } from './RoleAwareSidebar';
import { Topbar } from './Topbar';

/**
 * Authenticated app frame: sidebar + topbar + content. Middleware guards at the
 * edge; this is the client-side fallback (handles cookie-present-but-invalid)
 * and the place we open the realtime socket for the session.
 */
export function AppShell({ children }: { children: ReactNode }): ReactNode {
  const { user, isLoading, isError } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isError) router.replace('/login');
  }, [isError, router]);

  useEffect(() => {
    const socket = getSocket();
    socket.connect();
    return () => {
      disconnectSocket();
    };
  }, []);

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen">
        <div className="w-[250px] bg-blue900" />
        <div className="flex-1 p-8">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="mt-4 h-40 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <RoleAwareSidebar />
      <div className="ml-[250px] flex min-h-screen flex-col">
        <Topbar />
        <main className="mx-auto w-full max-w-[1280px] flex-1 px-[30px] pb-[60px] pt-[30px]">
          {children}
        </main>
      </div>
      <ConfirmModal />
      <ToastContainer />
    </div>
  );
}

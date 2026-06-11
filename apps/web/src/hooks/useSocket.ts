'use client';

import { useEffect } from 'react';

import { getSocket } from '@/lib/socket';

/**
 * Subscribe to a real-time event for the lifetime of the component. Event
 * names follow @trinos/shared EVENTS (`entity.action`).
 */
export function useSocket<T = unknown>(event: string, handler: (payload: T) => void): void {
  useEffect(() => {
    const socket = getSocket();
    if (!socket.connected) socket.connect();
    socket.on(event, handler);
    return () => {
      socket.off(event, handler);
    };
  }, [event, handler]);
}

import { io, type Socket } from 'socket.io-client';

let socket: Socket | null = null;

/**
 * Lazily-created singleton socket. `withCredentials` sends the JWT cookie so
 * the server can authenticate the connection. Real-time events follow the
 * `entity.action` naming from @trinos/shared (EVENTS).
 */
export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL ?? 'http://localhost:4000', {
      withCredentials: true,
      autoConnect: false,
      transports: ['websocket'],
    });
  }
  return socket;
}

export function disconnectSocket(): void {
  socket?.disconnect();
  socket = null;
}

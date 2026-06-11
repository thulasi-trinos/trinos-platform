import type { Server as HttpServer } from 'node:http';

import cookie from 'cookie';
import { Server as IOServer, type Socket } from 'socket.io';

import { COOKIES, ROOMS } from '../config/constants';
import { corsOrigins } from '../config/env';
import { logger } from '../lib/logger';
import { isBlocklisted, verifyAccessToken } from '../lib/tokens';

let io: IOServer | null = null;

/** Attach a Socket.io server with JWT cookie auth to the given http server. */
export function initIo(httpServer: HttpServer): IOServer {
  io = new IOServer(httpServer, {
    cors: { origin: corsOrigins, credentials: true },
  });

  // Authenticate every socket from the access cookie (or auth token).
  io.use(async (socket, nextFn) => {
    try {
      const header = socket.handshake.headers.cookie ?? '';
      const cookies = cookie.parse(header);
      const token =
        (socket.handshake.auth as { token?: string } | undefined)?.token ?? cookies[COOKIES.ACCESS];
      if (!token) return nextFn(new Error('unauthorized'));

      const payload = verifyAccessToken(token);
      if (await isBlocklisted(payload.jti)) return nextFn(new Error('revoked'));

      socket.data.userId = payload.sub;
      socket.data.roles = payload.roles;
      nextFn();
    } catch {
      nextFn(new Error('unauthorized'));
    }
  });

  io.on('connection', (socket: Socket) => {
    const userId = socket.data.userId as string;
    const roles = (socket.data.roles as string[] | undefined) ?? [];

    // Per-user room + role rooms. Entity rooms are joined on demand.
    void socket.join(ROOMS.user(userId));
    for (const role of roles) void socket.join(ROOMS.role(role));

    socket.on('entity:subscribe', (entityType: string, entityId: string) => {
      void socket.join(ROOMS.entity(entityType, entityId));
    });
    socket.on('entity:unsubscribe', (entityType: string, entityId: string) => {
      void socket.leave(ROOMS.entity(entityType, entityId));
    });

    logger.debug({ userId }, 'socket connected');
  });

  return io;
}

export function getIo(): IOServer {
  if (!io) throw new Error('Socket.io not initialised');
  return io;
}

/** Emit to a single user's room. */
export function emitToUser(userId: string, event: string, payload: unknown): void {
  io?.to(ROOMS.user(userId)).emit(event, payload);
}

/** Emit to all sockets holding a role. */
export function emitToRole(role: string, event: string, payload: unknown): void {
  io?.to(ROOMS.role(role)).emit(event, payload);
}

/** Emit to subscribers of a specific entity. */
export function emitToEntity(type: string, id: string, event: string, payload: unknown): void {
  io?.to(ROOMS.entity(type, id)).emit(event, payload);
}

export async function closeIo(): Promise<void> {
  if (io) {
    await io.close();
    io = null;
  }
}

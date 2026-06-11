import { createServer, type Server as HttpServer } from 'node:http';

import type { Express } from 'express';
import type { Server as IOServer } from 'socket.io';

import { initIo } from '../realtime/io';

export interface HttpStack {
  httpServer: HttpServer;
  io: IOServer;
}

/** Wrap the Express app in an http.Server and attach a Socket.io instance. */
export function createHttpServer(app: Express): HttpStack {
  const httpServer = createServer(app);
  const io = initIo(httpServer);
  return { httpServer, io };
}

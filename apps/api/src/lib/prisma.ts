import { PrismaClient } from '@prisma/client';

import { isProd } from '../config/env';

// Single PrismaClient instance for the process. In dev, tsx reloads create new
// modules, so guard against exhausting connections by caching on globalThis.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: isProd ? ['error', 'warn'] : ['error', 'warn'],
  });

if (!isProd) globalForPrisma.prisma = prisma;

export async function connectPrisma(): Promise<void> {
  await prisma.$connect();
}

export async function disconnectPrisma(): Promise<void> {
  await prisma.$disconnect();
}

export async function pingDatabase(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

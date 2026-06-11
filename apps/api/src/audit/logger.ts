import { Prisma } from '@prisma/client';

import { logger } from '../lib/logger';
import { prisma } from '../lib/prisma';

export interface AuditInput {
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
}

/**
 * Append an immutable audit record (FR-ADM audit trail). Failures are logged
 * but never thrown — auditing must not break the request it observes.
 */
export async function audit(input: AuditInput): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: input.userId,
        action: input.action,
        entityType: input.entityType,
        entityId: input.entityId,
        details: (input.details ?? {}) as Prisma.InputJsonValue,
        ipAddress: input.ipAddress,
      },
    });
  } catch (err) {
    logger.error({ err, action: input.action }, 'failed to write audit log');
  }
}

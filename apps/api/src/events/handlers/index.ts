import { EVENTS } from '@trinos/shared';

import { logger } from '../../lib/logger';
import { bus } from '../bus';

/**
 * Register all domain event handlers. Called once during bootstrap.
 * Concrete side effects (enqueue notification jobs, route reports, escalate
 * blockers) are wired in their respective module prompts; this establishes the
 * subscription point and a safe default.
 */
export function registerEventHandlers(): void {
  bus.on(EVENTS.REPORT_SUBMITTED, (payload) => {
    logger.debug({ payload }, 'handler: report.submitted');
  });

  bus.on(EVENTS.BLOCKER_ESCALATED, (payload) => {
    logger.debug({ payload }, 'handler: blocker.escalated');
  });

  logger.debug('domain event handlers registered');
}

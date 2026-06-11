import { EventEmitter } from 'node:events';

import type { EventName } from '@trinos/shared';

import { logger } from '../lib/logger';

/**
 * Process-local domain event bus. Handlers subscribe via `bus.on(EVENTS.X, fn)`.
 * Cross-process fan-out (notifications, realtime) is done by handlers that
 * enqueue BullMQ jobs or emit over Socket.io — keep this bus synchronous and thin.
 */
class DomainBus extends EventEmitter {
  emitEvent<T = unknown>(name: EventName, payload: T): void {
    logger.debug({ event: name }, 'domain event');
    this.emit(name, payload);
  }
}

export const bus = new DomainBus();
// A platform may register dozens of handlers across modules.
bus.setMaxListeners(50);

import type { Role } from '../constants/roles.js';

export type RoutingChannel = 'TEAM_LEAD' | 'MD';

export interface RoutingLog {
  id: string;
  reportId: string;
  recipientId: string;
  recipientRole: Role;
  channel: RoutingChannel;
  deliveredAt: Date;
}

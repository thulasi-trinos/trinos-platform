import type { Role } from '../constants/roles.js';

export type UserStatus = 'ACTIVE' | 'INACTIVE';

export interface User {
  id: string;
  email: string;
  name: string;
  designation?: string;
  teamId?: string;
  roles: Role[];
  status: UserStatus;
  isSuperAdmin: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

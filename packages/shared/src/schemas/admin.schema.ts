import { z } from 'zod';

const roleEnum = z.enum(['EMPLOYEE', 'TEAM_LEAD', 'MD', 'ADMIN']);

export const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  designation: z.string().optional(),
  teamId: z.string().optional(),
  roles: z.array(roleEnum).min(1, 'At least one role is required'),
  isSuperAdmin: z.boolean().optional().default(false),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  designation: z.string().optional(),
  teamId: z.string().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  isSuperAdmin: z.boolean().optional(),
});

export const createTeamSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  leadUserId: z.string().optional(),
  memberIds: z.array(z.string()).optional().default([]),
});

export const assignRoleSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  roles: z.array(roleEnum).min(1, 'At least one role is required'),
});

export const updateSystemConfigSchema = z.object({
  key: z.string().min(1, 'Config key is required'),
  value: z.string(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type AssignRoleInput = z.infer<typeof assignRoleSchema>;
export type UpdateSystemConfigInput = z.infer<typeof updateSystemConfigSchema>;

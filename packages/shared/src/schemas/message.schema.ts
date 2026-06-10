import { z } from 'zod';

export const sendMessageSchema = z.object({
  channelId: z.string().min(1, 'Channel ID is required'),
  body: z.string().min(1, 'Message body is required'),
  reportRefId: z.string().optional(),
});

export const createChannelSchema = z.object({
  type: z.enum(['TEAM', 'DIRECT']),
  teamId: z.string().optional(),
  memberIds: z.array(z.string()).min(1, 'At least one member is required'),
  name: z.string().optional(),
});

export const broadcastSchema = z.object({
  body: z.string().min(1, 'Broadcast message is required'),
  targetTeamIds: z.array(z.string()).optional(),
});

export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type CreateChannelInput = z.infer<typeof createChannelSchema>;
export type BroadcastInput = z.infer<typeof broadcastSchema>;

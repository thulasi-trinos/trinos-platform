export type ChannelType = 'TEAM' | 'DIRECT';

export interface Channel {
  id: string;
  type: ChannelType;
  teamId?: string;
  memberIds: string[];
  name?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  channelId: string;
  senderId: string;
  body: string;
  /** FR-CHAT-06 report attachment */
  reportRefId?: string;
  /** FR-CHAT-08 */
  isBroadcast: boolean;
  createdAt: Date;
}

export interface MessageReceipt {
  id: string;
  messageId: string;
  userId: string;
  readAt?: Date;
}

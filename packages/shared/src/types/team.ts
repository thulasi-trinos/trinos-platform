export interface Team {
  id: string;
  name: string;
  leadUserId?: string;
  memberIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

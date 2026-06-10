export interface AuditLog {
  id: string;
  userId?: string;
  action: string;
  entityType: string;
  entityId?: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  createdAt: Date;
}

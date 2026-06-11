'use client';

import type { ReactNode } from 'react';

import { ROLE_LABELS } from '@trinos/shared';

import { PageHeader } from '@/components/layout/PageHeader';
import { Avatar, Badge, Button, Card, CardHead, CardPad, SectionDivider } from '@/components/ui';
import { useToast } from '@/hooks/useToast';
import { logout } from '@/lib/auth';
import { useUIStore } from '@/store/uiStore';

export default function ProfilePage(): ReactNode {
  const user = useUIStore((s) => s.currentUser);
  const { toast } = useToast();

  const onSignOut = async (): Promise<void> => {
    try {
      await logout();
      window.location.assign('/login');
    } catch {
      toast('error', 'Sign-out failed', 'Please try again.');
    }
  };

  return (
    <div>
      <PageHeader eyebrow="Account" title="Profile" description="Your account details and preferences." />
      <Card formCard>
        <CardHead title="Account" subtitle="Identity and role assignments" />
        <CardPad>
          <div className="flex items-center gap-4">
            <Avatar name={user?.name ?? '?'} size="lg" />
            <div>
              <p className="font-sora text-[18px] font-semibold text-ink">{user?.name ?? '—'}</p>
              <p className="text-[13.5px] text-ink3">{user?.email ?? '—'}</p>
            </div>
          </div>

          <SectionDivider label="Roles" />
          <div className="flex flex-wrap gap-2">
            {user?.roles.length ? (
              user.roles.map((role) => (
                <Badge key={role} tone="blue">
                  {ROLE_LABELS[role]}
                </Badge>
              ))
            ) : (
              <span className="text-[13.5px] text-ink4">No roles assigned</span>
            )}
            {user?.isSuperAdmin && <Badge tone="purple">Super Admin</Badge>}
          </div>

          <SectionDivider />
          <Button variant="ghost" size="sm" onClick={onSignOut}>
            Sign out
          </Button>
        </CardPad>
      </Card>
    </div>
  );
}

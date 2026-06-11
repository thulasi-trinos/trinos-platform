'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { ROLE_LABELS } from '@trinos/shared';

import { usePermission } from '@/hooks/usePermission';
import { primaryRole } from '@/lib/permissions';
import { useUIStore } from '@/store/uiStore';
import type { NavSection } from '@/types';

import { Avatar } from '../ui/Avatar';

import { Sidebar } from './Sidebar';

/** Full nav map — links are filtered by capability at render time. */
const NAV: NavSection[] = [
  {
    links: [
      { href: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
      { href: '/submit', label: 'Submit Report', icon: 'FilePlus2', capability: 'submitReport' },
      { href: '/my-reports', label: 'My Reports', icon: 'FileText', capability: 'viewOwnReport' },
    ],
  },
  {
    label: 'Oversight',
    links: [
      { href: '/team', label: 'Team', icon: 'Users', capability: 'viewTeamReports' },
      { href: '/org', label: 'Organisation', icon: 'Building2', capability: 'viewOrgDashboard' },
      { href: '/blockers', label: 'Blockers', icon: 'AlertOctagon', capability: 'viewBlockers' },
    ],
  },
  {
    label: 'Communicate',
    links: [
      { href: '/messages', label: 'Messages', icon: 'MessageSquare' },
      { href: '/notifications', label: 'Notifications', icon: 'Bell' },
    ],
  },
  {
    label: 'Admin',
    links: [
      { href: '/admin/users', label: 'Users', icon: 'UserCog', capability: 'manageUsers' },
      { href: '/admin/teams', label: 'Teams', icon: 'UsersRound', capability: 'manageTeams' },
      { href: '/admin/settings', label: 'Settings', icon: 'Settings', capability: 'viewSystemConfig' },
      { href: '/admin/audit', label: 'Audit Log', icon: 'ScrollText', capability: 'viewAuditLogs' },
    ],
  },
];

export function RoleAwareSidebar(): ReactNode {
  const pathname = usePathname();
  const allowed = usePermission();
  const user = useUIStore((s) => s.currentUser);

  const sections: NavSection[] = NAV.map((section) => ({
    label: section.label,
    links: section.links.filter((link) => !link.capability || allowed(link.capability)),
  })).filter((section) => section.links.length > 0);

  const role = primaryRole(user);
  const roleLabel =
    role === 'SUPER_ADMIN' ? 'Super Admin' : role ? ROLE_LABELS[role] : '';

  const footer = user ? (
    <div className="flex items-center gap-3">
      <Avatar name={user.name} size="sm" />
      <div className="min-w-0">
        <p className="truncate text-[13.5px] font-semibold text-white">{user.name}</p>
        <p className="truncate text-[11.5px] text-blue300">{roleLabel}</p>
      </div>
    </div>
  ) : null;

  return <Sidebar sections={sections} activePath={pathname} footer={footer} />;
}

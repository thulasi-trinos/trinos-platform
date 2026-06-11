'use client';

import { Bell, Search } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

import { useUIStore } from '@/store/uiStore';

import { Avatar } from '../ui/Avatar';

function breadcrumbFromPath(pathname: string): string {
  const seg = pathname.split('/').filter(Boolean);
  if (seg.length === 0) return 'Dashboard';
  const last = seg[seg.length - 1] ?? '';
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function Topbar(): ReactNode {
  const pathname = usePathname();
  const user = useUIStore((s) => s.currentUser);
  const title = breadcrumbFromPath(pathname);

  return (
    <header className="sticky top-0 z-20 flex h-[66px] items-center gap-4 border-b border-line bg-paper/85 px-[28px] backdrop-blur-[10px]">
      <h1 className="font-sora text-[21px] font-semibold tracking-[-.01em] text-ink">{title}</h1>

      <div className="ml-auto flex h-10 w-[280px] items-center gap-2 rounded-md border border-line bg-paper2 px-[13px] text-ink4">
        <Search size={16} />
        <input
          type="search"
          placeholder="Search reports, people…"
          className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink4"
        />
      </div>

      <Link
        href="/notifications"
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-md border border-line bg-paper text-ink2 hover:bg-paper2"
      >
        <Bell size={18} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-paper bg-danger" />
      </Link>

      <Link href="/profile" aria-label="Profile">
        {user ? <Avatar name={user.name} size="md" /> : <Avatar name="?" size="md" color="silver" />}
      </Link>
    </header>
  );
}

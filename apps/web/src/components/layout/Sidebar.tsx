'use client';

import clsx from 'clsx';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';

import type { NavSection } from '@/types';

import { BrandMark } from './BrandMark';

interface SidebarProps {
  sections: NavSection[];
  activePath: string;
  footer?: ReactNode;
}

function NavIcon({ name }: { name: string }): ReactNode {
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[name] ?? Icons.Circle;
  return <Icon size={18} strokeWidth={2} />;
}

export function Sidebar({ sections, activePath, footer }: SidebarProps): ReactNode {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-[250px] flex-col bg-blue900">
      <div className="px-[18px] py-[20px]">
        <BrandMark id="sidebar" dark />
      </div>

      <nav className="flex-1 overflow-y-auto px-[12px] pb-4">
        {sections.map((section, i) => (
          <div key={section.label ?? i} className="mb-4">
            {section.label && (
              <p className="px-3 mb-1.5 text-[10.5px] font-bold uppercase tracking-[.1em] text-blue300/70">
                {section.label}
              </p>
            )}
            <ul className="flex flex-col gap-0.5">
              {section.links.map((link) => {
                const active = activePath === link.href || activePath.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={clsx(
                        'flex items-center gap-3 px-3 py-2.5 rounded-md text-[14.5px] font-medium transition-[.13s]',
                        active
                          ? 'bg-blue500 text-white shadow-[0_4px_12px_rgba(61,122,168,.4)]'
                          : 'text-blue300 hover:bg-white/[.06] hover:text-white'
                      )}
                    >
                      <NavIcon name={link.icon} />
                      <span className="flex-1">{link.label}</span>
                      {link.badgeCount ? (
                        <span
                          className={clsx(
                            'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-[9px] text-[11px] font-bold',
                            active ? 'bg-white/25 text-white' : 'bg-danger text-white'
                          )}
                        >
                          {link.badgeCount}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {footer && <div className="border-t border-white/10 p-[14px]">{footer}</div>}
    </aside>
  );
}

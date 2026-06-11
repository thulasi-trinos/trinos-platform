import type { ReactNode } from 'react';

import { BrandMark } from '@/components/layout/BrandMark';

/** Split auth layout — deep gradient hero (style guide §2 --grad-deep) + form panel. */
export default function AuthLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between bg-grad-deep p-12 lg:flex">
        <BrandMark id="login" dark />
        <div>
          <h1 className="max-w-[420px] font-sora text-[44px] font-bold leading-[1.08] text-white">
            One report. The right eyes. Every day.
          </h1>
          <p className="mt-4 max-w-[420px] text-[15px] text-blue200">
            Structured daily status — submitted once, routed to the people who need it.
          </p>
        </div>
        <p className="text-[12.5px] text-blue300">© Trinos · Status Report Platform</p>
      </aside>

      <main className="flex items-center justify-center p-6">
        <div className="w-full max-w-[400px]">{children}</div>
      </main>
    </div>
  );
}

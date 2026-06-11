import { Hanken_Grotesk, JetBrains_Mono, Sora } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Providers } from './providers';

import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'Trinos';

export const metadata: Metadata = {
  title: {
    default: `${appName} · Status Report Platform`,
    template: `%s · ${appName}`,
  },
  description: 'One report. The right eyes. Every day.',
};

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="en" className={`${sora.variable} ${hanken.variable} ${mono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

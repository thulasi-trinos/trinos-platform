import type { Config } from 'tailwindcss';

/**
 * Every colour is routed through a CSS custom property declared in
 * `src/app/globals.css` (style guide §2). No raw hex values live here —
 * the variables are the single source of truth so themes can swap at runtime.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand blues
        blue900: 'var(--blue-900)',
        blue800: 'var(--blue-800)',
        blue700: 'var(--blue-700)',
        blue600: 'var(--blue-600)',
        blue500: 'var(--blue-500)',
        blue400: 'var(--blue-400)',
        blue300: 'var(--blue-300)',
        blue200: 'var(--blue-200)',
        blue100: 'var(--blue-100)',
        blue50: 'var(--blue-50)',
        // Silver neutrals
        silver700: 'var(--silver-700)',
        silver600: 'var(--silver-600)',
        silver500: 'var(--silver-500)',
        silver400: 'var(--silver-400)',
        silver300: 'var(--silver-300)',
        silver200: 'var(--silver-200)',
        silver100: 'var(--silver-100)',
        silver50: 'var(--silver-50)',
        // Ink (text)
        ink: 'var(--ink)',
        ink2: 'var(--ink-2)',
        ink3: 'var(--ink-3)',
        ink4: 'var(--ink-4)',
        // Paper (backgrounds)
        paper: 'var(--paper)',
        paper2: 'var(--paper-2)',
        paper3: 'var(--paper-3)',
        // Lines (borders)
        line: 'var(--line)',
        line2: 'var(--line-2)',
        // Semantic
        ok: 'var(--ok)',
        okBg: 'var(--ok-bg)',
        warn: 'var(--warn)',
        warnBg: 'var(--warn-bg)',
        danger: 'var(--danger)',
        dangerBg: 'var(--danger-bg)',
        purple: 'var(--purple)',
        purpleBg: 'var(--purple-bg)',
      },
      fontFamily: {
        sora: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        hanken: ['var(--font-hanken)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        sm: 'var(--r-sm)',
        md: 'var(--r-md)',
        lg: 'var(--r-lg)',
        xl: 'var(--r-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      backgroundImage: {
        'grad-tri': 'var(--grad-tri)',
        'grad-deep': 'var(--grad-deep)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        toastSlideUp: {
          from: { transform: 'translateY(140px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn .35s ease',
        pop: 'pop .18s ease',
        pulse: 'pulse 1.5s ease-in-out infinite',
        spin: 'spin .8s linear infinite',
        toastSlideUp: 'toastSlideUp .35s cubic-bezier(.2,.8,.3,1)',
      },
    },
  },
  plugins: [],
};

export default config;

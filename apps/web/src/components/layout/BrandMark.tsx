import clsx from 'clsx';
import type { ReactNode } from 'react';

interface BrandMarkProps {
  /** Unique suffix for gradient IDs to avoid SVG namespace collisions. */
  id: string;
  size?: number;
  showWordmark?: boolean;
  /** On dark surfaces (sidebar/login) the `.o` uses blue-300, else blue-500. */
  dark?: boolean;
}

/** Tetrahedron logo + TRINOS wordmark (style guide §6). */
export function BrandMark({ id, size = 34, showWordmark = true, dark }: BrandMarkProps): ReactNode {
  const a = `tri-a-${id}`;
  const b = `tri-b-${id}`;
  const c = `tri-c-${id}`;
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={a} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7DA6C9" />
            <stop offset="1" stopColor="#3D7AA8" />
          </linearGradient>
          <linearGradient id={b} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#C9CED5" />
            <stop offset="1" stopColor="#9AA1AB" />
          </linearGradient>
          <linearGradient id={c} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5B8BB5" />
            <stop offset="1" stopColor="#2E5878" />
          </linearGradient>
        </defs>
        <polygon points="50,8 8,88 50,58" fill={`url(#${a})`} />
        <polygon points="50,8 92,88 50,58" fill={`url(#${b})`} />
        <polygon points="8,88 92,88 50,58" fill={`url(#${c})`} />
        <path
          d="M50,8 L50,58 M8,88 L50,58 M92,88 L50,58"
          stroke="#fff"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          points="50,8 8,88 92,88"
          fill="none"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinejoin="round"
          opacity=".55"
        />
      </svg>
      {showWordmark && (
        <span
          className={clsx(
            'font-sora font-bold tracking-[.16em] text-[17px]',
            dark ? 'text-white' : 'text-ink'
          )}
        >
          TRIN<span className={dark ? 'text-blue300' : 'text-blue500'}>O</span>S
        </span>
      )}
    </div>
  );
}

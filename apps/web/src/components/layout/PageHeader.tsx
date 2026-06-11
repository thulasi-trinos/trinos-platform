import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Standard page header (style guide §5 — eyebrow / H2 / description). */
export function PageHeader({ eyebrow, title, description, action }: PageHeaderProps): ReactNode {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-1 text-[12.5px] font-semibold uppercase tracking-[.05em] text-blue500">
            {eyebrow}
          </p>
        )}
        <h2 className="font-sora text-[26px] font-semibold text-ink">{title}</h2>
        {description && <p className="mt-1.5 max-w-[560px] text-[14.5px] text-ink3">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

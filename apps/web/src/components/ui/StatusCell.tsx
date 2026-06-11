import clsx from 'clsx';
import { Check, Clock } from 'lucide-react';
import type { ReactNode } from 'react';

import type { DayComplianceStatus } from '@trinos/shared';

/**
 * Single day cell in the team compliance grid (style guide §4.8). Status is
 * never colour-only — each cell carries an icon as well (§9 accessibility).
 */
type CellState = 'ok' | 'late' | 'miss';

const map: Record<CellState, { cls: string; icon: ReactNode; label: string }> = {
  ok: { cls: 'bg-okBg text-ok', icon: <Check size={15} />, label: 'Submitted' },
  late: { cls: 'bg-warnBg text-warn', icon: <Clock size={14} />, label: 'Late' },
  miss: { cls: 'bg-paper3 text-ink4', icon: <span className="leading-none">·</span>, label: 'Missing' },
};

export function complianceToCell(status: DayComplianceStatus): CellState {
  if (status === 'SUBMITTED') return 'ok';
  if (status === 'DRAFT') return 'late';
  return 'miss';
}

export function StatusCell({ state }: { state: CellState }): ReactNode {
  const cfg = map[state];
  return (
    <span
      title={cfg.label}
      className={clsx(
        'mx-auto flex items-center justify-center w-[30px] h-[30px] rounded-sm text-[13px] font-semibold',
        cfg.cls
      )}
    >
      {cfg.icon}
      <span className="sr-only">{cfg.label}</span>
    </span>
  );
}

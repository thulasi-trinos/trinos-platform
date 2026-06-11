import clsx from 'clsx';
import type { ReactNode } from 'react';

import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  delta?: { value: string; direction: 'up' | 'down' | 'flat' };
}

const deltaTone = {
  up: 'text-ok',
  down: 'text-danger',
  flat: 'bg-paper3 text-ink3',
};

export function StatCard({ label, value, icon, delta }: StatCardProps): ReactNode {
  return (
    <Card className="p-[20px]">
      <div className="flex items-start justify-between">
        <p className="text-[10.5px] font-bold uppercase tracking-[.07em] text-ink4">{label}</p>
        {icon && (
          <span className="flex items-center justify-center w-9 h-9 rounded-md bg-blue50 text-blue600">
            {icon}
          </span>
        )}
      </div>
      <div className="mt-2 font-sora text-[30px] font-bold tracking-[-.02em] text-ink">{value}</div>
      {delta && (
        <span className={clsx('inline-block mt-1 text-[12.5px] font-semibold', deltaTone[delta.direction])}>
          {delta.value}
        </span>
      )}
    </Card>
  );
}

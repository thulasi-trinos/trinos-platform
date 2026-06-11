import clsx from 'clsx';
import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

type InfoTone = 'blue' | 'warn' | 'danger' | 'ok';

const tones: Record<InfoTone, string> = {
  blue: 'bg-blue50 text-blue600',
  warn: 'bg-warnBg text-warn',
  danger: 'bg-dangerBg text-danger',
  ok: 'bg-okBg text-ok',
};

interface InfoBoxProps {
  tone?: InfoTone;
  icon?: ReactNode;
  children: ReactNode;
}

export function InfoBox({ tone = 'blue', icon, children }: InfoBoxProps): ReactNode {
  return (
    <div className={clsx('flex items-start gap-2.5 p-[14px] rounded-md text-[13.5px]', tones[tone])}>
      <span className="shrink-0 mt-0.5">{icon ?? <Info size={16} />}</span>
      <div>{children}</div>
    </div>
  );
}

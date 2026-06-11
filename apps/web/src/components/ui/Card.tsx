import clsx from 'clsx';
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  formCard?: boolean;
}

export function Card({ formCard, className, children, ...props }: CardProps): ReactNode {
  return (
    <div
      className={clsx(
        'bg-paper border border-line rounded-lg shadow-sm',
        formCard && 'max-w-[780px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CardHeadProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}

export function CardHead({ title, subtitle, action }: CardHeadProps): ReactNode {
  return (
    <div className="flex items-start justify-between gap-4 px-[22px] py-[17px] border-b border-line">
      <div>
        <h3 className="font-sora text-[15.5px] font-semibold text-ink">{title}</h3>
        {subtitle && <p className="text-[12.5px] text-ink4 mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardPad({ className, children, ...props }: HTMLAttributes<HTMLDivElement>): ReactNode {
  return (
    <div className={clsx('p-[22px]', className)} {...props}>
      {children}
    </div>
  );
}

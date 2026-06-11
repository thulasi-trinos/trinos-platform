import clsx from 'clsx';
import type { ReactNode } from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps): ReactNode {
  return <div className={clsx('animate-pulse rounded-md bg-paper3', className)} aria-hidden="true" />;
}

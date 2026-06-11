import clsx from 'clsx';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'danger';
type Size = 'md' | 'sm' | 'tiny';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-blue500 text-white shadow-[0_4px_12px_rgba(61,122,168,.28)] hover:bg-blue600 hover:-translate-y-px',
  ghost: 'bg-paper text-ink2 border-[1.5px] border-line2 hover:bg-paper2 hover:border-silver400',
  danger: 'bg-dangerBg text-danger hover:brightness-95',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-[18px] text-[14.5px] rounded-md',
  sm: 'h-[38px] px-[14px] text-[13.5px] rounded-sm',
  tiny: 'h-8 px-[11px] text-[12.5px] rounded-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', block, leftIcon, rightIcon, className, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        'inline-flex items-center justify-center gap-2 whitespace-nowrap font-hanken font-semibold transition-[.16s] disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        block && 'w-full',
        className
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
});

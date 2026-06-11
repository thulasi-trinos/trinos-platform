import clsx from 'clsx';
import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { error, className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(
        'h-[46px] w-full px-[14px] text-[15px] text-ink bg-paper rounded-md border-[1.5px] transition-[.15s]',
        'placeholder:text-ink4 outline-none',
        error
          ? 'border-danger focus:shadow-[0_0_0_4px_var(--danger-bg)]'
          : 'border-line2 focus:border-blue400 focus:shadow-[0_0_0_4px_var(--blue-50)]',
        className
      )}
      {...props}
    />
  );
});

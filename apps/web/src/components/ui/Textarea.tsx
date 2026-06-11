import clsx from 'clsx';
import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { error, className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      className={clsx(
        'w-full min-h-[88px] px-[14px] py-[10px] text-[15px] leading-[1.6] text-ink bg-paper rounded-md border-[1.5px] resize-y transition-[.15s]',
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

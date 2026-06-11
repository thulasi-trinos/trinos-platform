'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import type { ReactNode } from 'react';

import { forgotPasswordSchema, type ForgotPasswordInput } from '@trinos/shared';

import { Button, Input } from '@/components/ui';
import { useToast } from '@/hooks/useToast';
import { api } from '@/lib/api';

export default function ForgotPasswordPage(): ReactNode {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await api.post('/auth/forgot-password', values);
      toast('success', 'Check your inbox', 'If that email exists, a reset link is on its way.');
    } catch {
      toast('error', 'Something went wrong', 'Please try again in a moment.');
    }
  });

  return (
    <div>
      <h2 className="font-sora text-[26px] font-semibold text-ink">Reset password</h2>
      <p className="mt-1 text-[14px] text-ink3">
        Enter your account email and we&apos;ll send a reset link.
      </p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <div className="field">
          <label htmlFor="email" className="mb-[7px] block text-[13px] font-semibold text-ink2">
            Email
          </label>
          <Input id="email" type="email" autoComplete="email" error={!!errors.email} {...register('email')} />
          {errors.email && <p className="mt-1 text-[12px] font-semibold text-danger">{errors.email.message}</p>}
        </div>

        <Button type="submit" block disabled={isSubmitting || isSubmitSuccessful}>
          {isSubmitting ? 'Sending…' : 'Send reset link'}
        </Button>
        <Link href="/login" className="text-center text-[13px] font-semibold text-blue500">
          Back to sign in
        </Link>
      </form>
    </div>
  );
}

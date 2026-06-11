'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import type { ReactNode } from 'react';

import { resetPasswordSchema, type ResetPasswordInput } from '@trinos/shared';

import { Button, Input } from '@/components/ui';
import { useToast } from '@/hooks/useToast';
import { api } from '@/lib/api';

export default function ResetPasswordPage(): ReactNode {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm(): ReactNode {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: params.get('token') ?? '' },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await api.post('/auth/reset-password', values);
      toast('success', 'Password updated', 'You can now sign in with your new password.');
      router.replace('/login');
    } catch {
      toast('error', 'Reset failed', 'Your link may have expired. Request a new one.');
    }
  });

  return (
    <div>
      <h2 className="font-sora text-[26px] font-semibold text-ink">Choose a new password</h2>
      <p className="mt-1 text-[14px] text-ink3">Pick a strong password you haven&apos;t used before.</p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <input type="hidden" {...register('token')} />
        <div className="field">
          <label htmlFor="password" className="mb-[7px] block text-[13px] font-semibold text-ink2">
            New password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            error={!!errors.password}
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-[12px] font-semibold text-danger">{errors.password.message}</p>
          )}
          {errors.token && (
            <p className="mt-1 text-[12px] font-semibold text-danger">{errors.token.message}</p>
          )}
        </div>

        <Button type="submit" block disabled={isSubmitting}>
          {isSubmitting ? 'Updating…' : 'Update password'}
        </Button>
      </form>
    </div>
  );
}

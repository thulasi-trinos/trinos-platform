'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import type { ReactNode } from 'react';

import { loginSchema, type LoginInput } from '@trinos/shared';

import { Button, Input } from '@/components/ui';
import { useToast } from '@/hooks/useToast';
import { login } from '@/lib/auth';

export default function LoginPage(): ReactNode {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm(): ReactNode {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await login(values);
      router.replace(params.get('next') ?? '/dashboard');
    } catch {
      toast('error', 'Sign-in failed', 'Check your email and password and try again.');
    }
  });

  return (
    <div>
      <h2 className="font-sora text-[26px] font-semibold text-ink">Sign in</h2>
      <p className="mt-1 text-[14px] text-ink3">Welcome back. Enter your credentials to continue.</p>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <div className="field">
          <label htmlFor="email" className="mb-[7px] block text-[13px] font-semibold text-ink2">
            Email
          </label>
          <Input id="email" type="email" autoComplete="email" error={!!errors.email} {...register('email')} />
          {errors.email && <p className="mt-1 text-[12px] font-semibold text-danger">{errors.email.message}</p>}
        </div>

        <div className="field">
          <div className="mb-[7px] flex items-center justify-between">
            <label htmlFor="password" className="text-[13px] font-semibold text-ink2">
              Password
            </label>
            <Link href="/forgot-password" className="text-[12.5px] font-semibold text-blue500">
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            error={!!errors.password}
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-[12px] font-semibold text-danger">{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" block disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}

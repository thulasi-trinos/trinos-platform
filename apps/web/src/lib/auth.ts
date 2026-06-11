import type { LoginInput } from '@trinos/shared';
import type { User } from '@trinos/shared';

import { api } from './api';

/** Name of the httpOnly cookie the API sets on login. Mirror in middleware.ts. */
export const AUTH_COOKIE = 'trinos_token';

/** Fetch the authenticated user. Throws (401) when there is no valid session. */
export async function fetchCurrentUser(): Promise<User> {
  const { data } = await api.get<User>('/auth/me');
  return data;
}

export async function login(input: LoginInput): Promise<User> {
  const { data } = await api.post<User>('/auth/login', input);
  return data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

import { redirect } from 'next/navigation';

export default function RootPage(): never {
  // Middleware sends unauthenticated users to /login; authenticated to dashboard.
  redirect('/dashboard');
}

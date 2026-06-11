import axios, { type AxiosInstance } from 'axios';

/**
 * Shared Axios instance. `withCredentials` sends the httpOnly JWT cookie on
 * every request (the browser manages it; JS never touches the token). All
 * REST calls in the app go through this instance.
 */
export const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Surface auth failures consistently — a 401 means the session expired.
api.interceptors.response.use(
  (res) => res,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.assign(`/login?next=${encodeURIComponent(window.location.pathname)}`);
      }
    }
    return Promise.reject(error);
  }
);

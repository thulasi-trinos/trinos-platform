import { env } from '../config/env';

/** Midnight (UTC) for a YYYY-MM-DD string — used for date-only report keys. */
export function dateOnly(input: string | Date): Date {
  const d = typeof input === 'string' ? new Date(`${input}T00:00:00.000Z`) : input;
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

/** End of the report edit window from a submission time (OI-02 / FR-REP-06). */
export function editableUntil(submittedAt: Date): Date {
  return new Date(submittedAt.getTime() + env.REPORT_EDIT_WINDOW_MINUTES * 60_000);
}

/** Whether `now` is still within the edit window. */
export function isWithinEditWindow(editableUntilAt: Date | null | undefined, now: Date): boolean {
  return !!editableUntilAt && now.getTime() <= editableUntilAt.getTime();
}

/** Parse "HH:MM" into hours/minutes. */
export function parseLocalTime(hhmm: string): { hours: number; minutes: number } {
  const [h, m] = hhmm.split(':').map((n) => Number.parseInt(n, 10));
  return { hours: h ?? 18, minutes: m ?? 0 };
}

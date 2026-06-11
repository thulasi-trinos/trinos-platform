import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

/** Absolute date+time, e.g. "11 Jun 2026, 6:00 PM". */
export function formatDateTime(value: Date | string | number): string {
  return format(new Date(value), "d MMM yyyy, h:mm a");
}

/** Date only, e.g. "11 Jun 2026". */
export function formatDate(value: Date | string | number): string {
  return format(new Date(value), 'd MMM yyyy');
}

/** Human-relative time for feeds/messages, e.g. "3 minutes ago". */
export function formatRelative(value: Date | string | number): string {
  const date = new Date(value);
  if (isToday(date)) return `Today, ${format(date, 'h:mm a')}`;
  if (isYesterday(date)) return `Yesterday, ${format(date, 'h:mm a')}`;
  return formatDistanceToNow(date, { addSuffix: true });
}

/** Report code formatter — `RPT-YYYY-NNNN` (style guide §11). */
export function formatReportCode(year: number, sequence: number): string {
  return `RPT-${year}-${String(sequence).padStart(4, '0')}`;
}

/** Initials for avatar fallbacks, max two characters. */
export function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

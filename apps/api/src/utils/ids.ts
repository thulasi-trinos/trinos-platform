import { randomBytes, randomUUID } from 'node:crypto';

/** Opaque random id (e.g. for tokens before hashing). */
export function newId(): string {
  return randomUUID();
}

/** URL-safe random token string. */
export function randomToken(bytes = 32): string {
  return randomBytes(bytes).toString('base64url');
}

/**
 * Report code: RPT-YYYY-NNNN (FR-REP). `sequence` is the per-year running
 * count; zero-padded to 4 digits, expanding beyond if needed.
 */
export function formatReportCode(year: number, sequence: number): string {
  return `RPT-${year}-${String(sequence).padStart(4, '0')}`;
}

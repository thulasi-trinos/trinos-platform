import { Parser } from 'json2csv';

/**
 * Serialise rows to CSV (FR-ADM-05 report export). `fields` pins column order;
 * omit to infer from the first row.
 */
export function toCsv<T extends Record<string, unknown>>(rows: T[], fields?: string[]): string {
  const parser = new Parser(fields ? { fields } : {});
  return parser.parse(rows);
}

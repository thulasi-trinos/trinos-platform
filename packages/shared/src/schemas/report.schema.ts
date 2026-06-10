import { z } from 'zod';

const blockerFieldSchema = z
  .string()
  .min(1, 'Blockers field is required. Type "None" if there are no blockers.');

const reportFieldsSchema = z.object({
  fieldDidToday: z
    .string()
    .min(20, '"What I Did Today" must be at least 20 characters'),
  fieldNext: z
    .string()
    .min(10, '"What\'s Next" must be at least 10 characters'),
  fieldBlockers: blockerFieldSchema,
  fieldNotes: z.string().optional(),
});

export const saveDraftSchema = z.object({
  reportDate: z.string().date('Invalid date format (YYYY-MM-DD)'),
  fieldDidToday: z.string().optional(),
  fieldNext: z.string().optional(),
  fieldBlockers: z.string().optional(),
  fieldNotes: z.string().optional(),
});

export const submitReportSchema = reportFieldsSchema.extend({
  reportDate: z.string().date('Invalid date format (YYYY-MM-DD)'),
});

export const editReportSchema = reportFieldsSchema.extend({
  reportId: z.string().min(1, 'Report ID is required'),
});

export type SaveDraftInput = z.infer<typeof saveDraftSchema>;
export type SubmitReportInput = z.infer<typeof submitReportSchema>;
export type EditReportInput = z.infer<typeof editReportSchema>;

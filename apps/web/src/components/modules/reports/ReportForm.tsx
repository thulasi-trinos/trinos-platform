'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import type { ReactNode } from 'react';

import { REPORT_FIELDS, submitReportSchema, type SubmitReportInput } from '@trinos/shared';

import { Button, Card, RichTextEditor } from '@/components/ui';
import { useAutosave, type SaveStatus } from '@/hooks/useAutosave';
import { useToast } from '@/hooks/useToast';
import { api } from '@/lib/api';

interface ReportFormProps {
  /** ISO date (YYYY-MM-DD) the report is for. */
  reportDate: string;
  defaultValues?: Partial<SubmitReportInput>;
}

const SAVE_LABEL: Record<SaveStatus, { icon: ReactNode; text: string }> = {
  idle: { icon: null, text: 'Changes save automatically' },
  saving: { icon: <Loader2 size={15} className="animate-spin text-ink4" />, text: 'Saving…' },
  saved: { icon: <CheckCircle2 size={15} className="text-ok" />, text: 'Draft saved' },
  error: { icon: null, text: 'Could not save draft' },
};

export function ReportForm({ reportDate, defaultValues }: ReportFormProps): ReactNode {
  const { toast } = useToast();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<SubmitReportInput>({
    resolver: zodResolver(submitReportSchema),
    defaultValues: {
      reportDate,
      fieldDidToday: '',
      fieldNext: '',
      fieldBlockers: '',
      fieldNotes: '',
      ...defaultValues,
    },
  });

  const { status, schedule } = useAutosave<SubmitReportInput>(async (values) => {
    await api.post('/reports/draft', { ...values, reportDate });
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await api.post('/reports', values);
      toast('success', 'Report submitted', 'Your report has been routed to the right reviewers.');
    } catch {
      toast('error', 'Submission failed', 'Please review the fields and try again.');
    }
  });

  const note = SAVE_LABEL[status];

  return (
    <Card formCard>
      <form onSubmit={onSubmit}>
        {REPORT_FIELDS.map((field, index) => {
          const error = errors[field.key];
          return (
            <div key={field.key} className="border-b border-line px-[24px] py-[20px]">
              <div className="flex items-center gap-2.5">
                <span className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-blue50 font-sora text-[12px] font-bold text-blue600">
                  {index + 1}
                </span>
                <span className="text-[15px] font-semibold text-ink">{field.label}</span>
                {field.mandatory ? (
                  <span className="rounded-[5px] bg-dangerBg px-[7px] py-0.5 text-[10.5px] font-bold text-danger">
                    REQUIRED
                  </span>
                ) : (
                  <span className="rounded-[5px] bg-paper3 px-[7px] py-0.5 text-[10.5px] font-semibold text-ink4">
                    OPTIONAL
                  </span>
                )}
              </div>
              {field.helper && <p className="ml-[34px] mb-3 mt-0.5 text-[13px] text-ink4">{field.helper}</p>}

              <div className="ml-[34px] mt-2">
                <Controller
                  control={control}
                  name={field.key}
                  render={({ field: f }) => (
                    <RichTextEditor
                      value={f.value ?? ''}
                      onChange={(html) => {
                        f.onChange(html);
                        schedule(getValues());
                      }}
                      placeholder={field.label}
                      error={!!error}
                    />
                  )}
                />
                {error && <p className="mt-1.5 text-[12px] font-semibold text-danger">{error.message}</p>}
              </div>
            </div>
          );
        })}

        <div className="flex items-center justify-between rounded-b-lg border-t border-line bg-paper2 px-[24px] py-[18px]">
          <span className="flex items-center gap-[7px] text-[13px] text-ink3">
            {note.icon}
            {note.text}
          </span>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting…' : 'Submit report'}
          </Button>
        </div>
      </form>
    </Card>
  );
}

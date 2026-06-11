import { render } from '@react-email/render';
import { Resend } from 'resend';

import { env } from '../config/env';
import { logger } from '../lib/logger';

import { WelcomeEmail } from './templates/WelcomeEmail';

// Null when RESEND_API_KEY is unset — email degrades to a logged no-op locally.
const client = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

export interface SendEmailArgs {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailArgs): Promise<void> {
  if (!client) {
    logger.warn({ to, subject }, 'RESEND_API_KEY not set — skipping email send');
    return;
  }
  const { error } = await client.emails.send({ from: env.RESEND_FROM, to, subject, html });
  if (error) logger.error({ error, to, subject }, 'failed to send email');
}

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  const html = await render(WelcomeEmail({ name, loginUrl: env.APP_BASE_URL }));
  await sendEmail({ to, subject: 'Welcome to Trinos', html });
}

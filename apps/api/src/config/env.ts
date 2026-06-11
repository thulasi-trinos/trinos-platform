import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

// Load .env before validation (no-op in production where env is injected).
loadDotenv();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),

  // Database
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DIRECT_URL: z.string().min(1).optional(),

  // Redis (db 0 = queues, db 1 = cache/blocklist)
  REDIS_URL: z.string().min(1).default('redis://localhost:6379'),

  // Auth
  JWT_ACCESS_SECRET: z.string().min(16, 'JWT_ACCESS_SECRET must be at least 16 chars'),
  JWT_REFRESH_SECRET: z.string().min(16, 'JWT_REFRESH_SECRET must be at least 16 chars'),

  // Email (optional locally — features degrade gracefully without it)
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().default('Trinos <no-reply@trinos.ai>'),

  // URLs / CORS
  APP_BASE_URL: z.string().url().default('http://localhost:3000'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),

  // Session / lockout
  SESSION_TIMEOUT_HOURS: z.coerce.number().int().positive().default(8),
  LOGIN_LOCK_THRESHOLD: z.coerce.number().int().positive().default(5),
  LOGIN_LOCK_MINUTES: z.coerce.number().int().positive().default(30),

  // Reporting policy
  REPORT_EDIT_WINDOW_MINUTES: z.coerce.number().int().positive().default(60),
  REPORT_DEADLINE_LOCAL_TIME: z.string().default('18:00'),
  DEFAULT_TIMEZONE: z.string().default('Asia/Kolkata'),
  REPORT_RETENTION_MONTHS: z.coerce.number().int().positive().default(12),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    // Crash hard on misconfiguration — fail fast before anything connects.
    // eslint-disable-next-line no-console
    console.error(`\n✖ Invalid environment configuration:\n${issues}\n`);
    process.exit(1);
  }
  return parsed.data;
}

export const env = loadEnv();

export const corsOrigins = env.CORS_ORIGINS.split(',')
  .map((o) => o.trim())
  .filter(Boolean);

export const isProd = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';

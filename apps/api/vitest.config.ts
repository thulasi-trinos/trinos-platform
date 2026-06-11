import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    env: {
      NODE_ENV: 'test',
      // Minimal env so config/env validation passes under test.
      DATABASE_URL: 'postgresql://trinos:trinos_dev@localhost:5433/trinos_dev',
      JWT_ACCESS_SECRET: 'test_access_secret_at_least_16_chars',
      JWT_REFRESH_SECRET: 'test_refresh_secret_at_least_16_chars',
    },
  },
});

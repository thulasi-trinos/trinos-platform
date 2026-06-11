import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { createApp } from '../app';

// Smoke test: the app wires up and routes resolve without touching live deps
// beyond what the handler needs. Health endpoints report dependency state.
describe('app smoke', () => {
  const app = createApp();

  it('exposes /healthz with a dependency snapshot', async () => {
    const res = await request(app).get('/healthz');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('db');
    expect(res.body).toHaveProperty('redis');
  });

  it('returns 404 with the error envelope for unknown routes', async () => {
    const res = await request(app).get('/api/does-not-exist');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('rejects unauthenticated access to protected routes', async () => {
    const res = await request(app).get('/api/reports');
    expect(res.status).toBe(401);
  });

  it('validates request bodies via @trinos/shared schemas', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });
});

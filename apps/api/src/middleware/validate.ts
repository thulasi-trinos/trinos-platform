import type { RequestHandler } from 'express';
import type { ZodTypeAny, z } from 'zod';

type Source = 'body' | 'query' | 'params';

/**
 * Validate a request part against a Zod schema (schemas come from
 * @trinos/shared). On success the parsed value replaces the raw input so
 * downstream handlers get typed, coerced data.
 */
export function validate(schema: ZodTypeAny, source: Source = 'body'): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return next(result.error);
    }
    // Reassign parsed output (query/params are getters on some setups — guard).
    try {
      req[source] = result.data as never;
    } catch {
      /* express 5 query is read-only; downstream may re-parse if needed */
    }
    next();
  };
}

/** Helper to infer the validated type for handlers. */
export type Validated<S extends ZodTypeAny> = z.infer<S>;

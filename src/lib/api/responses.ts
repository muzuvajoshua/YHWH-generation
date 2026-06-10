import { ZodError, type ZodType } from "zod";

/**
 * Tiny JSON envelope helpers so every route handler responds with the
 * same shape. The renderer / chat client treat `ok: false` as a soft
 * failure surface (toast, retry) and `ok: true` as the happy path.
 */

export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

export interface ApiError {
  ok: false;
  error: {
    code: string;
    message: string;
    issues?: Array<{ path: string; message: string }>;
  };
}

export type ApiEnvelope<T> = ApiSuccess<T> | ApiError;

export function ok<T>(data: T, init: ResponseInit = {}): Response {
  return Response.json({ ok: true, data } satisfies ApiSuccess<T>, init);
}

export function fail(
  code: string,
  message: string,
  status = 400,
  issues?: ApiError["error"]["issues"]
): Response {
  return Response.json(
    { ok: false, error: { code, message, ...(issues ? { issues } : {}) } } satisfies ApiError,
    { status }
  );
}

export async function parseJson<T>(
  req: Request,
  schema: ZodType<T>
): Promise<{ ok: true; data: T } | { ok: false; response: Response }> {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return {
      ok: false,
      response: fail("invalid_json", "Request body must be valid JSON", 400),
    };
  }
  const result = schema.safeParse(payload);
  if (!result.success) {
    const err = result.error as ZodError;
    const issues = err.issues.map((i) => ({
      path: i.path.join(".") || "(root)",
      message: i.message,
    }));
    return {
      ok: false,
      response: fail(
        "validation_failed",
        "Request body did not match schema",
        422,
        issues
      ),
    };
  }
  return { ok: true, data: result.data };
}

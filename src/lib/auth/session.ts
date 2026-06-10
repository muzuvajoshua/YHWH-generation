import "server-only";
import { cookies } from "next/headers";
import type { Session } from "./types";

/**
 * Server-only session helpers. The cookie is signed-enough for a mock and
 * httpOnly so the client can't read it. Swap this for your real auth
 * provider (Clerk, Auth.js, WorkOS) by replacing the three helpers — the
 * surrounding UI/components never need to change.
 */

const COOKIE = "dos_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function encode(s: Session): string {
  return Buffer.from(JSON.stringify(s), "utf8").toString("base64url");
}

function decode(raw: string): Session | null {
  try {
    const json = Buffer.from(raw, "base64url").toString("utf8");
    const obj = JSON.parse(json);
    if (typeof obj?.userId === "string" && typeof obj?.email === "string") {
      return obj as Session;
    }
    return null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const raw = store.get(COOKIE)?.value;
  if (!raw) return null;
  return decode(raw);
}

export async function setSession(session: Session): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, encode(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

// Re-export the pure types so existing call sites that pull `Session` from
// "@/lib/auth/session" keep compiling.
export type { Session } from "./types";
export { deriveNameFromEmail, initials } from "./types";

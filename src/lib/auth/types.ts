/**
 * Pure types and helpers shared between server and client.
 * Keep this module free of "next/headers" or any server-only imports
 * so it can be bundled into client components safely.
 */

export interface Session {
  userId: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: number;
}

export function deriveNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "you";
  return local
    .replace(/[._-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join(" ");
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { clearSession, setSession } from "./session";
import { deriveNameFromEmail } from "./types";

const credentialsSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "At least 8 characters"),
});

const signupSchema = credentialsSchema.extend({
  name: z.string().min(2, "Tell us your name").max(80).optional(),
});

export interface AuthState {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<"email" | "password" | "name", string>>;
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors: AuthState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as "email" | "password" | undefined;
      if (key) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }

  await setSession({
    userId: `u_${Buffer.from(parsed.data.email).toString("hex").slice(0, 12)}`,
    email: parsed.data.email,
    name: deriveNameFromEmail(parsed.data.email),
    createdAt: Date.now(),
  });

  redirect("/app");
}

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });

  if (!parsed.success) {
    const fieldErrors: AuthState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as "email" | "password" | "name" | undefined;
      if (key) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors };
  }

  const name = parsed.data.name?.trim() || deriveNameFromEmail(parsed.data.email);

  await setSession({
    userId: `u_${Buffer.from(parsed.data.email).toString("hex").slice(0, 12)}`,
    email: parsed.data.email,
    name,
    createdAt: Date.now(),
  });

  redirect("/app");
}

export async function signOut(): Promise<void> {
  await clearSession();
  redirect("/");
}

export async function devGuestSignIn(): Promise<void> {
  await setSession({
    userId: "u_guest",
    email: "guest@dashboard.os",
    name: "Guest Explorer",
    createdAt: Date.now(),
  });
  redirect("/app");
}

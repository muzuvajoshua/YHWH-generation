"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { AuthField } from "./auth-fields";
import { signUp, type AuthState } from "@/lib/auth/actions";
import { Magnetic } from "@/components/motion/magnetic";

const initialState: AuthState = { ok: false };

export function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <AuthField
        label="Your name"
        name="name"
        autoComplete="name"
        placeholder="Ada Lovelace"
        required={false}
        error={state.fieldErrors?.name}
      />
      <AuthField
        label="Work email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@yourcompany.com"
        error={state.fieldErrors?.email}
      />
      <AuthField
        label="Choose a password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="At least 8 characters"
        error={state.fieldErrors?.password}
        hint={state.fieldErrors?.password ? undefined : "Use 8+ characters. We hash it before it touches disk."}
      />

      <p className="text-[11.5px] text-zinc-500 leading-relaxed">
        By creating an account you agree to our{" "}
        <Link href="#" className="text-zinc-300 hover:text-zinc-100 underline underline-offset-4">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-zinc-300 hover:text-zinc-100 underline underline-offset-4">
          Privacy Notice
        </Link>
        .
      </p>

      <Magnetic strength={0.12}>
        <button
          type="submit"
          disabled={isPending}
          className="group relative w-full inline-flex items-center justify-center gap-2 h-11 rounded-md bg-zinc-100 text-zinc-950 text-[14px] font-medium hover:bg-white transition-colors disabled:opacity-70 shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating your workspace…
            </>
          ) : (
            <>
              Create workspace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </Magnetic>

      {state.error && (
        <p role="alert" className="text-center text-[12.5px] text-red-300">
          {state.error}
        </p>
      )}
    </form>
  );
}

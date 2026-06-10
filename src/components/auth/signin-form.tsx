"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { AuthField } from "./auth-fields";
import { signIn, type AuthState } from "@/lib/auth/actions";
import { Magnetic } from "@/components/motion/magnetic";

const initialState: AuthState = { ok: false };

export function SignInForm() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <AuthField
        label="Work email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@yourcompany.com"
        error={state.fieldErrors?.email}
      />
      <AuthField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        placeholder="At least 8 characters"
        error={state.fieldErrors?.password}
        hint={state.fieldErrors?.password ? undefined : "Demo mode — any 8+ character password works"}
      />

      <div className="flex items-center justify-between text-[12.5px]">
        <label className="inline-flex items-center gap-2 text-zinc-400">
          <input
            type="checkbox"
            name="remember"
            defaultChecked
            className="h-3.5 w-3.5 rounded border-white/20 bg-white/[0.05] text-violet-500 focus:ring-1 focus:ring-violet-500/40"
          />
          Remember me for 30 days
        </label>
        <Link href="#" className="text-violet-300 hover:text-violet-200">
          Forgot password?
        </Link>
      </div>

      <Magnetic strength={0.12}>
        <button
          type="submit"
          disabled={isPending}
          className="group relative w-full inline-flex items-center justify-center gap-2 h-11 rounded-md bg-zinc-100 text-zinc-950 text-[14px] font-medium hover:bg-white transition-colors disabled:opacity-70 shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing you in…
            </>
          ) : (
            <>
              Continue to workspace
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

      <div className="relative">
        <div aria-hidden className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.06]" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-zinc-950 px-3 text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            or
          </span>
        </div>
      </div>

      <button
        type="button"
        className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-md border border-white/[0.1] bg-white/[0.03] text-[13.5px] font-medium text-zinc-200 hover:bg-white/[0.06] hover:border-white/[0.18] transition-colors"
      >
        <SsoMark />
        Continue with SAML SSO
      </button>
    </form>
  );
}

function SsoMark() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3a9 9 0 1 0 9 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="18" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}

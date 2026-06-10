"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  defaultValue?: string;
  hint?: string;
}

/**
 * One auth-page field with a label, an input, optional reveal eye, and an
 * inline error region that participates in the form's aria-describedby.
 */
export function AuthField({
  label,
  name,
  type = "text",
  autoComplete,
  required = true,
  placeholder,
  error,
  defaultValue,
  hint,
}: FieldProps) {
  const [visible, setVisible] = React.useState(false);
  const id = React.useId();
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  const isPassword = type === "password";
  const effectiveType = isPassword && visible ? "text" : type;

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-[12px] font-medium text-zinc-300">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={effectiveType}
          autoComplete={autoComplete}
          required={required}
          placeholder={placeholder}
          defaultValue={defaultValue}
          aria-invalid={Boolean(error)}
          aria-describedby={cn(error && errId, hint && hintId) || undefined}
          className={cn(
            "flex h-10 w-full rounded-md border bg-white/[0.03] px-3 text-[14px] text-zinc-100",
            "placeholder:text-zinc-500",
            "transition-[background,border,box-shadow] duration-150",
            error
              ? "border-red-500/50 focus-visible:border-red-500/80 focus-visible:ring-2 focus-visible:ring-red-500/30"
              : "border-white/[0.1] hover:border-white/[0.18] hover:bg-white/[0.05] focus-visible:border-violet-500/40 focus-visible:bg-white/[0.05] focus-visible:ring-2 focus-visible:ring-violet-500/30",
            "focus-visible:outline-none",
            isPassword && "pr-10"
          )}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            tabIndex={-1}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-white/[0.06]"
          >
            {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {hint && !error && (
        <p id={hintId} className="text-[11.5px] text-zinc-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={errId} className="text-[11.5px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

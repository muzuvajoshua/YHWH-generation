"use client";

import React, { useState } from "react";
import { User, Key, Palette, Bell, Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={htmlFor}
        className="block text-[12px] font-medium text-zinc-300"
      >
        {label}
      </label>
      {children}
      {hint ? <p className="text-[11.5px] text-zinc-500">{hint}</p> : null}
    </div>
  );
}

function Toggle({
  label,
  description,
  defaultChecked = false,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-white/[0.05] last:border-0">
      <div className="min-w-0">
        <p className="text-[13px] text-zinc-200 leading-tight">{label}</p>
        {description ? (
          <p className="mt-0.5 text-[11.5px] text-zinc-500 leading-snug">
            {description}
          </p>
        ) : null}
      </div>
      <button
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn(!on)}
        className={cn(
          "relative inline-flex h-[20px] w-[34px] shrink-0 items-center rounded-full transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
          on ? "bg-violet-500" : "bg-white/[0.1]"
        )}
      >
        <span
          className={cn(
            "inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow transition-transform duration-150",
            on ? "translate-x-[17px]" : "translate-x-[3px]"
          )}
        />
      </button>
    </div>
  );
}

interface SettingsFormProps {
  initialName: string;
  initialEmail: string;
}

export function SettingsForm({ initialName, initialEmail }: SettingsFormProps) {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);
  const accents = [
    { name: "Violet", color: "#8b5cf6" },
    { name: "Indigo", color: "#6366f1" },
    { name: "Emerald", color: "#10b981" },
    { name: "Amber", color: "#f59e0b" },
    { name: "Rose", color: "#ef4444" },
    { name: "Pink", color: "#ec4899" },
  ];
  const themes = ["Midnight", "Slate", "Carbon"];

  const [firstName, ...rest] = initialName ? initialName.split(" ") : [""];
  const lastName = rest.join(" ");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <User className="h-4 w-4 text-violet-300" />
            <CardTitle>Profile</CardTitle>
          </div>
          <CardDescription>How you appear inside Dashboard OS.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="First name" htmlFor="firstName">
              <Input id="firstName" defaultValue={firstName} />
            </Field>
            <Field label="Last name" htmlFor="lastName">
              <Input id="lastName" defaultValue={lastName} />
            </Field>
          </div>
          <Field label="Email" htmlFor="email">
            <Input id="email" type="email" defaultValue={initialEmail} />
          </Field>
          <Field label="Role" htmlFor="role">
            <Input id="role" defaultValue="Product Manager" />
          </Field>
          <div className="pt-1">
            <Button variant="accent">Save profile</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <Key className="h-4 w-4 text-violet-300" />
            <CardTitle>API configuration</CardTitle>
          </div>
          <CardDescription>
            Connect an AI provider to enable live dashboard generation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field
            label="Anthropic API key"
            htmlFor="apiKey"
            hint="Stored encrypted at rest. Never logged or sent to other providers."
          >
            <div className="relative">
              <Input
                id="apiKey"
                type={apiKeyVisible ? "text" : "password"}
                defaultValue="sk-ant-api03-••••••••••••••••••••••••••••••••••••••••"
                className="pr-10 font-mono text-[12.5px]"
              />
              <button
                type="button"
                onClick={() => setApiKeyVisible((v) => !v)}
                aria-label={apiKeyVisible ? "Hide API key" : "Show API key"}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 flex items-center justify-center text-zinc-400 hover:text-zinc-100 rounded-md hover:bg-white/[0.06]"
              >
                {apiKeyVisible ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
          </Field>
          <Field label="Default model" htmlFor="model">
            <select
              id="model"
              defaultValue="claude-sonnet-4-6"
              className="flex h-9 w-full rounded-md border border-white/[0.08] bg-white/[0.03] px-3 text-[13px] text-zinc-100 transition-colors hover:border-white/[0.14] focus:outline-none focus:border-violet-500/40 focus:ring-2 focus:ring-violet-500/30"
            >
              <option value="claude-opus-4-7">Claude Opus 4.7</option>
              <option value="claude-sonnet-4-6">Claude Sonnet 4.6</option>
              <option value="claude-haiku-4-5">Claude Haiku 4.5</option>
            </select>
          </Field>
          <div className="pt-1">
            <Button variant="accent">Save API settings</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <Palette className="h-4 w-4 text-violet-300" />
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>Tune the look and feel.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Field label="Theme">
            <div className="grid grid-cols-3 gap-2">
              {themes.map((theme, i) => (
                <button
                  key={theme}
                  className={cn(
                    "rounded-md border p-3 text-[13px] font-medium transition-all",
                    i === 0
                      ? "border-violet-500/40 bg-violet-500/10 text-violet-200"
                      : "border-white/[0.08] bg-white/[0.02] text-zinc-300 hover:border-white/[0.16] hover:bg-white/[0.05]"
                  )}
                >
                  {theme}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Accent color">
            <div className="flex flex-wrap gap-2.5">
              {accents.map((accent, i) => (
                <button
                  key={accent.color}
                  aria-label={accent.name}
                  title={accent.name}
                  style={{ backgroundColor: accent.color }}
                  className={cn(
                    "relative h-7 w-7 rounded-md ring-1 ring-inset ring-black/30 transition-transform hover:scale-110",
                    i === 0
                      ? "ring-2 ring-white/80 ring-offset-2 ring-offset-zinc-950"
                      : ""
                  )}
                />
              ))}
            </div>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <Bell className="h-4 w-4 text-violet-300" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>
            Choose what should reach you and how.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Toggle
            defaultChecked
            label="Weekly digest"
            description="A Monday-morning summary of the week's most important metrics."
          />
          <Toggle
            defaultChecked
            label="Account health alerts"
            description="Get pinged when a customer's health score drops below threshold."
          />
          <Toggle
            defaultChecked
            label="Workspace completions"
            description="Notify when long-running AI generations finish."
          />
          <Toggle
            label="Product updates"
            description="Occasional changelog and feature announcements."
          />
          <Toggle
            defaultChecked
            label="System maintenance"
            description="Scheduled downtime and infrastructure changes."
          />
          <Toggle
            label="Usage threshold warnings"
            description="Heads-up when API usage approaches your plan limit."
          />
        </CardContent>
      </Card>
    </div>
  );
}

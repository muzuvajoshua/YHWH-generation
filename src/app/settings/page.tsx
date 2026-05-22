"use client";

import React, { useState } from "react";
import { Settings, User, Key, Palette, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-zinc-300 mb-1.5">
      {children}
    </label>
  );
}

function Input({ id, type = "text", value, placeholder, className }: {
  id?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      className={cn(
        "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500",
        "focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50",
        "transition-colors duration-200",
        className
      )}
    />
  );
}

function Toggle({ defaultChecked = false, label }: { defaultChecked?: boolean; label: string }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.06] last:border-0">
      <span className="text-sm text-zinc-300">{label}</span>
      <button
        onClick={() => setOn(!on)}
        className={cn(
          "relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200",
          on ? "bg-violet-600" : "bg-zinc-700"
        )}
      >
        <span
          className={cn(
            "inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200",
            on ? "translate-x-4" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [apiKeyVisible, setApiKeyVisible] = useState(false);

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-zinc-800 border border-white/[0.08]">
          <Settings className="h-5 w-5 text-zinc-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-sm text-zinc-400">Manage your account and application preferences</p>
        </div>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-violet-400" />
            <CardTitle className="text-base">Profile</CardTitle>
          </div>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value="Josh" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value="Anderson" />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value="josh@example.com" />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" value="Product Manager" />
          </div>
          <button className="mt-2 rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200">
            Save Profile
          </button>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-violet-400" />
            <CardTitle className="text-base">API Configuration</CardTitle>
          </div>
          <CardDescription>Connect your AI provider API keys</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apiKey">Anthropic API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={apiKeyVisible ? "text" : "password"}
                value="sk-ant-api03-••••••••••••••••••••••••••••••••••••••••••••••••"
                className="pr-20"
              />
              <button
                onClick={() => setApiKeyVisible(!apiKeyVisible)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-200 transition-colors px-2 py-1"
              >
                {apiKeyVisible ? "Hide" : "Show"}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-zinc-500">
              Used for AI workspace features. Stored securely and never logged.
            </p>
          </div>
          <div>
            <Label htmlFor="model">Default Model</Label>
            <select
              id="model"
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50"
            >
              <option value="claude-opus-4-5">Claude Opus 4.5</option>
              <option value="claude-sonnet-4-5" selected>Claude Sonnet 4.5</option>
              <option value="claude-haiku-3-5">Claude Haiku 3.5</option>
            </select>
          </div>
          <button className="rounded-lg bg-violet-600 hover:bg-violet-500 px-4 py-2 text-sm font-medium text-white transition-colors duration-200">
            Save API Settings
          </button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-violet-400" />
            <CardTitle className="text-base">Appearance</CardTitle>
          </div>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Theme</Label>
            <div className="grid grid-cols-3 gap-3 mt-2">
              {["Dark", "Darker", "Midnight"].map((theme, i) => (
                <button
                  key={theme}
                  className={cn(
                    "rounded-lg border p-3 text-sm font-medium transition-all duration-200",
                    i === 0
                      ? "border-violet-500/50 bg-violet-500/10 text-violet-300"
                      : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  )}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Accent Color</Label>
            <div className="flex gap-2 mt-2">
              {["#8b5cf6", "#6366f1", "#10b981", "#f59e0b", "#ef4444", "#ec4899"].map((color) => (
                <button
                  key={color}
                  style={{ backgroundColor: color }}
                  className={cn(
                    "w-7 h-7 rounded-full border-2 transition-transform hover:scale-110",
                    color === "#8b5cf6" ? "border-white" : "border-transparent"
                  )}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-violet-400" />
            <CardTitle className="text-base">Notification Preferences</CardTitle>
          </div>
          <CardDescription>Choose what you want to be notified about</CardDescription>
        </CardHeader>
        <CardContent>
          <Toggle defaultChecked label="Email digest (weekly summary)" />
          <Toggle defaultChecked label="Account health alerts" />
          <Toggle defaultChecked label="AI workspace completions" />
          <Toggle label="Marketing & product updates" />
          <Toggle defaultChecked label="System maintenance notices" />
          <Toggle label="Usage threshold warnings" />
        </CardContent>
      </Card>
    </div>
  );
}

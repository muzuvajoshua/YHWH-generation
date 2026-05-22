"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Sparkles,
  Lightbulb,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessage, DashboardLayout } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardGrid } from "./dashboard-grid";
import { StreamingSkeleton } from "./streaming-skeleton";

const SUGGESTED_PROMPTS: Array<{
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
  label: string;
}> = [
  {
    icon: TrendingUp,
    label: "Revenue performance",
    prompt: "Show me quarterly revenue performance with key trends",
  },
  {
    icon: Users,
    label: "Customer health",
    prompt: "Which customers are at risk of churning?",
  },
  {
    icon: Zap,
    label: "Team productivity",
    prompt: "Compare team productivity scores across all departments",
  },
  {
    icon: Lightbulb,
    label: "Top metrics",
    prompt: "What are the most important metrics to watch right now?",
  },
];

function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-end"
    >
      <div className="max-w-[75%] rounded-2xl rounded-tr-md bg-violet-500/85 px-4 py-2.5 text-[13.5px] text-white leading-relaxed shadow-[0_0_0_1px_rgba(139,92,246,0.3)_inset]">
        {message.content}
      </div>
    </motion.div>
  );
}

function AssistantAvatar() {
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-500/15 border border-violet-500/25 text-violet-300 mt-0.5">
      <Sparkles className="h-3.5 w-3.5" />
    </div>
  );
}

function AssistantMessage({ message }: { message: ChatMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="flex flex-col gap-3.5"
    >
      <div className="flex items-start gap-2.5">
        <AssistantAvatar />
        <div className="flex-1 min-w-0 pt-1">
          <p className="text-[13.5px] text-zinc-200 leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
      {message.dashboard && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, delay: 0.08 }}
          className="ml-9"
        >
          <DashboardGrid layout={message.dashboard} />
        </motion.div>
      )}
    </motion.div>
  );
}

export function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: trimmed,
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      try {
        const history = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.dashboard
            ? `${m.content}\n[Generated dashboard: "${m.dashboard.title}"]`
            : m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: { content: string; dashboard: DashboardLayout | null } =
          await res.json();

        const assistantMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.content,
          dashboard: data.dashboard ?? undefined,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        console.error("Chat error:", err);
        const errorMsg: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Something went wrong on my end. Please try that prompt again in a moment.",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
  };

  const isEmpty = messages.length === 0 && !loading;
  const canSubmit = input.trim().length > 0 && !loading;

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto w-full space-y-7">
          <AnimatePresence>
            {isEmpty && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center gap-7 pt-8 pb-4 text-center"
              >
                <div className="relative">
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-2xl bg-violet-500/20 blur-2xl"
                  />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/15 text-violet-200">
                    <Sparkles className="h-6 w-6" />
                  </div>
                </div>
                <div className="max-w-sm">
                  <h2 className="text-[22px] font-semibold tracking-tight text-zinc-50">
                    What should we build?
                  </h2>
                  <p className="mt-2 text-[13.5px] text-zinc-400 leading-relaxed">
                    Describe the dashboard or analysis you want. I&apos;ll
                    compose charts, KPIs, and insights using your live data.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-xl">
                  {SUGGESTED_PROMPTS.map(({ icon: Icon, prompt, label }) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className={cn(
                        "group/prompt flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.025] px-3.5 py-3 text-left",
                        "hover:bg-white/[0.05] hover:border-white/[0.12] transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50"
                      )}
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.04] text-violet-300 group-hover/prompt:text-violet-200 transition-colors shrink-0">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block text-[12.5px] font-medium text-zinc-200 leading-tight">
                          {label}
                        </span>
                        <span className="mt-0.5 block text-[11.5px] text-zinc-500 leading-snug">
                          {prompt}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map((msg) =>
            msg.role === "user" ? (
              <UserMessage key={msg.id} message={msg} />
            ) : (
              <AssistantMessage key={msg.id} message={msg} />
            )
          )}

          <AnimatePresence>
            {loading && (
              <div className="flex items-start gap-2.5">
                <AssistantAvatar />
                <div className="flex-1 min-w-0">
                  <StreamingSkeleton />
                </div>
              </div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} className="h-1" />
        </div>
      </ScrollArea>

      <div className="border-t border-white/[0.06] bg-zinc-950/70 backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div
            className={cn(
              "flex items-end gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2.5",
              "transition-[background,border] duration-150",
              "focus-within:border-violet-500/40 focus-within:bg-white/[0.05]"
            )}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask for a dashboard, an analysis, or a comparison…"
              rows={1}
              disabled={loading}
              className={cn(
                "flex-1 resize-none bg-transparent text-[13.5px] text-zinc-100 placeholder:text-zinc-500",
                "focus:outline-none leading-relaxed min-h-[24px] pt-1.5",
                loading && "opacity-50 cursor-not-allowed"
              )}
              style={{ maxHeight: 200 }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!canSubmit}
              aria-label="Send message"
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-all",
                canSubmit
                  ? "bg-zinc-100 text-zinc-950 hover:bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset]"
                  : "bg-white/[0.05] text-zinc-600 cursor-not-allowed"
              )}
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10.5px] text-zinc-600">
            <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1 py-px font-mono mr-1">
              ↵
            </kbd>
            to send
            <span className="mx-1.5 text-zinc-700">·</span>
            <kbd className="rounded border border-white/[0.08] bg-white/[0.04] px-1 py-px font-mono mr-1">
              ⇧↵
            </kbd>
            for newline
          </p>
        </div>
      </div>
    </div>
  );
}

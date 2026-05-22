"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatMessage, DashboardLayout } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DashboardGrid } from "./dashboard-grid";
import { StreamingSkeleton } from "./streaming-skeleton";

const SUGGESTED_PROMPTS = [
  "What does our revenue trend look like this year?",
  "Which customers are at risk of churning?",
  "Compare all team productivity scores",
  "What are our most important metrics right now?",
];

function UserMessage({ message }: { message: ChatMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex justify-end"
    >
      <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-2.5 text-sm text-white leading-relaxed">
        {message.content}
      </div>
    </motion.div>
  );
}

function AssistantMessage({ message }: { message: ChatMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col gap-3"
    >
      <div className="flex items-start gap-2.5">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600/20 border border-violet-500/30 mt-0.5">
          <Sparkles className="h-3.5 w-3.5 text-violet-400" />
        </div>
        <div className="flex-1 min-w-0 rounded-2xl rounded-tl-sm bg-white/5 border border-white/8 px-4 py-2.5 text-sm text-zinc-300 leading-relaxed">
          {message.content}
        </div>
      </div>
      {message.dashboard && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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

      // Auto-resize textarea reset
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      try {
        // Build conversation history for multi-turn context
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

        const data: { content: string; dashboard: DashboardLayout | null } = await res.json();

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
          content: "Sorry, something went wrong. Please try again.",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const isEmpty = messages.length === 0 && !loading;

  return (
    <div className="flex h-full flex-col">
      {/* Message area */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-4 py-6 space-y-6 max-w-4xl mx-auto">
          {/* Empty state */}
          <AnimatePresence>
            {isEmpty && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center gap-6 py-16 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600/20 border border-violet-500/30">
                  <Sparkles className="h-7 w-7 text-violet-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-zinc-100">AI Dashboard OS</h2>
                  <p className="mt-1.5 text-sm text-zinc-500 max-w-xs">
                    Ask me to build any dashboard. I&apos;ll generate charts, metrics, and insights instantly.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className={cn(
                        "rounded-xl border border-white/8 bg-white/5 px-3 py-2.5",
                        "text-xs text-zinc-400 hover:bg-white/10 hover:text-zinc-200 hover:border-white/15",
                        "transition-all text-left leading-snug"
                      )}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages */}
          {messages.map((msg) =>
            msg.role === "user" ? (
              <UserMessage key={msg.id} message={msg} />
            ) : (
              <AssistantMessage key={msg.id} message={msg} />
            )
          )}

          {/* Streaming skeleton */}
          <AnimatePresence>
            {loading && (
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-600/20 border border-violet-500/30 mt-0.5">
                    <Sparkles className="h-3.5 w-3.5 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <StreamingSkeleton />
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-white/5 bg-zinc-950/60 backdrop-blur-xl px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <div
            className={cn(
              "flex items-end gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3",
              "focus-within:border-violet-500/40 focus-within:bg-white/[0.07]",
              "transition-all"
            )}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              placeholder="Ask me to build a dashboard…"
              rows={1}
              disabled={loading}
              className={cn(
                "flex-1 resize-none bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600",
                "focus:outline-none leading-relaxed min-h-[24px]",
                loading && "opacity-50 cursor-not-allowed"
              )}
              style={{ maxHeight: 160 }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all",
                input.trim() && !loading
                  ? "bg-violet-600 text-white hover:bg-violet-500"
                  : "bg-white/5 text-zinc-600 cursor-not-allowed"
              )}
              aria-label="Send"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-zinc-700">
            Press <kbd className="rounded border border-white/10 bg-white/5 px-1 font-mono">Enter</kbd> to send &middot;{" "}
            <kbd className="rounded border border-white/10 bg-white/5 px-1 font-mono">Shift+Enter</kbd> for newline
          </p>
        </div>
      </div>
    </div>
  );
}

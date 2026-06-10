import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import { DashboardLayout } from "@/types";
import { SYSTEM_PROMPT } from "./system-prompt";

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Strict structured output: the model returns an envelope { textResponse, dashboard }
 * conforming to the schema below. The dashboard payload itself uses the
 * existing block-typed DashboardLayout schema — same one the renderer trusts.
 *
 * Provider: Anthropic (Claude). The settings UI advertises Anthropic, so the
 * runtime should honor that. AI failures fall back to a deterministic
 * keyword-routed dashboard upstream — see /api/chat and /api/generate.
 */
const ResponseEnvelope = z.object({
  textResponse: z.string().min(1),
  dashboard: DashboardLayout,
});
type ResponseEnvelope = z.infer<typeof ResponseEnvelope>;

const MODEL_ID =
  process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5-20250929";

export async function generateDashboard(
  userMessage: string,
  history: ConversationMessage[] = []
): Promise<{ content: string; dashboard: DashboardLayout }> {
  if (!process.env.ANTHROPIC_API_KEY) {
    // Bail loudly so the route falls back to the deterministic dashboard.
    throw new Error("ANTHROPIC_API_KEY is not configured");
  }

  const historyContext =
    history.length > 0
      ? `\n\nCONVERSATION SO FAR:\n${history
          .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
          .join("\n")}\n\nThe user is now following up. Build on the context above. If they ask to modify, refine, or drill into something, adjust the previous dashboard rather than starting fresh.`
      : "";

  const result = await generateObject<typeof ResponseEnvelope>({
    model: anthropic(MODEL_ID),
    schema: ResponseEnvelope,
    schemaName: "DashboardResponse",
    schemaDescription:
      "A short text explanation plus a fully-typed dashboard layout for the renderer.",
    system: SYSTEM_PROMPT,
    prompt: `${historyContext}\n\nUser request: "${userMessage}"\n\nUse the REAL company data provided in the system prompt. Do not invent numbers.`,
    maxRetries: 2,
  });

  return {
    content: result.object.textResponse,
    dashboard: result.object.dashboard,
  };
}

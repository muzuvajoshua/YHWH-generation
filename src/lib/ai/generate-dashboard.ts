import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { DashboardLayout } from "@/types";
import { SYSTEM_PROMPT } from "./system-prompt";

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export async function generateDashboard(
  userMessage: string,
  history: ConversationMessage[] = []
): Promise<{ content: string; dashboard: DashboardLayout }> {
  // Build conversation context from history
  const historyContext =
    history.length > 0
      ? `\n\nCONVERSATION SO FAR:\n${history
          .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
          .join("\n")}\n\nThe user is now following up. Build on the context above. If they ask to modify, refine, or drill into something, adjust the previous dashboard rather than starting fresh.`
      : "";

  const result = await generateText({
    model: openai("gpt-4o"),
    system:
      SYSTEM_PROMPT +
      `\n\nYou MUST respond with ONLY a valid JSON object (no markdown, no code fences) in this exact shape:
{
  "textResponse": "Brief 2-3 sentence explanation with specific numbers from the data",
  "dashboard": {
    "title": "Dashboard Title",
    "description": "Dashboard description",
    "blocks": [
      {
        "id": "unique-id",
        "type": "one of the block types listed above",
        "span": 1-4,
        "data": { ... block-specific data ... }
      }
    ]
  }
}

Block data schemas:
- kpi-card: { title, value, change (number), changeLabel?, trend: "up"|"down"|"flat", icon? }
- line-chart/bar-chart/area-chart: { title, description?, data: [{ name, value, value2?, value3? }], xKey?, yKeys?, colors? }
- pie-chart: { title, description?, data: [{ name, value }], xKey?, yKeys?, colors? }
- table: { title, columns: [{ key, label, align? }], rows: [{ ...key-value pairs }] }
- insight-panel: { title, summary, bullets: string[], sentiment?: "positive"|"negative"|"neutral" }
- activity-feed: { title, items: [{ id, user, action, target, time }] }
- comparison-card: { title, items: [{ label, value, previousValue }] }
- metrics-widget: { title, metrics: [{ label, value, unit? }] }
- notes-panel: { title, content }
- alert-panel: { title, alerts: [{ level: "info"|"warning"|"error"|"success", message }] }`,
    prompt: `${historyContext}\n\nUser request: "${userMessage}"

Use the REAL company data provided in the system prompt. Do not invent numbers. Respond with ONLY the JSON object.`,
  });

  const parsed = JSON.parse(result.text);

  return {
    content: parsed.textResponse,
    dashboard: parsed.dashboard as DashboardLayout,
  };
}

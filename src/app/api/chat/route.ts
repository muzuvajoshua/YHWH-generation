import { z } from "zod";
import {
  generateDashboard,
  ConversationMessage,
} from "@/lib/ai/generate-dashboard";
import { getFallbackDashboard } from "@/lib/ai/fallback-dashboard";
import { fail, ok, parseJson } from "@/lib/api/responses";

const ChatRequest = z.object({
  message: z.string().min(1, "message is required").max(2000),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(8000),
      })
    )
    .max(40)
    .optional(),
});

export async function POST(request: Request) {
  const parsed = await parseJson(request, ChatRequest);
  if (!parsed.ok) return parsed.response;

  const { message, history = [] as ConversationMessage[] } = parsed.data;

  try {
    const { content, dashboard } = await generateDashboard(message, history);
    return ok({ content, dashboard });
  } catch (aiError) {
    console.warn(
      "AI generation failed, using fallback dashboard:",
      aiError instanceof Error ? aiError.message : aiError
    );
    try {
      const { content, dashboard } = getFallbackDashboard(message);
      return ok({ content, dashboard, source: "fallback" as const });
    } catch (fallbackError) {
      console.error("Fallback dashboard failed:", fallbackError);
      return fail(
        "generation_failed",
        "Could not generate a dashboard right now. Try again in a moment.",
        500
      );
    }
  }
}

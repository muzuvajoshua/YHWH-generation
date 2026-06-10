import { z } from "zod";
import { generateDashboard } from "@/lib/ai/generate-dashboard";
import { getFallbackDashboard } from "@/lib/ai/fallback-dashboard";
import { fail, ok, parseJson } from "@/lib/api/responses";

const GenerateRequest = z.object({
  message: z.string().min(1).max(2000),
});

export async function POST(request: Request) {
  const parsed = await parseJson(request, GenerateRequest);
  if (!parsed.ok) return parsed.response;

  try {
    const { dashboard } = await generateDashboard(parsed.data.message);
    return ok({ dashboard });
  } catch (aiError) {
    console.warn(
      "AI generation failed, using fallback dashboard:",
      aiError instanceof Error ? aiError.message : aiError
    );
    try {
      const { dashboard } = getFallbackDashboard(parsed.data.message);
      return ok({ dashboard, source: "fallback" as const });
    } catch (fallbackError) {
      console.error("Fallback dashboard failed:", fallbackError);
      return fail("generation_failed", "Could not generate a dashboard.", 500);
    }
  }
}

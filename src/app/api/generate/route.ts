import { generateDashboard } from "@/lib/ai/generate-dashboard";
import { getFallbackDashboard } from "@/lib/ai/fallback-dashboard";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message } = body as { message: string };

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Missing or invalid 'message' field" },
        { status: 400 }
      );
    }

    try {
      const { dashboard } = await generateDashboard(message);
      return Response.json({ dashboard });
    } catch (aiError) {
      // Fall back to pre-built dashboards when AI is unavailable
      console.warn(
        "AI generation failed, using fallback dashboard:",
        aiError instanceof Error ? aiError.message : aiError
      );
      const { dashboard } = getFallbackDashboard(message);
      return Response.json({ dashboard });
    }
  } catch (error) {
    console.error("Generate route error:", error);
    return Response.json(
      { error: "Failed to generate dashboard" },
      { status: 500 }
    );
  }
}

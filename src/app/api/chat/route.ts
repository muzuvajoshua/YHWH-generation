import {
  generateDashboard,
  ConversationMessage,
} from "@/lib/ai/generate-dashboard";
import { getFallbackDashboard } from "@/lib/ai/fallback-dashboard";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history } = body as {
      message: string;
      history?: ConversationMessage[];
    };

    if (!message || typeof message !== "string") {
      return Response.json(
        { error: "Missing or invalid 'message' field" },
        { status: 400 }
      );
    }

    try {
      const { content, dashboard } = await generateDashboard(
        message,
        history ?? []
      );
      return Response.json({ content, dashboard });
    } catch (aiError) {
      console.warn(
        "AI generation failed, using fallback dashboard:",
        aiError instanceof Error ? aiError.message : aiError
      );
      const { content, dashboard } = getFallbackDashboard(message);
      return Response.json({ content, dashboard });
    }
  } catch (error) {
    console.error("Chat route error:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

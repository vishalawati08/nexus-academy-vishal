import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "The AI mentor is not configured yet. Add the GEMINI_API_KEY environment variable to enable responses." },
        { status: 503 }
      );
    }

    const body: unknown = await req.json();
    const message = typeof body === "object" && body !== null && "message" in body
      ? (body as { message?: unknown }).message
      : undefined;

    if (typeof message !== "string" || !message.trim()) {
      return Response.json({ error: "Enter a question to ask the mentor." }, { status: 400 });
    }
    if (message.length > 4000) {
      return Response.json({ error: "Please keep your question under 4,000 characters." }, { status: 413 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `You are Nexus AI Mentor, a learning companion for new Product Specialists learning connector fundamentals.

Teaching approach:
- Explain step by step, in an encouraging and beginner-friendly but technically accurate way.
- Define technical terms when first introduced.
- Use examples and application context where helpful.
- If a question requires a specific product part number, rating, or confidential company detail that is not provided in the conversation, say that the learner should verify it in approved product documentation. Do not invent specifications.
- Treat your response as learning support, not a substitute for approved product documentation.

Learner question:
${message.trim()}`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text().trim();
    if (!reply) return Response.json({ error: "The mentor did not return a response. Please try again." }, { status: 502 });
    return Response.json({ reply });
  } catch (error) {
    console.error("Nexus AI Mentor request failed:", error);
    return Response.json(
      { error: "The AI mentor could not respond right now. Please try again later." },
      { status: 502 }
    );
  }
}

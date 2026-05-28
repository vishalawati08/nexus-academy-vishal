import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {

  const body = await req.json();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
You are an elite Product Specialist mentor training new hires.

Your teaching style:
- step-by-step
- engaging
- encouraging
- technical but beginner friendly
- focused on connectors and applications

User Question:
${body.message}
`;

  const result = await model.generateContent(prompt);

  const response = result.response.text();

  return Response.json({
    reply: response,
  });
}
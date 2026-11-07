import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import { splitActions } from "./_lib/actions.js";
import { systemPrompt } from "./_lib/knowledge.js";
import { checkRateLimit, clientIp } from "./_lib/rateLimit.js";

const MAX_PROMPT = 500;
const MAX_HISTORY = 10;
// Khmer takes many more tokens than English, so leave room for it.
const MAX_OUTPUT_TOKENS = 500;

// Primary: Google Gemini. Override the model with GEMINI_MODEL without a code change.
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

// Backup: OpenRouter free models, tried in order. Free models get removed
// often, so keep this list short and re-check it occasionally.
const OPENROUTER_MODELS = [
  "google/gemma-4-31b-it:free",
  "nvidia/nemotron-3.5-lightning:free",
  "openrouter/free",
];

// `messages` is OpenAI-style: [{ role: "user" | "assistant", content }]
async function askGemini(messages) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents: messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    config: {
      systemInstruction: systemPrompt,
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    },
  });
  return response.text;
}

async function askOpenRouter(messages) {
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_KEY,
  });

  for (const model of OPENROUTER_MODELS) {
    try {
      const completion = await openai.chat.completions.create({
        model,
        max_tokens: MAX_OUTPUT_TOKENS,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      });
      const text = completion.choices[0]?.message?.content;
      if (text?.trim()) return text;
      console.error(`OpenRouter ${model} returned an empty reply`);
    } catch (error) {
      console.error(`OpenRouter ${model} failed:`, error.message);
    }
  }
  return null;
}

const reply = (res, raw) => {
  const { text, actions } = splitActions(raw);
  return res.status(200).json({ response: text, actions });
};

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const limit = checkRateLimit(clientIp(req));
  if (!limit.ok) {
    res.setHeader("Retry-After", String(limit.retryAfter));
    return res.status(429).json({ error: "Too many messages, slow down" });
  }

  const { prompt, history } = req.body ?? {};

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  if (prompt.length > MAX_PROMPT) {
    return res.status(400).json({ error: "Prompt is too long" });
  }

  // Keep only well-formed recent turns from the client
  const pastTurns = (Array.isArray(history) ? history : [])
    .filter(
      (m) =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m.content === "string",
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_PROMPT * 2) }));

  const messages = [...pastTurns, { role: "user", content: prompt }];

  if (process.env.GEMINI_KEY) {
    try {
      const text = await askGemini(messages);
      if (text?.trim()) return reply(res, text);
      console.error("Gemini returned an empty reply");
    } catch (error) {
      console.error("Gemini failed:", error.message);
    }
  }

  if (process.env.OPENROUTER_KEY) {
    const text = await askOpenRouter(messages);
    if (text) return reply(res, text);
  }

  return res.status(503).json({ error: "Chatbot is unavailable right now" });
};

export default handler;

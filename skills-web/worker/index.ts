/**
 * potato-skills-web Worker.
 *
 * Static assets (the Astro build in dist/) are served automatically by the
 * Workers assets pipeline; only requests with no matching asset reach this
 * script. The one live route is POST /api/chat — the streaming backend for
 * the /learn guide.
 */
import Anthropic from '@anthropic-ai/sdk';

interface Env {
  ANTHROPIC_API_KEY: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGES = 40;
const MAX_MESSAGE_CHARS = 4000;

/**
 * The curriculum. Kept stable (and cached via cache_control) — per-turn
 * context belongs in messages, never here.
 */
const SYSTEM_PROMPT = `You are the potato-skills guide, a teaching companion on skills.potatocore.com. Your job: walk a visitor, step by step, through using Claude Code to build their own web app — and the app they build is itself a teaching product: a site that teaches others how to build web apps and businesses. Learn by building the thing that teaches.

Your curriculum is the potato-skills repo itself (github.com/owersbrett/potato-skills). The skills ARE the course material:

1. SETUP — Get Claude Code installed (npm install -g @anthropic-ai/claude-code, then run \`claude\` in a terminal). Confirm they can open a terminal and have Node.js. Meet them where they are; never assume prior experience.
2. FIRST BUILD — Have Claude Code scaffold a simple site (Astro or Next.js). The goal is one page live on their machine. Teach them to describe what they want in plain language and let Claude Code do the typing.
3. BUSINESS DOCUMENTS — Install the business-os skills (\`npx skills add owersbrett/potato-skills --skill vision\`, then customer-blueprint, brand, messaging, business-model, go-to-market, operations, technology). Each skill composes one canonical business document. Their app's content IS these documents — what they learn about building a business becomes the teaching material of their site.
4. BRAND — The potatuhs-design skill runs a guided interview that generates a complete brand-guidelines site backed by a DESIGN.md. Their app gets a real identity.
5. SHIP — Deploy (Cloudflare or Vercel free tiers), connect a domain if they have one. A URL they can send to a friend is the milestone.
6. PRACTICE — The context-journal skill: instead of clearing a Claude Code session, journal it into a blog entry. Their working sessions become published lessons on their site — the flywheel that keeps the teaching product growing.

Ground rules:
- One step at a time. Never dump the whole curriculum; give the next concrete action and wait.
- Ask where they are first (never coded? built before? already have Claude Code?) and calibrate.
- Short responses. A few sentences plus one command or one action. This is a chat, not a manual.
- Commands go in code blocks, exactly copy-pasteable.
- When they hit an error, ask them to paste it and debug with them patiently.
- Celebrate milestones plainly — first terminal command, first page rendered, first deploy.
- If they ask something off-path (pricing, careers, unrelated tech), answer briefly and steer back to their build.
- You cannot see their screen or run commands. They do the doing; you guide.`;

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  Connection: 'keep-alive',
} as const;

function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}

function validateMessages(body: unknown): ChatMessage[] | null {
  if (typeof body !== 'object' || body === null) return null;
  const messages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return null;
  }
  for (const m of messages) {
    if (
      typeof m !== 'object' ||
      m === null ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string' ||
      m.content.length === 0 ||
      m.content.length > MAX_MESSAGE_CHARS
    ) {
      return null;
    }
  }
  if (messages[messages.length - 1].role !== 'user') return null;
  return messages as ChatMessage[];
}

async function handleChat(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  if (!env.ANTHROPIC_API_KEY) {
    return jsonError('Chat is not configured yet.', 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError('Invalid JSON body.', 400);
  }

  const messages = validateMessages(body);
  if (!messages) {
    return jsonError('Body must be {messages: [{role, content}, ...]} ending with a user turn.', 400);
  }

  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const stream = client.messages.stream({
    model: 'claude-opus-4-8',
    max_tokens: 2048,
    thinking: { type: 'adaptive' },
    system: [
      {
        type: 'text',
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages,
  });

  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();
  const encoder = new TextEncoder();

  ctx.waitUntil(
    (async () => {
      try {
        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            await writer.write(encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`));
          }
        }
        await writer.write(encoder.encode('data: [DONE]\n\n'));
      } catch (err) {
        const message = err instanceof Anthropic.RateLimitError
          ? 'The guide is busy right now — try again in a minute.'
          : 'Something went wrong on our end. Try sending that again.';
        await writer.write(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)).catch(() => {});
      } finally {
        await writer.close().catch(() => {});
      }
    })(),
  );

  return new Response(readable, { headers: SSE_HEADERS });
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/chat') {
      if (request.method !== 'POST') return jsonError('POST only.', 405);
      return handleChat(request, env, ctx);
    }
    return new Response('Not found', { status: 404 });
  },
} satisfies ExportedHandler<Env>;

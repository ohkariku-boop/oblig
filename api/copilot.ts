export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `You are the Oblig AI Governance Copilot, a specialist assistant for fintechs preparing to sell into regulated financial institutions across Singapore, Malaysia, Indonesia, the Philippines, Cambodia, Japan, South Korea, and Taiwan.

You help with:
- Vendor & third-party risk policy drafting
- Technology risk management readiness against MAS TRM, BNM RMiT, OJK, BSP, NBC TCRMG, FSA, EFTA (Korea), and Taiwan's FSC outsourcing framework
- AI governance readiness (FEAT principles, human oversight, model lifecycle controls)
- Prioritising what to fix first based on the user's actual gaps

Ground every answer in real regulatory specifics where relevant — cite the actual regulator and requirement (e.g. "MAS requires 1-hour notification for severe incidents", "BNM RMiT specifies 3-year SIEM log retention") rather than generic security advice. If the user's real readiness data is provided below, use it directly; don't restate generic advice that ignores it.

Keep answers concise, practical, and structured (short paragraphs or bullet points). If asked something outside vendor/technology/AI governance for financial services, say so briefly and redirect to what you can help with.`;

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'AI not configured' }), { status: 503 });
  }

  let body: { message?: string; context?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
  }

  const message = (body.message ?? '').trim().slice(0, 2000);
  const context = (body.context ?? '').trim().slice(0, 2000);
  if (!message) {
    return new Response(JSON.stringify({ error: 'Message required' }), { status: 400 });
  }

  const userContent = context
    ? `[Current readiness context — use this to ground the answer]\n${context}\n\n[User question]\n${message}`
    : message;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://oblig.vercel.app',
        'X-Title': 'Oblig AI Copilot',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3.5-haiku',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userContent },
        ],
        max_tokens: 700,
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      return new Response(JSON.stringify({ error: 'AI request failed', detail: errText.slice(0, 300) }), { status: 502 });
    }

    const data = await response.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;
    if (!reply) {
      return new Response(JSON.stringify({ error: 'Empty response from model' }), { status: 502 });
    }

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'AI request threw an error', detail: String(err).slice(0, 300) }), { status: 500 });
  }
}

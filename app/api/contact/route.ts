import { TOPICS, validateContact, type ContactInput } from "@/lib/contact";

// Contact form → email via Resend's HTTP API. The key lives only on the
// server (RESEND_API_KEY); nothing here is exposed to the browser.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
// Per-instance memory: enough to blunt a burst from one address. On Vercel each
// instance keeps its own count, so swap for a shared store if abuse appears.
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  let body: Partial<ContactInput>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "bad-request" }, { status: 400 });
  }

  // Honeypot filled: answer like a success so bots learn nothing.
  if (body.company) return Response.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return Response.json({ error: "rate-limited" }, { status: 429 });

  const errors = validateContact(body);
  if (Object.keys(errors).length) return Response.json({ error: "invalid", fields: errors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? "essakinibilal1@outlook.com";
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return Response.json({ error: "not-configured" }, { status: 503 });

  const name = body.name!.trim();
  const email = body.email!.trim();
  const message = body.message!.trim();
  const topic = TOPICS.find((t) => t.value === body.topic)!.label;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Portfolio: ${topic} — ${name}`,
      text: `${name} <${email}>\nAbout: ${topic}\n\n${message}`,
      html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;<br>About: ${escapeHtml(topic)}</p><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!res.ok) return Response.json({ error: "send-failed" }, { status: 502 });
  return Response.json({ ok: true });
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { deliver, limited } from "@/lib/sinks";
import { randomUUID } from "node:crypto";

/**
 * Lead intake. Every configured destination receives the lead; at least one must be configured in production.
 *   MONGODB_URI (+ MONGODB_DB, MONGODB_COLLECTION)  -> stores the lead in MongoDB
 *   RESEND_API_KEY + LEAD_NOTIFY_EMAIL + LEAD_FROM_EMAIL -> emails Didin an alert
 *   LEAD_WEBHOOK_URL -> POSTs JSON (Make, Zapier, Google Apps Script, a CRM, a WhatsApp gateway)
 */

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  dialCode: z.string().trim().regex(/^\+\d{1,4}$/),
  phone: z.string().trim().min(6).max(16),
  email: z.string().trim().toLowerCase().email().max(120).optional().or(z.literal("")),
  interest: z.string().trim().min(1).max(80),
  consent: z.literal(true),
  website: z.string().max(0).optional().or(z.literal("")),
  source: z.string().trim().max(60).default("unknown"),
  attribution: z.record(z.string(), z.string().max(300)).optional(),
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many attempts. Please try again in a minute." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    const field = String(first?.path?.[0] ?? "form");
    const msg: Record<string, string> = {
      name: "Please enter your full name.",
      phone: "Please enter a valid WhatsApp number.",
      email: "Please enter a valid email address.",
      interest: "Please choose a unit size.",
      consent: "Please tick the consent box so we can contact you.",
    };
    return NextResponse.json({ ok: false, error: msg[field] ?? "Please check the form and try again." }, { status: 422 });
  }
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true, id: "ok" }); // honeypot: pretend success

  const digits = d.phone.replace(/\D/g, "").replace(/^0+/, "");
  if (digits.length < 6 || digits.length > 14) return NextResponse.json({ ok: false, error: "Please enter a valid WhatsApp number." }, { status: 422 });

  const doc = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    project: "christian-a-rockefeller-business-tower",
    name: d.name,
    phoneE164: `${d.dialCode}${digits}`,
    email: d.email ?? "",
    interest: d.interest,
    source: d.source,
    attribution: d.attribution ?? {},
    consent: { given: true, at: new Date().toISOString(), text: "Contact by WhatsApp, phone or email about this project" },
    userAgent: req.headers.get("user-agent") ?? "",
    ip,
    status: "new",
  };

  const delivered = await deliver(doc);

  if (!delivered) {
    console.log("[lead] no destination configured or all failed. Lead payload:", JSON.stringify(doc));
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false, error: "We could not save your request. Please message Didin on WhatsApp instead." }, { status: 503 });
    }
  }
  return NextResponse.json({ ok: true, id: doc.id });
}

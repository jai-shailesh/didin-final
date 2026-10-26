import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { deliver, limited } from "@/lib/sinks";

/** Logs a WhatsApp button click (no personal details) to the same destinations as the lead form. */
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(`wa:${ip}`)) return NextResponse.json({ ok: true });
  let b: { placement?: string; attribution?: Record<string, string> } = {};
  try {
    b = JSON.parse(await req.text());
  } catch {}
  const placement = String(b.placement ?? "unknown").slice(0, 40).replace(/[^\w\-:/ ]/g, "");
  await deliver(
    {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      project: "whatsapp-click",
      name: "WhatsApp click (no details)",
      phoneE164: "",
      email: "",
      interest: "",
      source: `whatsapp-click:${placement}`,
      attribution: b.attribution && typeof b.attribution === "object" ? Object.fromEntries(Object.entries(b.attribution).map(([k, v]) => [k, String(v).slice(0, 300)])) : {},
      status: "whatsapp-click",
    },
    { email: false },
  ).catch(() => {});
  return NextResponse.json({ ok: true });
}

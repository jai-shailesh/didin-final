// Shared lead destinations (MongoDB, email, webhook / Google Sheet).
const hits = new Map<string, { n: number; t: number }>();
export function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.t > 60_000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  rec.n += 1;
  return rec.n > 6;
}

export async function saveMongo(doc: Record<string, unknown>) {
  const uri = process.env.MONGODB_URI;
  if (!uri) return false;
  const { MongoClient } = await import("mongodb");
  const g = globalThis as unknown as { _mongo?: Promise<InstanceType<typeof MongoClient>> };
  g._mongo ??= new MongoClient(uri, { serverSelectionTimeoutMS: 5000 }).connect();
  const client = await g._mongo;
  await client.db(process.env.MONGODB_DB || "didin").collection(process.env.MONGODB_COLLECTION || "leads").insertOne({ ...doc });
  return true;
}

export async function sendEmail(doc: Record<string, unknown>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!key || !to) return false;
  const rows = [
    ["Name", doc.name],
    ["WhatsApp", doc.phoneE164],
    ["Email", doc.email],
    ["Interest", doc.interest],
    ["Form", doc.source],
    ["Source", (doc.attribution as Record<string, string> | undefined)?.utm_source ?? "direct"],
    ["Campaign", (doc.attribution as Record<string, string> | undefined)?.utm_campaign ?? ""],
  ];
  const html = `<h2>New Rockefeller Tower lead</h2><table cellpadding="6">${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${String(v ?? "").replace(/</g, "&lt;")}</td></tr>`).join("")}</table><p><a href="https://wa.me/${String(doc.phoneE164).replace("+", "")}">Reply on WhatsApp</a></p>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.LEAD_FROM_EMAIL || "Leads <onboarding@resend.dev>", to: to.split(",").map((s) => s.trim()), subject: `New lead: ${doc.name} (${doc.interest})`, html }),
  });
  return res.ok;
}

export async function sendWebhook(doc: Record<string, unknown>) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(doc) });
  return res.ok;
}


export async function deliver(doc: Record<string, unknown>, opts: { email?: boolean } = {}) {
  const results = await Promise.allSettled([saveMongo(doc), opts.email === false ? Promise.resolve(false) : sendEmail(doc), sendWebhook(doc)]);
  results.forEach((r, i) => r.status === "rejected" && console.error(`[lead] sink ${i} failed:`, r.reason));
  return results.some((r) => r.status === "fulfilled" && r.value === true);
}

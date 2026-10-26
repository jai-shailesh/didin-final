// Run before going live:  npm run preflight
// Fails when anything required for a compliant launch is missing.
import { readFileSync, existsSync } from "node:fs";

const envFile = existsSync(".env.production") ? ".env.production" : existsSync(".env.local") ? ".env.local" : null;
const fileEnv = {};
if (envFile) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m) fileEnv[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}
const get = (k) => process.env[k] ?? fileEnv[k] ?? "";

const required = [
  ["NEXT_PUBLIC_SITE_URL", "Canonical domain for sitemap, schema and Open Graph"],
  ["NEXT_PUBLIC_DIDIN_BRN", "Didin's RERA broker card number"],
  ["NEXT_PUBLIC_TRIAD_RERA_ORN", "Triad Realty RERA office registration number"],
  ["NEXT_PUBLIC_TRAKHEESI_PERMIT", "DLD advertising permit number for this page"],
  ["NEXT_PUBLIC_GTM_ID", "Google Tag Manager container (GA4, Google Ads, LinkedIn tags)"],
];
const oneOf = [["MONGODB_URI", "RESEND_API_KEY", "LEAD_WEBHOOK_URL"], "At least one lead destination"];

let bad = 0;
console.log(`Preflight (${envFile ?? "process env only"})\n`);
for (const [k, why] of required) {
  const ok = !!get(k) && !get(k).includes("your-domain") && !get(k).includes("localhost");
  console.log(`${ok ? "OK     " : "MISSING"}  ${k}  (${why})`);
  if (!ok) bad++;
}
const dest = oneOf[0].filter((k) => get(k));
console.log(`${dest.length ? "OK     " : "MISSING"}  ${oneOf[0].join(" | ")}  (${oneOf[1]})`);
if (!dest.length) bad++;
if (get("NEXT_PUBLIC_AUTHORISED_PARTNER") === "true") console.log("NOTE     Authorised-partner wording is ON. Make sure you hold the written authorisation.");
console.log(bad ? `\n${bad} item(s) must be fixed before launch.` : "\nAll launch requirements are set.");
process.exit(bad ? 1 : 0);

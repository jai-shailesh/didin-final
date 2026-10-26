# Didin Dileep · Investor site (Next.js)

Personal-brand site for Didin Dileep (Triad Realty, Dubai) with a standalone investor landing page for the
Christian A. Rockefeller Business Tower.

| Route | Purpose |
|---|---|
| `/` | Didin's portfolio / personal-brand home (form source `home-*`) |
| `/christian-a-rockefeller-business-tower` | Short project page (the Google Ads / LinkedIn destination) |
| `/thank-you` | Conversion page (noindex). Fires the `generate_lead` event |
| `/privacy`, `/disclaimer` | Legal pages |
| `/api/lead` | Lead endpoint (validation, honeypot, rate limit, sinks) |
| `/llms.txt`, `/sitemap.xml`, `/robots.txt` | SEO / AI-search files |

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind v4, `motion`, Lenis. Fonts (Cormorant Garamond + Jost)
are self-hosted, so there are no Google Fonts requests.

## Run it

```bash
npm install
cp .env.example .env.local     # fill in the values
npm run dev                    # http://localhost:3000
npm run build && npm start     # production
npm run preflight              # fails if launch-critical env vars are missing
```

## Where things live

- `src/content/project.ts`: every project fact (units, prices, payment plan, benchmarks). Edit here, not in components.
- `src/content/faq.ts`: FAQ copy (also feeds FAQPage schema).
- `src/config/site.ts`: brand, contact and compliance values, all from env.
- `src/lib/finance.ts`: DLD / VAT / service-charge / yield maths used by the calculator and cost table.
- `src/components/sections/`: one file per page section.
- `src/app/globals.css`: design tokens (colours, type scale, buttons, animations).

## Leads

Every form (home, project page, contact, pop-up) posts to the same `/api/lead`, and every WhatsApp button click (no personal details) is logged by `/api/wa` to the same destinations, as a row whose "Form source" starts with `whatsapp-click:`.

`/api/lead` writes to every sink you configure and returns 503 in production if none succeed:

1. **MongoDB**: `MONGODB_URI` (+ `MONGODB_DB`, `MONGODB_COLLECTION`)
2. **Email**: `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL`
3. **Webhook** (CRM, Zapier, Make, Google Sheet): `LEAD_WEBHOOK_URL`

UTM, gclid, fbclid and li_fat_id are captured on landing and sent with the lead.

## Tracking (GTM + GA4 + Google Ads + LinkedIn)

Set `NEXT_PUBLIC_GTM_ID`. Consent Mode v2 starts denied and updates when the visitor accepts the cookie bar.
Events pushed to `dataLayer`:

| Event | When |
|---|---|
| `form_start` | First field touched |
| `lead_modal_open` | Lead pop-up opened |
| `whatsapp_click` | Any WhatsApp link |
| `calculator_use` | Yield calculator changed |
| `generate_lead` | `/thank-you` loads after a successful submit (the only conversion) |

In GTM: create a Custom Event trigger on `generate_lead`, then attach (a) a GA4 event tag, (b) a Google Ads conversion tag
(or import the GA4 key event into Google Ads), (c) the LinkedIn Insight Tag conversion. Use the project URL as the ad
final URL. Verify with GTM Preview before spending.

## Deploy

Vercel is the simplest: import the repo, add the env vars, set the domain. Any Node host works with `npm run build && npm start`.
After launch: submit `/sitemap.xml` in Search Console and set `NEXT_PUBLIC_GSC_VERIFICATION`.

See `LAUNCH_CHECKLIST.md` before going live.

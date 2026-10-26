/**
 * Single source of truth for brand, contact, compliance and tracking values.
 * Everything that must be supplied before launch is read from environment variables
 * (see .env.example). `npm run preflight` fails if a required value is missing.
 */
const env = (key: string, fallback = "") => process.env[key] ?? fallback;

export const site = {
  url: env("NEXT_PUBLIC_SITE_URL", "http://localhost:3000").replace(/\/$/, ""),
  name: "Didin Dileep",
  company: "Triad Realty",
  role: "Founder, Triad Realty",
  descriptor: "Property investment strategist for luxury investors",
  locale: "en_AE",

  phone: env("NEXT_PUBLIC_PHONE", "+971585563227"),
  phoneDisplay: env("NEXT_PUBLIC_PHONE_DISPLAY", "+971 58 556 3227"),
  whatsapp: env("NEXT_PUBLIC_WHATSAPP", "971585563227"),
  email: env("NEXT_PUBLIC_CONTACT_EMAIL"),
  address: env("NEXT_PUBLIC_OFFICE_ADDRESS"),

  gtmId: env("NEXT_PUBLIC_GTM_ID"),

  social: {
    linkedin: env("NEXT_PUBLIC_LINKEDIN_URL"),
    instagram: env("NEXT_PUBLIC_INSTAGRAM_URL"),
    youtube: env("NEXT_PUBLIC_YOUTUBE_URL"),
  },

  compliance: {
    didinBrn: env("NEXT_PUBLIC_DIDIN_BRN"),
    triadOrn: env("NEXT_PUBLIC_TRIAD_RERA_ORN"),
    triadLicence: env("NEXT_PUBLIC_TRIAD_TRADE_LICENCE"),
    trakheesi: env("NEXT_PUBLIC_TRAKHEESI_PERMIT"),
    /** Only flip to true once Triad holds a written authorisation from the developer/sales agent. */
    authorisedPartner: env("NEXT_PUBLIC_AUTHORISED_PARTNER") === "true",
  },
} as const;

export const waLink = (message = "Hi Didin, I would like the Rockefeller Tower price list and floor plans.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const telLink = `tel:${site.phone}`;

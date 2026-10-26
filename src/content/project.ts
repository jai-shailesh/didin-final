/**
 * Christian A. Rockefeller Business Tower: all facts used on the site.
 * Source: developer factsheet and floor plan brochure, sales agent announcement (28 Oct EOI), and Didin's market deck.
 * Values flagged `confirm` must be re-checked with the sales agent before launch (see LAUNCH_CHECKLIST.md).
 */
export const project = {
  slug: "christian-a-rockefeller-business-tower",
  name: "Christian A. Rockefeller Business Tower",
  shortName: "Rockefeller Tower",
  developer: "LMD",
  salesAgent: "Devmark",
  location: "Sheikh Zayed Road, Dubai",
  locationLong: "Sheikh Zayed Road, between DIFC, Downtown and Business Bay",
  mapsUrl: "https://maps.app.goo.gl/qm1hsQSbNPygsqAS7",

  floors: 87,
  offices: 332,
  heightM: 400, // confirm: factsheet and announcement say 400 m, brochure and deck say 372 m
  parking: 1080, // confirm: announcement says 1,080, factsheet says 1,100+
  elevators: 23,
  doubleDeckElevators: 16,
  amenityLevels: 5,
  handover: "Q2 2031",
  ownership: "Freehold",
  smallestSqft: 1077,
  priceFromPsf: 4000,
  priceToPsf: 4600,
  entryPsf: 4018,
  serviceChargePsf: 18,
  dldRate: 0.04,
  vatRate: 0.05,

  eoi: {
    opensOn: "2026-10-28",
    opensLabel: "28 October",
    amount: 100000,
    url: process.env.NEXT_PUBLIC_EOI_URL ?? "",
  },

  /** Show the 20/30/50 incentivised plan (it appears in the factsheet but not in the 28 Oct announcement). */
  showIncentivisedPlan: false,
} as const;

export type UnitKey = "core" | "medium" | "premier" | "half" | "full";

export const units: {
  key: UnitKey;
  name: string;
  count: number;
  minSqft: number;
  maxSqft: number;
  levels: string;
  blurb: string;
  suits: string;
}[] = [
  {
    key: "core",
    name: "Core Office",
    count: 124,
    minSqft: 1077,
    maxSqft: 1307,
    levels: "Mixed floors, levels 15 to 57",
    blurb: "The entry point to the tower. A complete private office with a Sheikh Zayed Road address.",
    suits: "Founders, consultancies, first-time commercial buyers",
  },
  {
    key: "medium",
    name: "Medium Office",
    count: 80,
    minSqft: 1488,
    maxSqft: 1522,
    levels: "Mixed floors, levels 15 to 57",
    blurb: "Room for a growing team, a boardroom and a reception that carries your brand.",
    suits: "Growing firms, professional services, regional desks",
  },
  {
    key: "premier",
    name: "Premier Office",
    count: 84,
    minSqft: 2295,
    maxSqft: 3251,
    levels: "Mixed floors, levels 15 to 57",
    blurb: "Larger plates with corner and elite configurations for established teams.",
    suits: "Established companies, family offices, investors seeking larger tickets",
  },
  {
    key: "half",
    name: "Half Floor",
    count: 34,
    minSqft: 5887,
    maxSqft: 7555,
    levels: "Executive suites, levels 58 to 62, 64 to 70 and 81 to 85",
    blurb: "Half a floor of the skyline, built for a regional headquarters.",
    suits: "Regional headquarters, holding companies",
  },
  {
    key: "full",
    name: "Full Floor",
    count: 10,
    minSqft: 11541,
    maxSqft: 13400,
    levels: "Presidential floors, levels 71 to 80",
    blurb: "An entire floor in the upper tower. Ten exist.",
    suits: "Corporate headquarters, institutional and private-capital holders",
  },
];

export const paymentPlan = [
  { label: "On signing the agreement", month: "Month 0", pct: 10 },
  { label: "After 1 month", month: "Month 1", pct: 10 },
  { label: "Construction instalment", month: "Month 15", pct: 5 },
  { label: "Construction instalment", month: "Month 21", pct: 5 },
  { label: "Construction instalment", month: "Month 27", pct: 5 },
  { label: "Construction instalment", month: "Month 33", pct: 5 },
  { label: "Construction instalment", month: "Month 39", pct: 5 },
  { label: "Construction instalment", month: "Month 45", pct: 5 },
  { label: "On handover", month: "Q2 2031", pct: 50 },
] as const;

export const priceBenchmarks = {
  period: "Average sale rate, AED per sq ft, January to October 2026",
  towers: [
    { name: "Opus Tower", psf: 5535 },
    { name: "Boulevard Plaza", psf: 5345 },
    { name: "Anantara Business Tower", psf: 4546 },
    { name: "Vision Tower", psf: 4379 },
    { name: "Emaar Square", psf: 4208 },
  ],
  readyAverage: 4803,
  offPlanAverage: 5378,
  entry: 4018,
};

export const launchBenchmarks = [
  { name: "Lumena Alta (primary)", psf: "6,130" },
  { name: "Lumena (primary)", psf: "5,877" },
  { name: "The Opus (resale median)", psf: "5,750" },
  { name: "HQ by Rove (primary)", psf: "4,699" },
  { name: "Berkeley Business Tower (expected)", psf: "4,500 to 5,000" },
  { name: "Christian A. Rockefeller (pre-launch)", psf: "4,000 to 4,600" },
];

export const rentBenchmarks = [
  { name: "One Za'abeel", rent: 1350 },
  { name: "ICD Brookfield, DIFC", rent: 970 },
  { name: "Central Park, DIFC", rent: 650 },
  { name: "Burj Khalifa", rent: 546 },
  { name: "Opus by Omniyat", rent: 538 },
  { name: "One Central, Trade Centre", rent: 450 },
];

export const vacancy = [
  { grade: "Prime", y2019: 13.0, h12026: 0.7 },
  { grade: "Grade A", y2019: 16.5, h12026: 4.2 },
  { grade: "Grade B", y2019: 20.0, h12026: 8.0 },
  { grade: "Grade C", y2019: 31.3, h12026: 10.9 },
];

export const averageRents = [
  { grade: "Prime", y2019: 203, h12026: 408 },
  { grade: "Grade A", y2019: 141, h12026: 299 },
  { grade: "Grade B", y2019: 131, h12026: 239 },
  { grade: "Grade C", y2019: 86, h12026: 190 },
];

export const connectivity = [
  { place: "Sheikh Zayed Road and Al Mustaqbal Street", min: 1 },
  { place: "Dubai Mall and Business Bay metro stations", min: 2 },
  { place: "Burj Khalifa, Dubai Mall and Dubai Fountain", min: 5 },
  { place: "DIFC", min: 8 },
  { place: "Dubai Opera and Museum of the Future", min: 8 },
  { place: "Al Khail Road", min: 12 },
  { place: "DXB International Airport", min: 20 },
];

export const amenities = [
  {
    key: "retreat",
    name: "The Retreat",
    level: "Level 13",
    tag: "Wellness and outdoor podium",
    image: "/images/observatory.webp",
    alt: "Podium infinity pool and sun terrace at The Retreat, Christian A. Rockefeller Business Tower",
    items: ["Spa and massage rooms", "Ice room, sauna and steam room", "Padel court", "Infinity pool and pool cabanas", "Sun bed terrace"],
  },
  {
    key: "reset",
    name: "The Reset",
    level: "Level 14",
    tag: "Fitness and studio",
    image: "/images/amen-gym.webp",
    alt: "Fully equipped gym with skyline views at The Reset",
    items: ["Fully equipped gym", "Multipurpose studio", "Juice bar and lounge"],
  },
  {
    key: "exchange",
    name: "The Exchange",
    level: "Level 87",
    tag: "Business lounge and co-working",
    image: "/images/workspace.webp",
    alt: "Business lounge and co-working space at The Exchange on level 87",
    items: ["Business lounge", "Co-working space", "Meeting rooms and meeting hub", "Conference centre", "Podcast rooms and hush pods"],
  },
  {
    key: "observatory",
    name: "The Observatory",
    level: "Level 87",
    tag: "Sky deck, infinity pool and ballroom",
    image: "/images/tower-sunset.webp",
    alt: "Rooftop infinity pool and sky deck on level 87 of Christian A. Rockefeller Business Tower at sunset",
    items: ["87th-floor infinity pool and sky deck", "Sky-high ballroom and pre-function area", "Outdoor bar", "Multipurpose hall"],
  },
];

export const caseSnapshots = [
  { invested: 4.5, exit: 10, years: "3 to 4", note: "Invested AED 4 to 5 million, sold for about AED 10 million.", label: "Exit" },
  { invested: 5.8, exit: 9, years: "3", note: "Invested AED 5.8 million, sold for AED 9 million.", label: "Exit" },
  { invested: 13.8, exit: 18, years: "At handover", note: "Invested AED 13.8 million. Current value about AED 18 million, unrealised.", label: "Current value" },
];

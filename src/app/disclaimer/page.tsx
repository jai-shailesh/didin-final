import type { Metadata } from "next";
import { project } from "@/content/project";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important information about the figures, images and role of this website.",
  alternates: { canonical: "/disclaimer" },
};

export default function Disclaimer() {
  return (
    <article className="bg-ivory pb-28 pt-40 text-ink">
      <div className="container-x max-w-3xl">
        <p className="eyebrow text-gold-deep">Legal</p>
        <h1 className="display h-lg mt-6">Disclaimer</h1>
        <div className="mt-12 space-y-6 text-[1.0625rem] leading-relaxed text-ink/85">
          <p>This website is operated by Didin Dileep of Triad Realty as an independent advisor. It is not the official website of {project.developer} (the developer) or {project.salesAgent} (the exclusive sales and marketing agent) of {project.name}.</p>
          <p>All information, including prices, payment plans, unit sizes, service charge estimates, distances and handover dates, is indicative, drawn from developer materials and third-party market data that has not been independently verified, and is subject to change without notice.</p>
          <p>Renderings and photographs are artistic impressions and may differ from the completed building.</p>
          <p>Yield, return and price-growth figures are illustrative models based on stated assumptions. They are not forecasts, offers or guarantees. Off-plan property carries risks including delays, market movements and changes to plans.</p>
          <p>Nothing on this site is financial, legal or tax advice. Consult qualified advisers before making any purchase. Only the final Sales and Purchase Agreement entered into between the seller and the buyer has legal effect. E&amp;OE.</p>
        </div>
      </div>
    </article>
  );
}

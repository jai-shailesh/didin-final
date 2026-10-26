import Link from "next/link";
import { site, telLink, waLink } from "@/config/site";
import { project } from "@/content/project";
import { Mark } from "./ui/Icons";

const dev = process.env.NODE_ENV !== "production";

function Licence({ label, value }: { label: string; value: string }) {
  if (!value && !dev) return null;
  return (
    <li className="flex justify-between gap-4 border-b border-white/10 py-2.5">
      <span className="text-ivory/60">{label}</span>
      <span className="num text-right text-ivory">{value || <em className="text-gold/80">to be added before launch</em>}</span>
    </li>
  );
}

export function Footer() {
  const c = site.compliance;
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory grain">
      <div className="container-x section-tight">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Mark className="text-gold" />
              <p className="display text-3xl">Didin Dileep</p>
            </div>
            <p className="mt-5 max-w-md text-ivory/70">
              {site.role}. Independent investment advisory on Dubai commercial and luxury property for private and corporate investors.
            </p>
            <ul className="mt-8 space-y-2 text-[0.9375rem]">
              <li>
                <a className="link-u" href={telLink}>
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="link-u" href={waLink()} target="_blank" rel="noopener">
                  WhatsApp
                </a>
              </li>
              {site.email ? (
                <li>
                  <a className="link-u" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
              ) : null}
              {site.address ? <li className="text-ivory/70">{site.address}</li> : null}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-6 space-y-3 text-[0.9375rem]">
              <li>
                <Link className="link-u" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="link-u" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="link-u" href="/services">
                  Services
                </Link>
              </li>
              <li>
                <Link className="link-u" href="/case-studies">
                  Case studies
                </Link>
              </li>
              <li>
                <Link className="link-u" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="link-u" href={`/${project.slug}`}>
                  Rockefeller Tower brochure
                </Link>
              </li>
              <li>
                <Link className="link-u" href="/privacy">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link className="link-u" href="/disclaimer">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </nav>
          </div>

          {/* <div className="lg:col-span-4">
            <p className="eyebrow text-gold">Regulatory</p>
            <ul className="mt-6 text-[0.875rem]">
              <Licence label="Broker card (BRN)" value={c.didinBrn} />
              <Licence label="Triad Realty RERA ORN" value={c.triadOrn} />
              <Licence label="Trade licence" value={c.triadLicence} />
              <Licence label="Advertising permit (Trakheesi)" value={c.trakheesi} />
            </ul>
          </div> */}
        

        <div className="mt-16 border-t border-white/10 pt-8 text-[0.8125rem] leading-relaxed text-ivory/55">
          <p>
            {project.name} is developed by {project.developer}. Exclusive sales and marketing by {project.salesAgent}. This website is operated by Didin Dileep of Triad Realty as an independent advisor
            {c.authorisedPartner ? " and authorised sales partner" : ""}, and is not the official website of the developer or the sales agent. Bookings and expressions of interest are completed through the developer&rsquo;s official channel.
          </p>
          <p className="mt-3">
            Renderings and project images are supplied by the developer and remain the property of their respective owners; they are artistic impressions and may differ from the completed building. Prices, payment plans, unit sizes, service charges and handover dates are indicative, based on information available at the time of publication and subject to change without notice. Return and yield figures are illustrative
            models built on stated assumptions. They are not forecasts, offers or guarantees. Off-plan purchases carry delivery and market risk. Only the final Sales and Purchase Agreement has legal effect. E&amp;OE.
          </p>
          <p className="mt-6">&copy; {new Date().getFullYear()} Didin Dileep. All rights reserved.</p>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden px-[var(--gutter)] pb-4">
        <p className="display whitespace-nowrap text-center text-[clamp(4rem,17vw,16rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(245,240,230,0.14)]">DIDIN DILEEP</p>
      </div>
    </footer>
  );
}

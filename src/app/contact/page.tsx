import type { Metadata } from "next";
import { site, telLink, waLink } from "@/config/site";
import { breadcrumbs } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { LeadForm } from "@/components/ui/LeadForm";
import { WhatsApp } from "@/components/ui/Icons";

const title = "Contact Didin Dileep | Request the Brochure or Book a Call";
const description = "Contact Didin Dileep of Triad Realty in Dubai. Leave your name and WhatsApp number to receive the brochure and price list, or call or message Didin directly.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", url: "/contact", title, description, images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Contact Didin Dileep" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", name: title, url: `${site.url}/contact`, description, mainEntity: { "@id": `${site.url}/#triad-realty` } }} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero eyebrow="Contact" title="Talk to Didin" lead="Leave your name and WhatsApp number. Didin sends the brochure and replies personally, usually within minutes." />
      <section className="section bg-ink text-ivory">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-gold">Direct</p>
            <ul className="mt-8 space-y-5 text-[1.0625rem]">
              <li>
                <a className="link-u num" href={telLink}>
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a className="link-u inline-flex items-center gap-2 text-gold-soft" href={waLink()} target="_blank" rel="noopener" data-wa="contact-page">
                  <WhatsApp width={18} height={18} /> WhatsApp Didin
                </a>
              </li>
              {site.email ? (
                <li>
                  <a className="link-u" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </li>
              ) : null}
              {site.address ? <li className="text-ivory/70">{site.address}</li> : <li className="text-ivory/70">Dubai, United Arab Emirates</li>}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="relative border border-white/15 bg-ink/65 p-8 sm:p-10">
              <span className="absolute -top-px left-0 h-px w-24 bg-gold" aria-hidden="true" />
              <h2 className="display text-[2.2rem] leading-[1.05]">Request the brochure</h2>
              <LeadForm source="contact-page" className="mt-8" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

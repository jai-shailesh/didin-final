import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { project } from "@/content/project";
import { homeFaqs } from "@/content/home-faq";
import { site } from "@/config/site";
import { breadcrumbs, faqSchema, personId } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/ui/LeadForm";
import { LeadButton } from "@/components/ui/LeadModal";
import { Arrow } from "@/components/ui/Icons";
import { EoiBadge } from "@/components/ui/EoiBadge";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { AboutStrip } from "@/components/sections/AboutStrip";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CaseCards } from "@/components/sections/CaseCards";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

const title = "Didin Dileep | Dubai Property Investment Advisor, Founder of Triad Realty";
const description = "Didin Dileep is the founder of Triad Realty and an independent Dubai property investment advisor. Sourced numbers, clear risks and personal briefings on luxury and commercial property. Request the brochure.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: ["Didin Dileep", "Triad Realty", "Dubai property investment advisor", "Dubai luxury real estate", "Dubai commercial property investment", "off-plan investment Dubai", "Christian A. Rockefeller Business Tower"],
  alternates: { canonical: "/" },
  openGraph: { type: "profile", url: "/", title, description, images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Didin Dileep, Dubai property investment advisor" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

export default function Home() {
  const profile = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}/#profile`,
    url: site.url,
    name: "Didin Dileep, Dubai property investment advisor",
    description,
    mainEntity: { "@id": personId },
    inLanguage: "en",
  };
  return (
    <>
      <JsonLd data={profile} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }])} />
      <JsonLd data={faqSchema(homeFaqs)} />

      <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink text-ivory grain" aria-labelledby="home-title">
        <Image src="/images/tower-dusk.webp" alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[70%_30%] opacity-45" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0e0c0a_10%,rgba(14,12,10,0.7)_60%,rgba(14,12,10,0.4)),linear-gradient(0deg,#0e0c0a,transparent_35%)]" />
        <div className="container-x grid min-h-[100svh] grid-cols-[minmax(0,1fr)] items-center gap-12 pb-20 pt-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="rise eyebrow flex items-center gap-4 text-gold" style={{ ["--d" as string]: "1s" }}>
              <span className="draw-x h-px w-12 bg-gold" style={{ ["--d" as string]: "1.1s" }} aria-hidden="true" />
              {site.role}
            </p>
            <h1 id="home-title" className="display h-xl mt-8">
              <span className="mask">
                <span style={{ ["--d" as string]: "1.05s" }}>Didin Dileep</span>
              </span>
              <span className="mask">
                <span className="italic-d text-gold-soft text-[0.46em] leading-[1.15]" style={{ ["--d" as string]: "1.2s" }}>
                  Dubai property investment advisor
                </span>
              </span>
            </h1>
            <p className="rise lead mt-9 max-w-xl text-ivory/85" style={{ ["--d" as string]: "1.45s" }}>
              Real facts. Real numbers. Real office. Independent briefings on luxury and commercial property for private and corporate investors.
            </p>
            <div className="rise mt-8" style={{ ["--d" as string]: "1.55s" }}>
              <EoiBadge />
            </div>
            <div className="rise mt-9 flex flex-col gap-4 sm:flex-row" style={{ ["--d" as string]: "1.65s" }}>
              <LeadButton source="home-hero" className="btn btn-gold lg:hidden">
                Request brochure <Arrow />
              </LeadButton>
              <Link href={`/${project.slug}`} className="btn btn-line">
                Rockefeller Tower details
              </Link>
            </div>
          </div>

          <aside id="hero-form" className="rise lg:col-span-5 xl:col-span-4 xl:col-start-9" style={{ ["--d" as string]: "1.5s" }} aria-label="Request the brochure">
            <div className="relative hidden border border-white/15 bg-ink/55 p-8 backdrop-blur-2xl lg:block">
              <span className="absolute -top-px left-0 h-px w-24 bg-gold" aria-hidden="true" />
              <p className="eyebrow text-gold">{project.shortName}</p>
              <h2 className="display mt-4 text-[2rem] leading-[1.05]">Request the brochure</h2>
              <p className="mt-3 text-[0.9375rem] text-ivory/70">Brochure, price list and floor plans on WhatsApp.</p>
              <LeadForm source="home-hero" className="mt-6" compact />
            </div>
          </aside>
        </div>
      </section>

      <FeaturedProject />
      <AboutStrip />
      <ServicesGrid limit={4} />
      <CaseCards />
      <Faq items={homeFaqs} title="Questions about working with Didin" />
      <FinalCta home />
    </>
  );
}

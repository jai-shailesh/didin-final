import type { Metadata } from "next";
import { site } from "@/config/site";
import { personId, breadcrumbs } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { AboutStrip } from "@/components/sections/AboutStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { LeadButton } from "@/components/ui/LeadModal";
import { Arrow } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { steps } from "@/content/site-content";

const title = "About Didin Dileep | Founder of Triad Realty, Dubai Property Investment Advisor";
const description = "Meet Didin Dileep, founder of Triad Realty. An independent Dubai property investment advisor who briefs private and corporate investors with sourced numbers and a clear view of the risks.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about" },
  openGraph: { type: "profile", url: "/about", title, description, images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Didin Dileep, Founder of Triad Realty" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og/home.jpg"] },
};

export default function AboutPage() {
  const c = site.compliance;
  const creds = [
    ["Broker card (BRN)", c.didinBrn],
    ["Triad Realty RERA ORN", c.triadOrn],
    ["Trade licence", c.triadLicence],
  ].filter(([, v]) => v);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "AboutPage", "@id": `${site.url}/about#page`, url: `${site.url}/about`, name: title, description, mainEntity: { "@id": personId }, inLanguage: "en" }} />
      <JsonLd data={breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero eyebrow="About" title="An adviser who shows his working" lead="Didin Dileep is the founder of Triad Realty. He helps investors review Dubai property with sourced numbers, honest risks and one person to call.">
        <LeadButton source="about-hero" className="btn btn-gold">
          Request brochure <Arrow />
        </LeadButton>
      </PageHero>
      <AboutStrip full />
      <section className="section bg-ivory text-ink" aria-labelledby="steps-title">
        <div className="container-x">
          <SectionHead id="steps-title" tone="light" eyebrow="How it works" title="Three simple steps" accent={["simple"]} size="md" />
          <ol className="mt-14 grid gap-px border border-ink/12 bg-ink/12 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 0.08} className="bg-ivory p-9">
                <p className="display num text-6xl text-gold-deep/70">0{i + 1}</p>
                <h3 className="display mt-7 text-3xl">{s.t}</h3>
                <p className="mt-3 text-ink/75">{s.d}</p>
              </Reveal>
            ))}
          </ol>
          {creds.length ? (
            <ul className="mt-14 max-w-xl text-[0.9375rem]">
              {creds.map(([k, v]) => (
                <li key={k} className="flex justify-between gap-4 border-b border-ink/15 py-3">
                  <span className="text-ink/65">{k}</span>
                  <span className="num">{v}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>
      <FinalCta home />
    </>
  );
}

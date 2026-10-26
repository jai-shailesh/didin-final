import Image from "next/image";
import Link from "next/link";
import { project } from "@/content/project";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { CountUp } from "@/components/ui/CountUp";
import { Arrow } from "@/components/ui/Icons";
import { LeadButton } from "@/components/ui/LeadModal";

export function FeaturedProject({ eyebrow = "Now briefing" }: { eyebrow?: string }) {
  return (
    <section id="project" className="section bg-ivory text-ink" aria-labelledby="featured-title">
      <div className="container-x">
        <SectionHead id="featured-title" tone="light" eyebrow={eyebrow} title="Christian A. Rockefeller Business Tower" accent={["Rockefeller"]} size="md" />
        <Reveal className="mt-14">
          <div className="grid overflow-hidden bg-ink text-ivory lg:grid-cols-[1.25fr_1fr]">
            <Link href={`/${project.slug}`} className="group relative block aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[30rem]" aria-label="View Christian A. Rockefeller Business Tower details">
              <Image src="/images/tower-clouds.webp" alt="Christian A. Rockefeller Business Tower above the clouds beside Burj Khalifa" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-lux)] group-hover:scale-105" />
            </Link>
            <div className="flex flex-col justify-between gap-10 p-8 sm:p-12">
              <div>
                <p className="eyebrow text-gold">EOI opens {project.eoi.opensLabel}</p>
                <h3 className="display mt-5 text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.04]">87 floors on Sheikh Zayed Road, from AED 4,000 per sq ft</h3>
                <p className="mt-5 text-ivory/75">
                  {project.offices} Grade A freehold offices, 10 / 10 / 30 / 50 payment plan, handover {project.handover}.
                </p>
              </div>
              <dl className="grid grid-cols-3 gap-6 border-t border-white/15 pt-8">
                {[
                  [project.floors, "Floors"],
                  [project.offices, "Offices"],
                  [project.heightM, "Metres"],
                ].map(([v, l]) => (
                  <div key={l as string}>
                    <dt className="eyebrow text-[0.6875rem] text-ivory/55">{l}</dt>
                    <dd className="display mt-2 text-4xl">
                      <CountUp to={v as number} />
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-col gap-3 sm:flex-row">
                <LeadButton source="featured-project" className="btn btn-gold">
                  Request brochure <Arrow />
                </LeadButton>
                <Link href={`/${project.slug}`} className="btn btn-line">
                  View details
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

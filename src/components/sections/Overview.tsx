import { project } from "@/content/project";
import { CountUp } from "@/components/ui/CountUp";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

const stats = [
  { v: project.floors, l: "Floors", d: "Offices from level 15 to level 86, with the Observatory on 87" },
  { v: project.offices, l: "Grade A offices", d: "From 1,077 sq ft suites to 13,400 sq ft full floors" },
  { v: project.heightM, l: "Metres tall", d: "Marketed by the developer as the UAE's tallest commercial tower", suffix: " m" },
  { v: project.parking, l: "Parking spaces", d: "Across 16 levels of parking" },
  { v: project.elevators, l: "Elevators", d: `${project.doubleDeckElevators} double-deck high-speed cabins serve the office floors` },
  { v: project.amenityLevels, l: "Amenity levels", d: "Hotel-style wellness, sport, co-working and dining" },
];

export function Overview() {
  return (
    <section id="overview" className="section bg-ivory text-ink" aria-labelledby="overview-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:pr-10">
          <SectionHead
            id="overview-title"
            tone="light"
            eyebrow="The tower"
            title="An 87-floor commercial address on Sheikh Zayed Road"
            accent={["87-floor"]}
          />
          <Reveal delay={0.1}>
            <p className="lead mt-10 text-ink/80">
              Christian A. Rockefeller Business Tower is developed by {project.developer} and rises 87 floors on {project.locationLong}. It holds {project.offices} Grade A offices, from individual suites to half and full floors, with five dedicated levels of hotel-style amenities.
            </p>
            <p className="mt-6 max-w-xl text-ink/75">
              The offices are freehold. Handover is expected in {project.handover}. The developer has completed project registration and opened the escrow account, and sales and marketing are handled exclusively by {project.salesAgent}.
            </p>
          </Reveal>
        </div>

        <div className="relative lg:col-span-6">
          <ParallaxImage src="/images/tower-fog.webp" alt="Christian A. Rockefeller Business Tower crown above the clouds with Burj Khalifa in the distance" width={696} height={768} sizes="(min-width:1024px) 45vw, 100vw" className="aspect-[4/5] w-full" />
          <Reveal delay={0.2} className="absolute -bottom-8 -left-4 hidden w-56 border border-ink/10 bg-ivory p-5 shadow-2xl sm:block lg:-left-12">
            <p className="eyebrow text-gold-deep">Developer</p>
            <p className="display mt-2 text-3xl">{project.developer}</p>
            <p className="mt-1 text-[0.8125rem] text-ink/65">Sales and marketing: {project.salesAgent}</p>
          </Reveal>
        </div>
      </div>

      <div className="container-x mt-28">
        <dl className="grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={(i % 3) * 0.08} className="bg-ivory p-8 sm:p-10">
              <dt className="eyebrow text-gold-deep">{s.l}</dt>
              <dd>
                <span className="display mt-5 block text-[clamp(3.4rem,6vw,5.4rem)] leading-none">
                  <CountUp to={s.v} suffix={s.suffix ?? ""} />
                </span>
                <span className="mt-4 block max-w-xs text-[0.9375rem] text-ink/70">{s.d}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

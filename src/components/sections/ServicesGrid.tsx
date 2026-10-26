import Link from "next/link";
import { services } from "@/content/site-content";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Arrow } from "@/components/ui/Icons";

export function ServicesGrid({ limit = 4, detailed = false }: { limit?: number; detailed?: boolean }) {
  const list = services.slice(0, limit);
  return (
    <section id="services" className="section bg-paper text-ink" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHead id="services-title" tone="light" eyebrow="Services" title="How Didin works with investors" accent={["works"]} size="md" />
        <ul className={`mt-16 grid gap-px border border-ink/12 bg-ink/12 ${detailed ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-4"}`}>
          {list.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 0.06} className="bg-paper p-8 sm:p-9">
              <p className="display num text-5xl text-gold-deep/70">0{i + 1}</p>
              <h3 className="display mt-7 text-[1.9rem] leading-tight">{s.title}</h3>
              <p className="mt-4 text-ink/75">{detailed ? s.long : s.short}</p>
            </Reveal>
          ))}
        </ul>
        {!detailed ? (
          <Reveal className="mt-10">
            <Link href="/services" className="link-u inline-flex items-center gap-3 eyebrow text-gold-deep">
              All services <Arrow />
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

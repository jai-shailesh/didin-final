import Link from "next/link";
import { site } from "@/config/site";
import { bio, pillars } from "@/content/site-content";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Arrow } from "@/components/ui/Icons";

export function AboutStrip({ full = false }: { full?: boolean }) {
  return (
    <section id="about" className="section relative overflow-hidden bg-umber text-ivory grain" aria-labelledby="about-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <ParallaxImage src="/images/didin.webp" alt="Didin Dileep, Founder of Triad Realty and Dubai property investment advisor" width={788} height={1212} sizes="(min-width:1024px) 40vw, 100vw" travel={4} className="aspect-[4/5] w-full max-w-md" imgClassName="object-[50%_14%]" />
        </div>
        <div className="lg:col-span-7">
          <SectionHead id="about-title" eyebrow="About" title={full ? "Didin Dileep, Founder of Triad Realty" : "Meet Didin Dileep"} accent={["Didin", "Dileep,", "Dileep"]} size="md" />
          <Reveal delay={0.1}>
            <p className="eyebrow mt-6 text-ivory/60">{site.descriptor}</p>
            <p className="lead mt-8 max-w-2xl text-ivory/85">{bio}</p>
            <p className="display mt-10 text-[clamp(1.8rem,3vw,2.6rem)] italic leading-tight text-gold-soft">Real Facts. Real Numbers. Real Office.</p>
          </Reveal>
          {full ? (
            <ul className="mt-12 space-y-8">
              {pillars.map((p) => (
                <Reveal as="li" key={p.t}>
                  <h3 className="display text-3xl text-gold-soft">{p.t}</h3>
                  <p className="mt-2 max-w-xl text-ivory/75">{p.d}</p>
                </Reveal>
              ))}
            </ul>
          ) : (
            <Reveal delay={0.15} className="mt-10">
              <Link href="/about" className="link-u inline-flex items-center gap-3 eyebrow text-gold">
                More about Didin <Arrow />
              </Link>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

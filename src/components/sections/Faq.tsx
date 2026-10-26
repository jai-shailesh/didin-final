import { faqs } from "@/content/faq";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Plus } from "@/components/ui/Icons";

export function Faq({ items = faqs, id = "faq", title = "Christian A. Rockefeller Business Tower: your questions, answered" }: { items?: { q: string; a: string }[]; id?: string; title?: string }) {
  return (
    <section id={id} className="section bg-ivory text-ink" aria-labelledby={`${id}-title`}>
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHead id={`${id}-title`} tone="light" eyebrow="FAQ" title={title} accent={["answered"]} size="md" />
          </div>
        </div>
        <div className="lg:col-span-8">
          <ul className="border-t border-ink/20">
            {items.map((f, i) => (
              <Reveal as="li" key={f.q} delay={Math.min(i, 4) * 0.03} className="border-b border-ink/20">
                <details name="faq" className="group">
                  <summary className="flex cursor-pointer items-start justify-between gap-8 py-7 text-left">
                    <h3 className="display text-[clamp(1.4rem,2vw,1.8rem)] leading-tight">{f.q}</h3>
                    <Plus className="mt-2 shrink-0 text-gold-deep transition-transform duration-500 group-open:rotate-45" />
                  </summary>
                  <p className="fade-in max-w-2xl pb-8 pr-10 text-ink/80">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

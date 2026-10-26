import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

export function Gallery() {
  return (
    <section id="gallery" className="section bg-ivory text-ink" aria-labelledby="gallery-title">
      <div className="container-x">
        <SectionHead
          id="gallery-title"
          tone="light"
          eyebrow="Architecture"
          title="A tower organised by altitude, from arrival lobby to sky deck"
          accent={["altitude"]}
          size="md"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <ParallaxImage src="/images/lobby.webp" alt="Triple-height arrival lobby with sculpture and views toward Sheikh Zayed Road" width={1392} height={768} sizes="(min-width:768px) 66vw, 100vw" className="aspect-[16/10] w-full" />
            <Reveal delay={0.1}>
              <p className="eyebrow mt-4 text-gold-deep">Arrival</p>
              <p className="display mt-1 text-2xl">Triple-height lobby</p>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:mt-24">
            <ParallaxImage src="/images/meeting-room.webp" alt="Boardroom with skyline views inside Christian A. Rockefeller Business Tower" width={697} height={768} sizes="(min-width:768px) 33vw, 100vw" className="aspect-[4/5] w-full" />
            <Reveal delay={0.1}>
              <p className="eyebrow mt-4 text-gold-deep">Exchange</p>
              <p className="display mt-1 text-2xl">Meeting rooms and conference centre</p>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-2">
            <ParallaxImage src="/images/tower-dusk.webp" alt="Christian A. Rockefeller Business Tower at dusk with Burj Khalifa beside it" width={696} height={768} sizes="(min-width:768px) 42vw, 100vw" className="aspect-[4/5] w-full" />
            <Reveal delay={0.1}>
              <p className="eyebrow mt-4 text-gold-deep">Skyline</p>
              <p className="display mt-1 text-2xl">Beside Burj Khalifa</p>
            </Reveal>
          </div>
          <div className="md:col-span-5 md:mt-40">
            <ParallaxImage src="/images/tower-clouds.webp" alt="Rockefeller Tower rising above the clouds on the Dubai skyline" width={1392} height={768} sizes="(min-width:768px) 42vw, 100vw" className="aspect-[16/11] w-full" />
            <Reveal delay={0.1}>
              <p className="eyebrow mt-4 text-gold-deep">Perspective</p>
              <p className="display mt-1 text-2xl">87 floors, 400 metres</p>
            </Reveal>
          </div>
        </div>
        <p className="mt-14 text-[0.8125rem] text-ink/60">Renderings are artistic impressions provided by the developer and may differ from the completed building.</p>
      </div>
    </section>
  );
}

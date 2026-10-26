import Image from "next/image";
import type { ReactNode } from "react";

type Props = { eyebrow: string; title: string; lead?: string; image?: string; children?: ReactNode };

/** Compact hero for inner pages. The h1 is plain text so it is indexed immediately. */
export function PageHero({ eyebrow, title, lead, image = "/images/tower-dusk.webp", children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-20 pt-40 text-ivory grain sm:pb-28 sm:pt-48">
      <Image src={image} alt="" fill priority sizes="100vw" className="-z-10 object-cover object-[60%_30%] opacity-20" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0e0c0a_20%,rgba(14,12,10,0.6)),linear-gradient(0deg,#0e0c0a,transparent_40%)]" />
      <div className="container-x">
        <p className="rise eyebrow flex items-center gap-4 text-gold" style={{ ["--d" as string]: "0.1s" }}>
          <span className="draw-x h-px w-12 bg-gold" style={{ ["--d" as string]: "0.2s" }} aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="display h-xl rise mt-7 max-w-4xl" style={{ ["--d" as string]: "0.2s" }}>
          {title}
        </h1>
        {lead ? (
          <p className="rise lead mt-8 max-w-2xl text-ivory/80" style={{ ["--d" as string]: "0.35s" }}>
            {lead}
          </p>
        ) : null}
        {children ? (
          <div className="rise mt-10 flex flex-col gap-4 sm:flex-row" style={{ ["--d" as string]: "0.5s" }}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}

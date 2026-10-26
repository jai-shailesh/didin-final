import { SplitHeading } from "./SplitHeading";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string[];
  intro?: string;
  tone?: "dark" | "light";
  className?: string;
  size?: "lg" | "md";
  id?: string;
};

export function SectionHead({ eyebrow, title, accent, intro, tone = "dark", className = "", size = "lg", id }: Props) {
  const light = tone === "light";
  return (
    <header className={className}>
      <Reveal>
        <p className={`eyebrow flex items-center gap-4 ${light ? "text-gold-deep" : "text-gold"}`}>
          <span className="h-px w-10 bg-current" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <SplitHeading id={id} text={title} accent={accent} className={`display mt-7 ${size === "lg" ? "h-lg" : "h-md"} ${light ? "text-ink" : "text-ivory"}`} />
      {intro ? (
        <Reveal delay={0.15}>
          <p className={`lead mt-8 max-w-2xl ${light ? "text-ink/75" : "text-ivory/75"}`}>{intro}</p>
        </Reveal>
      ) : null}
    </header>
  );
}

export function Source({ children, tone = "dark", className = "" }: { children: React.ReactNode; tone?: "dark" | "light"; className?: string }) {
  return <p className={`mt-6 max-w-3xl text-[0.8125rem] leading-relaxed ${tone === "light" ? "text-ink/60" : "text-ivory/55"} ${className}`}>{children}</p>;
}

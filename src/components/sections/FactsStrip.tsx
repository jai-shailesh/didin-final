import { project } from "@/content/project";

const facts = [
  `${project.floors} floors`,
  `${project.offices} Grade A offices`,
  "Freehold",
  `Handover ${project.handover}`,
  `${project.elevators} elevators, ${project.doubleDeckElevators} double-deck`,
  `${project.amenityLevels} levels of amenities`,
  `${project.parking.toLocaleString("en-US")} parking spaces`,
  "Sheikh Zayed Road",
];

export function FactsStrip() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {facts.map((f) => (
        <li key={f} className="flex items-center">
          <span className="display whitespace-nowrap px-8 text-[clamp(1.6rem,3vw,2.6rem)] italic text-ivory/90">{f}</span>
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee relative overflow-hidden border-y border-white/10 bg-espresso py-7 text-ivory" role="region" aria-label="Key facts">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

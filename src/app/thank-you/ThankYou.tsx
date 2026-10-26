"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { project } from "@/content/project";
import { site, waLink } from "@/config/site";
import { track } from "@/lib/track";
import { Arrow, WhatsApp } from "@/components/ui/Icons";

export function ThankYou() {
  const [name, setName] = useState("");

  useEffect(() => {
    let ref = "";
    try {
      setName((sessionStorage.getItem("lead_name") || "").split(" ")[0]);
      ref = sessionStorage.getItem("lead_ref") || "";
      // Fire the conversion once per lead, only on confirmed success.
      if (ref && sessionStorage.getItem("lead_fired") !== ref) {
        sessionStorage.setItem("lead_fired", ref);
        track("generate_lead", { lead_id: ref, currency: "AED", value: 0, project: project.slug });
      }
    } catch {}
  }, []);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink pb-24 pt-36 text-ivory grain">
      <div className="container-x">
        <p className="rise eyebrow flex items-center gap-4 text-gold">
          <span className="draw-x h-px w-12 bg-gold" aria-hidden="true" /> Request received
        </p>
        <h1 className="display h-xl mt-8 max-w-4xl">
          <span className="mask"><span>Thank you{name ? `, ${name}` : ""}.</span></span>
          <span className="mask"><span className="italic-d text-gold-soft" style={{ ["--d" as string]: "0.12s" }}>Didin will message you shortly.</span></span>
        </h1>
        <p className="rise lead mt-10 max-w-2xl text-ivory/80" style={{ ["--d" as string]: "0.3s" }}>
          Didin will message you on WhatsApp with what you asked for, such as the brochure, price list and floor plans. To make the first message useful, tell Didin your budget, whether this is for your own use or as an investment, and your timeline.
        </p>
        <div className="rise mt-10 flex flex-col gap-4 sm:flex-row" style={{ ["--d" as string]: "0.45s" }}>
          <a href={waLink("Hi Didin, I just sent my details on your website. My budget is ___, and this is for own use / investment.")} target="_blank" rel="noopener" onClick={() => track("whatsapp_click", { placement: "thank-you" })} className="btn btn-gold">
            <WhatsApp /> Message Didin now
          </a>
          <Link href={`/${project.slug}#faq`} className="btn btn-line">
            Read the FAQ <Arrow />
          </Link>
        </div>
        <p className="rise mt-12 max-w-xl text-[0.875rem] text-ivory/55" style={{ ["--d" as string]: "0.6s" }}>
          The EOI for {project.shortName} opens on {project.eoi.opensLabel} and is completed through the developer&rsquo;s official link. {site.name} will never ask you to send money to an individual.
        </p>
      </div>
    </section>
  );
}

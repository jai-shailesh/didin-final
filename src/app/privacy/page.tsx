import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Didin Dileep collects, uses and protects the personal data you submit through this website.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <article className="bg-ivory pb-28 pt-40 text-ink">
      <div className="container-x max-w-3xl">
        <p className="eyebrow text-gold-deep">Legal</p>
        <h1 className="display h-lg mt-6">Privacy policy</h1>
        <div className="mt-12 space-y-8 text-[1.0625rem] leading-relaxed text-ink/85">
          <p>This website is operated by Didin Dileep, Founder of Triad Realty (&ldquo;we&rdquo;). This policy explains what personal data we collect when you use the site, why, and what your choices are.</p>
          <section>
            <h2 className="display text-3xl">What we collect</h2>
            <p className="mt-3">When you submit a form we collect your name, phone or WhatsApp number, email address and the unit size you are interested in. We also record the page you submitted from and, where present, campaign parameters in the link you used (for example the advert or channel that brought you here). With your consent, analytics and advertising cookies measure visits and ad performance.</p>
          </section>
          <section>
            <h2 className="display text-3xl">Why we use it</h2>
            <p className="mt-3">We use your details to reply to your request, send the price list, floor plans and payment plan, discuss the project with you, and follow up about it. We measure which channels bring genuine enquiries so that we can improve this site and our marketing.</p>
          </section>
          <section>
            <h2 className="display text-3xl">Who we share it with</h2>
            <p className="mt-3">We share it only with service providers that host this site, store enquiries, send email and measure analytics, and with the developer or its sales agent where you ask us to register your interest. We do not sell your data.</p>
          </section>
          <section>
            <h2 className="display text-3xl">Cookies</h2>
            <p className="mt-3">Analytics and advertising cookies are off until you accept them in the cookie banner. You can change your choice by clearing this site&rsquo;s storage in your browser.</p>
          </section>
          <section>
            <h2 className="display text-3xl">Your rights</h2>
            <p className="mt-3">You can ask us to access, correct or delete your data, or to stop contacting you, at any time{site.email ? <> by emailing <a className="underline" href={`mailto:${site.email}`}>{site.email}</a></> : <> by messaging us on WhatsApp at {site.phoneDisplay}</>}. We keep enquiry data only as long as needed for these purposes or as the law requires.</p>
          </section>
          <p className="text-[0.875rem] text-ink/60">Last updated: October 2026. This policy is a general statement and should be reviewed by counsel before launch.</p>
        </div>
      </div>
    </article>
  );
}

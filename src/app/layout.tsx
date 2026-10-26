import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "lenis/dist/lenis.css";
import "./globals.css";
import { display, sans } from "./fonts";
import { site } from "@/config/site";
import { baseGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Mark } from "@/components/ui/Icons";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Didin Dileep | Dubai Property Investment Advisor", template: "%s | Didin Dileep" },
  description: "Independent Dubai property investment advisory by Didin Dileep, Founder of Triad Realty. Commercial and luxury real estate, market data and investor briefings.",
  applicationName: "Didin Dileep",
  authors: [{ name: "Didin Dileep" }],
  creator: "Didin Dileep",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Didin Dileep",
    locale: site.locale,
    url: "/",
    title: "Didin Dileep | Dubai Property Investment Advisor",
    description: "Real facts. Real numbers. Independent Dubai property investment advisory by Didin Dileep.",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Didin Dileep, Dubai property investment advisor" }],
  },
  twitter: { card: "summary_large_image", title: "Didin Dileep | Dubai Property Investment Advisor", description: "Real facts. Real numbers. Independent Dubai property investment advisory.", images: ["/og/home.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0e0c0a",
  colorScheme: "dark",
};

const consentDefault = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',analytics_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gtm = site.gtmId;
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.curtain{display:none!important}`}</style>
        </noscript>
        <JsonLd data={baseGraph()} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-gold focus:px-4 focus:py-3 focus:text-ink">
          Skip to content
        </a>

        <div className="curtain fixed inset-0 z-[100] grid place-items-center bg-ink" aria-hidden="true">
          <div className="curtain-mark flex flex-col items-center gap-4 text-ivory">
            <Mark width={44} height={44} className="text-gold" />
            <p className="display text-4xl">Didin Dileep</p>
            <p className="eyebrow text-ivory/60">Investor briefing</p>
          </div>
        </div>

        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileCta />
          <ConsentBanner />
        </Providers>

        <Script id="consent-default" strategy="beforeInteractive">
          {consentDefault}
        </Script>
        {gtm ? (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
            </Script>
            <noscript>
              <iframe src={`https://www.googletagmanager.com/ns.html?id=${gtm}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} title="Google Tag Manager" />
            </noscript>
          </>
        ) : null}
      </body>
    </html>
  );
}

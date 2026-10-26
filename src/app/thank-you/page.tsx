import type { Metadata } from "next";
import { ThankYou } from "./ThankYou";

export const metadata: Metadata = {
  title: { absolute: "Thank you | Didin Dileep" },
  robots: { index: false, follow: false },
  alternates: { canonical: "/thank-you" },
};

export default function Page() {
  return <ThankYou />;
}

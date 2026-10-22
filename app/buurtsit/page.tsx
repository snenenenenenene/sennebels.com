import type { Metadata } from "next";
import { pageOpenGraph } from "../data/seo";
import { Waitlist } from "./waitlist";

export const metadata: Metadata = {
  title: "BuurtSit waitlist",
  description:
    "District babysit matching for Ekeren and Merksem. Car filter. Gezinsbond-aware.",
  alternates: { canonical: "https://sennebels.com/buurtsit" },
  openGraph: pageOpenGraph(
    "/buurtsit",
    "BuurtSit — waitlist · Ekeren–Merksem",
    "District babysit matching for Ekeren and Merksem. Car filter. Gezinsbond-aware.",
  ),
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "BuurtSit",
  description: metadata.description,
  url: "https://sennebels.com/buurtsit",
  image: "https://sennebels.com/assets/og.png",
  brand: { "@type": "Brand", name: "BuurtSit" },
};

export default function BuurtSitWaitlistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Waitlist />
    </>
  );
}

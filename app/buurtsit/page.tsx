import type { Metadata } from "next";
import { pageOpenGraph, pageTwitter } from "../data/seo";
import { Waitlist } from "./waitlist";

const DESCRIPTION = "District babysit matching for Ekeren and Merksem. Car filter. Gezinsbond-aware.";
const SHARE_TITLE = "BuurtSit wachtlijst, Ekeren en Merksem";

export const metadata: Metadata = {
  title: "BuurtSit waitlist",
  description: DESCRIPTION,
  alternates: { canonical: "https://sennebels.com/buurtsit" },
  openGraph: pageOpenGraph("/buurtsit", SHARE_TITLE, DESCRIPTION),
  twitter: pageTwitter(SHARE_TITLE, DESCRIPTION),
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

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

export default function BuurtSitWaitlistPage() {
  return <Waitlist />;
}

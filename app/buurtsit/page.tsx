import type { Metadata } from "next";
import { Waitlist } from "./waitlist";

export const metadata: Metadata = {
  title: "BuurtSit waitlist",
  description:
    "District babysit matching for Ekeren and Merksem. Car filter. Gezinsbond-aware.",
  alternates: { canonical: "https://sennebels.com/buurtsit" },
  openGraph: {
    title: "BuurtSit — waitlist · Ekeren–Merksem",
    description:
      "District babysit matching for Ekeren and Merksem. Car filter. Gezinsbond-aware.",
    url: "https://sennebels.com/buurtsit",
  },
};

export default function BuurtSitWaitlistPage() {
  return <Waitlist />;
}

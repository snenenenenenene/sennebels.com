import type { Metadata } from "next";
import { countEntries } from "../lib/guestbook";
import { PageTitle } from "../components/section-header";
import { PageTransition } from "../components/transition";
import { Onboarding } from "./onboarding";

export const metadata: Metadata = {
  title: "Welcome",
  description: "Get issued a visitor card for Senne Bels's site: a name, a colour, a hat and a signature.",
  alternates: { canonical: "https://sennebels.com/welcome" },
  // A sign-in flow is not a page anyone should reach from a search result.
  robots: { index: false, follow: true },
};

export const dynamic = "force-dynamic";

export default async function Welcome() {
  let serial = 1;
  try {
    serial = (await countEntries()) + 1;
  } catch {
    // The card just gets number one. Nothing here needs the database to render.
  }

  return (
    <PageTransition>
      <main
        id="main"
        className="mx-auto flex w-full max-w-[1280px] flex-col px-6 pb-24 pt-28 md:px-12 lg:px-16"
      >
        <PageTitle
          title="Welcome, visitor"
          lede="Everyone who comes through gets a card. Pick how yours looks, sign it if you feel like it, and it goes in the gallery with the rest."
        />
        <div className="mt-14">
          <Onboarding nextSerial={serial} />
        </div>
      </main>
    </PageTransition>
  );
}

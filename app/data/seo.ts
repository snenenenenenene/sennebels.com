import type { Metadata } from "next";
import { PERSON } from "./portfolio";

export const SITE_URL = "https://sennebels.com";

/**
 * A page-level openGraph replaces the layout's whole object rather than
 * merging into it, so a subpage that only set `url` would lose the image,
 * site name and locale. Every page builds its card from here instead.
 */
export function pageOpenGraph(path: string, title: string, description: string): Metadata["openGraph"] {
  return {
    type: "profile",
    locale: "en_GB",
    url: `${SITE_URL}${path}`,
    siteName: PERSON.name,
    title,
    description,
    images: [
      {
        url: "/assets/og.png",
        width: 1200,
        height: 630,
        alt: `${PERSON.name}, ${PERSON.jobTitle}`,
      },
    ],
  };
}

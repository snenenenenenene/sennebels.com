// app/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { FEATURED, PERSON, SKILL_GROUPS } from "./data/portfolio";
import { SiteChrome } from "./components/site-chrome";
import { PostHogAnalytics } from "./components/analytics";
import { pageOpenGraph, SITE_URL } from "./data/seo";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hanken",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
  display: "swap",
});

const TITLE = `${PERSON.name}, ${PERSON.jobTitle}`;
/** Kept under 160 characters: past that, Google truncates it in the result. */
const DESCRIPTION =
  "Senior software engineer in Antwerp. Six years remote-first building web, mobile and AI systems in TypeScript, for Tomorrowland, Kaedim and Flanders.";

export const metadata: Metadata = {
  metadataBase: new URL("https://sennebels.com"),
  title: {
    default: TITLE,
    template: `%s | ${PERSON.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "Senior Software Engineer",
    "Full-Stack Engineer",
    "AI Engineer",
    "LLM Systems",
    "Retrieval-Augmented Generation",
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Three.js",
    "Senne Bels",
    "Antwerp Developer",
    "Belgium Developer",
  ],
  authors: [{ name: PERSON.name, url: "https://sennebels.com" }],
  creator: PERSON.name,
  publisher: PERSON.name,
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: pageOpenGraph("", TITLE, DESCRIPTION),
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@snenenenene",
    images: ["/assets/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/icon.ico", type: "image/x-icon" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/images/logo.png" }],
    other: [{ rel: "mask-icon", url: "/images/safari-pinned-tab.svg", color: "#1E1515" }],
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://sennebels.com",
    languages: { "en-GB": "https://sennebels.com" },
  },
  category: "technology",
};

const PERSON_ID = `${SITE_URL}/#person`;
const OKAPI_ID = `${SITE_URL}/#okapi`;

// ProfilePage wrapping a Person is the snippet that does the most work on a portfolio:
// it is what lets a knowledge graph resolve "Senne Bels" to one entity.
// One @graph so the Person, Okapi Works and the work list reference each other by @id.
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profile`,
      url: SITE_URL,
      mainEntity: { "@id": PERSON_ID },
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: PERSON.name,
      jobTitle: PERSON.jobTitle,
      description: PERSON.answerBlock,
      url: SITE_URL,
      image: `${SITE_URL}/assets/og.png`,
      email: `mailto:${PERSON.email}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: PERSON.locality,
        addressCountry: PERSON.country,
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "AP University of Applied Sciences",
      },
      worksFor: { "@id": OKAPI_ID },
      knowsAbout: SKILL_GROUPS.flatMap((g) => g.items.map((i) => i.name)),
      knowsLanguage: ["nl", "en", "fr"],
      sameAs: [PERSON.github, PERSON.linkedin, PERSON.x],
    },
    {
      "@type": "ProfessionalService",
      "@id": OKAPI_ID,
      name: "Okapi Works",
      url: SITE_URL,
      areaServed: PERSON.country,
      founder: { "@id": PERSON_ID },
    },
    {
      "@type": "ItemList",
      name: "Selected work",
      itemListElement: FEATURED.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.name,
          headline: project.title,
          description: project.description,
          author: { "@id": PERSON_ID },
        },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${hanken.variable} ${fraunces.variable}`}>
      <head>
        <meta name="theme-color" content="#F9F8F5" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#141110" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-full bg-paper font-helvetihand">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Analytics />
        <PostHogAnalytics />
        <SiteChrome email={PERSON.email}>{children}</SiteChrome>
      </body>
    </html>
  );
}

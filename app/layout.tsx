// app/layout.tsx
import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { FEATURED, PERSON, SKILLS } from "./data/portfolio";

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
const DESCRIPTION =
  "Senior software engineer in Antwerp, Belgium. Six years remote-first building full-stack web, mobile and production AI systems in TypeScript, for Tomorrowland, Kaedim (Y Combinator) and the Belgian government.";

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
    "Visa Sponsorship",
  ],
  authors: [{ name: PERSON.name, url: "https://sennebels.com" }],
  creator: PERSON.name,
  publisher: PERSON.name,
  formatDetection: { email: false, telephone: false, address: false },
  openGraph: {
    type: "profile",
    locale: "en_GB",
    url: "https://sennebels.com",
    siteName: PERSON.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/assets/screenshot.png",
        width: 1200,
        height: 630,
        alt: `${PERSON.name}, ${PERSON.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@snenenenene",
    images: ["/assets/screenshot.png"],
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

// ProfilePage wrapping a Person is the highest-leverage snippet on a portfolio:
// it is what lets a knowledge graph resolve "Senne Bels" to one entity.
const profileSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: PERSON.name,
    jobTitle: PERSON.jobTitle,
    description: PERSON.answerBlock,
    url: "https://sennebels.com",
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
    worksFor: { "@type": "Organization", name: "Okapi Works" },
    knowsAbout: SKILLS.map((s) => s.label),
    knowsLanguage: ["nl", "en", "fr"],
    sameAs: [PERSON.github, PERSON.linkedin],
  },
};

const workSchema = {
  "@context": "https://schema.org",
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
      author: { "@type": "Person", name: PERSON.name },
    },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${hanken.variable} ${fraunces.variable}`}>
      <head>
        <meta name="theme-color" content="#F9F8F5" />
      </head>
      <body className="min-h-full bg-paper font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(workSchema) }}
        />
        <Analytics />
        {children}
      </body>
    </html>
  );
}

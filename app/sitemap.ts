import type { MetadataRoute } from "next";
import { FEATURED } from "./data/portfolio";

const SITE = "https://sennebels.com";

/**
 * Priority and changeFrequency are hints rather than instructions, but the
 * lastModified date is read: without one, a crawler has nothing to tell it a
 * page moved on. Build time is honest here because the whole site is static.
 */
const PAGES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" },
  { path: "/now", priority: 0.7, changeFrequency: "monthly" },
  { path: "/fun", priority: 0.5, changeFrequency: "yearly" },
  { path: "/friends", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...PAGES.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...FEATURED.map((project) => ({
      url: `${SITE}/work/${project.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}

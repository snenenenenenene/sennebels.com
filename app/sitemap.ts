import type { MetadataRoute } from "next";
import { FEATURED } from "./data/portfolio";

const SITE = "https://sennebels.com";
const STATIC_ROUTES = ["", "/about", "/fun", "/now", "/friends"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_ROUTES.map((route) => ({ url: `${SITE}${route}` })),
    ...FEATURED.map((project) => ({ url: `${SITE}/work/${project.slug}` })),
  ];
}

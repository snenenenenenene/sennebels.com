/**
 * PostHog through our own domain. Ad blockers drop requests to *.posthog.com,
 * and this site's visitors are mostly developers, so a direct connection
 * undercounts badly. The client posts to /ingest and Vercel forwards it.
 */
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com';
const POSTHOG_ASSETS = POSTHOG_HOST.replace('.i.posthog.com', '-assets.i.posthog.com');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // PostHog's endpoints end in a slash (/e/, /flags/), and the default
  // redirect would strip it. The redirect below keeps the old behaviour for
  // every other path, so /about/ still lands on /about.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [{ source: '/:path((?!ingest/).+)/', destination: '/:path', permanent: true }];
  },
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: `${POSTHOG_ASSETS}/static/:path*` },
      { source: '/ingest/array/:path*', destination: `${POSTHOG_ASSETS}/array/:path*` },
      { source: '/ingest/:path*', destination: `${POSTHOG_HOST}/:path*` },
    ];
  },
  // <ViewTransition> needs no flag on Next 16: the App Router's React canary
  // ships it, and `experimental.viewTransition` is no longer a recognised key.
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },
};

export default nextConfig;

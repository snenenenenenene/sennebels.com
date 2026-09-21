/** @type {import('next').NextConfig} */
const nextConfig = {
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

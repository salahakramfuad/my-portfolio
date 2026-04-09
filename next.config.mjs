import path from 'path';
import { fileURLToPath } from 'url';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Let OpenNext copy full packages; needed for workerd conditional exports (see opennext.js.org/cloudflare/howtos/workerd)
  serverExternalPackages: ['jose', 'jwks-rsa', 'firebase-admin'],
  webpack: (config) => {
    // Configure path aliases for webpack
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };
    return config;
  },
  // Configure Turbopack to resolve path aliases
  turbopack: {
    resolveAlias: {
      '@': path.resolve(__dirname),
    },
  },
  // Configure image domains for Next.js Image component
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

initOpenNextCloudflareForDev();

export default nextConfig;

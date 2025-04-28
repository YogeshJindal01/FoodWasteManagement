/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'placehold.co', 'via.placeholder.com'],
    unoptimized: true, // For static exports
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_RAILWAY_URL: 'https://foodwastemanagement-production.up.railway.app',
  },
  // Increase the timeout for builds
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // Increase the limit for server actions
    },
  },
  // External packages for server components
  serverExternalPackages: ['mongoose'],
  // Output standalone for Docker
  output: 'standalone',
}

module.exports = nextConfig 
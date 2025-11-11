/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Provide an explicit (empty) turbopack config so Next.js respects custom webpack
  // while avoiding the Turbopack vs webpack configuration error introduced in Next 16.
  turbopack: {},
};

module.exports = nextConfig;


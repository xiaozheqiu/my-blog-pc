/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["vkceyugu.cdn.bspapp.com"],
  },
};

module.exports = nextConfig;

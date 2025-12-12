const path = require("path");
const withNextIntl = require("next-intl/plugin")();

/** @type {import('next').NextConfig} */
const nextConfig = withNextIntl({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),       // @ -> src
      "@public": path.resolve(__dirname, "public"), // optional
    };
    return config;
  },
});

module.exports = nextConfig;

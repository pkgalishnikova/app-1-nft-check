/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fixes wallet connect dependency issue
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  staticPageGenerationTimeout: 120,
};

export default nextConfig;

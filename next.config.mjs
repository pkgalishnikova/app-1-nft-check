/** @type {import('next').NextConfig} */
const nextConfig = {
  // fixes wallet connect dependency issue https://docs.walletconnect.com/web3modal/nextjs/about#extra-configuration
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    module.exports = {
      staticPageGenerationTimeout: 120,
    }
    return config;
  },
  
};

export default nextConfig;

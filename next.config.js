/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    publicEnvs: Object.fromEntries(
      Object.entries(process.env).filter(([key]) =>
        key.includes("NEXT_PUBLIC_")
      )
    ),
  },
};

module.exports = nextConfig;

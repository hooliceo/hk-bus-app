/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/hk-bus",
  images: {
    unoptimized: process.env.NODE_ENV == "development",
  },
};

export default nextConfig;

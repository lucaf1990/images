/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Remove the trailing slash
        port: "",
        pathname: "/**", // Add the complete path
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com", // Remove the trailing slash
        port: "",
        pathname: "/**", // Add the complete path
      },
    ],
  },
};

module.exports = nextConfig;

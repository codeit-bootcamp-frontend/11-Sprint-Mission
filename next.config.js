/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.co.kr",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.co",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**.co.kr",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**.net",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/...",
      },
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "/..123.",
      },
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  publicRuntimeConfig: {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

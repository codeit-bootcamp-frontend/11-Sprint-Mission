import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "example.com",
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
    ],
  },
};

export default nextConfig;

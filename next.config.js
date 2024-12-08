/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "example.com",
      "image.hanatour.com",
      "youtube.com",
      "cafe24.poxo.com",
    ],
  },
};

module.exports = nextConfig;

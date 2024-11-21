/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "another-bucket.s3.amazonaws.com",
      "example.com",
      "via.placeholder.com",
      "flexible.img.hani.co.kr",
    ],
  },
};

module.exports = nextConfig;

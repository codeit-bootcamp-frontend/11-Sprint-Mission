/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "example.com",
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "http://via.placeholder.com/500.jpg/",
      "via.placeholder.com",
      "flexible.img.hani.co.kr",
    ],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
      "another-bucket.s3.amazonaws.com",
      "example.com",
      "via.placeholder.com",
      "flexible.img.hani.co.kr",
      "youtube.com",
      "www.shutterstock.com",
      "image.hanatour.com",
      "mblogthumb-phinf.pstatic.net",
      "ibb.co",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;

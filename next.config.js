/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // next/image src Prop 오류 해결: https://www.codeit.kr/topics/building-a-website-with-nextjs/lessons/5968 내용 참고
  images: {
    domains: ["example.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/Sprint_Mission/**",
      },
    ],
  },
};

module.exports = nextConfig;

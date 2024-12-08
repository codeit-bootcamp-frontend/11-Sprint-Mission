// next.config.mjs

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: [
      'flexible.img.hani.co.kr',
      'via.placeholder.com',
      'example.com',
      'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
      'ibb.co',
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;

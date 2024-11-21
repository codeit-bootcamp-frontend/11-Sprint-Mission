/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // App Router 활성화
  },
  distDir: 'dist', // 빌드 결과물이 저장될 디렉토리 이름
};

export default nextConfig;

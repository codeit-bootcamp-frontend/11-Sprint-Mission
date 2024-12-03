const nextConfig = {
  /* config options here */
  reactStrictMode: false,
  allowFutureImage: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.hanatour.com',
        port: '',
        pathname: '/usr/**',
      },
      {
        protocol: 'https',
        hostname: '**', // 모든 도메인 허용
        pathname: '**', // 모든 경로 허용
      },
    ],
  },
}

module.exports = nextConfig

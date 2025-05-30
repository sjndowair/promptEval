/** @type {import('next').NextConfig} */
const nextConfig = {
  // 터보팩 비활성화 (기본 웹팩 사용)
  experimental: {
    turbo: false,
  },
  // 웹팩 설정
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 웹팩 설정 커스터마이징
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': new URL('./', import.meta.url).pathname,
    }

    // 개발 모드에서 빠른 새로고침 활성화
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }

    // 프로덕션 빌드 최적화
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      }
    }

    return config
  },
  // 이미지 최적화 설정
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  // 압축 활성화
  compress: true,
  // 정적 파일 최적화
  trailingSlash: false,
  // 개발 서버 설정
  devIndicators: {
    buildActivity: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

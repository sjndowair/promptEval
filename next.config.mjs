/** @type {import('next').NextConfig} */
const nextConfig = {
  // 터보팩 비활성화 (기본 웹팩 사용)
  experimental: {
    turbo: false,
  },
  // 웹팩 설정

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

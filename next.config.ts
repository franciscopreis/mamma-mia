import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: '*.fna.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn-outdarego.ptisp.systems',
      },
    ],
  },
}

export default nextConfig

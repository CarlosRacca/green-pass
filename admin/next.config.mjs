/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'plus.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'blob.v0.dev', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', port: '', pathname: '/**' },
    ],
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: false,
}

export default nextConfig
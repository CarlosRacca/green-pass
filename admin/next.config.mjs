/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export static app to be embedded under CRA at /admin-next
  output: 'export',
  basePath: '/admin-next',
  assetPrefix: '/admin-next',
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'plus.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'blob.v0.dev', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'avatars.githubusercontent.com', port: '', pathname: '/**' },
    ],
  },
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  reactStrictMode: false,
}

export default nextConfig
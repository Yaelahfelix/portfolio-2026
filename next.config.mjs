/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Sanity serves the originals at full resolution. Routing them through the
    // image optimizer is the difference between shipping a 2MB JPEG and a
    // sized AVIF, and project cards are the heaviest thing on the page after
    // the WebGL bundle.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  experimental: {
    // These are barrel files. Without this, importing one symbol from drei
    // pulls its entire module graph into the client bundle.
    optimizePackageImports: ['@react-three/drei', '@react-three/postprocessing'],
  },
}

export default nextConfig

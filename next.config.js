/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.minimize = false
    }
    return config
  }
}

module.exports = nextConfig

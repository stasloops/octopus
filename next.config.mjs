/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // basePath: '/login',
  transpilePackages: ['@mui/x-charts'],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: ["@svgr/webpack"]
    })
    return config
  }
}

module.exports = nextConfig

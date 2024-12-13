/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // output: 'standalone',
  // basePath: '/login',
  // transpilePackages: ['@mui/x-charts'],
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     issuer: { and: [/\.(js|ts)x?$/] },
  //     use: ["@svgr/webpack"]
  //   })
  //   return config
  // }
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  transpilePackages: ['@mui/x-charts'],
  // output: 'standalone',
  // basePath: '/login',
  // 
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

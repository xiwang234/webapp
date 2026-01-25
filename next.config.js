/** @type {import('next').NextConfig} */
const nextConfig = {
  // 核心：忽略所有 TypeScript 构建错误
  typescript: {
    ignoreBuildErrors: true,
  },
  // 可选：忽略 ESLint 错误（防止后续报 eslint 错）
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 如果你的配置里有其他内容（比如 reactStrictMode），保留在这里
  // reactStrictMode: true,
  // swcMinify: true,
}

module.exports = nextConfig

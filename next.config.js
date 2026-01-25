/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 核心：忽略所有 TypeScript 构建错误
  typescript: {
    ignoreBuildErrors: true,
  },
  // 确保正确的转译配置
  transpilePackages: ['@supabase/supabase-js', '@supabase/auth-helpers-nextjs'],
}

module.exports = nextConfig

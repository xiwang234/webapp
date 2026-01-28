/**
 * API 配置文件
 * 统一管理所有 API 相关的配置，修改时只需改这一个文件
 */

/**
 * ========================================
 * 核心配置 - 修改这里即可
 * ========================================
 */

/**
 * 后端 API 基础地址
 * 优先使用环境变量，如果没有则使用默认值
 *
 * 开发环境: http://localhost:8080
 * 生产环境: 在 .env.production 中配置 NEXT_PUBLIC_API_BASE_URL
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

/**
 * 固定盐（用于密码加密）
 * 注册和登录时使用
 */
export const FIXED_SALT = 'szbz-fixed-salt-2024-secure-password';

/**
 * API 签名密钥
 * 用于生成请求签名
 */
export const API_SIGN_KEY = 'szbz-api-sign-key-2026';

/**
 * 签名有效期（毫秒）
 * 默认 5 分钟
 */
export const SIGN_VALIDITY_MS = 5 * 60 * 1000;

/**
 * Token 刷新缓冲时间（毫秒）
 * 提前多久开始刷新 accessToken
 * 默认提前 1 分钟
 */
export const TOKEN_REFRESH_BUFFER_MS = 60 * 1000;

/**
 * ========================================
 * API 端点配置
 * ========================================
 */

/**
 * 认证相关接口
 */
export const AUTH_ENDPOINTS = {
  // 获取随机盐
  RANDOM_SALT: '/api/web-auth/random-salt',

  // 用户注册
  REGISTER: '/api/web-auth/register',

  // 用户登录
  LOGIN: '/api/web-auth/login',

  // 刷新 Token
  REFRESH: '/api/web-auth/refresh',

  // 用户登出
  LOGOUT: '/api/web-auth/logout',

  // 获取当前用户信息
  ME: '/api/web-auth/me',

  // 请求密码重置
  REQUEST_RESET: '/api/web-auth/request-reset',

  // 重置密码
  RESET_PASSWORD: '/api/web-auth/reset-password',

  // 验证邮箱
  VERIFY_EMAIL: '/api/web-auth/verify-email',

  // LifeAI 接口
  LIFE_AI: '/api/web-auth/lifeai',

  // 查看缓存信息
  CACHE_INFO: '/api/web-auth/cache-info',
} as const;

/**
 * ========================================
 * LocalStorage 键名配置
 * ========================================
 */
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'szbz_access_token',
  REFRESH_TOKEN: 'szbz_refresh_token',
  ACCESS_TOKEN_EXPIRES_AT: 'szbz_access_token_expires_at',
  REFRESH_TOKEN_EXPIRES_AT: 'szbz_refresh_token_expires_at',
  USER_INFO: 'szbz_user_info',
  DEVICE_ID: 'szbz_device_id',
} as const;

/**
 * ========================================
 * 辅助函数
 * ========================================
 */

/**
 * 获取完整的 API URL
 * @param endpoint API 端点（相对路径）
 * @returns 完整的 URL
 */
export function getFullApiUrl(endpoint: string): string {
  return endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
}

/**
 * 判断当前是否为开发环境
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * 判断当前是否为生产环境
 */
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * ========================================
 * 导出所有配置（便于调试）
 * ========================================
 */
export const API_CONFIG = {
  API_BASE_URL,
  FIXED_SALT,
  API_SIGN_KEY,
  SIGN_VALIDITY_MS,
  TOKEN_REFRESH_BUFFER_MS,
  AUTH_ENDPOINTS,
  STORAGE_KEYS,
  isDevelopment,
  isProduction,
} as const;

// 开发环境下打印配置信息（便于调试）
if (isDevelopment && typeof window !== 'undefined') {
  console.log('[API Config] Loaded:', {
    baseUrl: API_BASE_URL,
    environment: process.env.NODE_ENV,
  });
}

/**
 * 认证相关类型定义
 */

// API 统一响应结构
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  token?: string;
  timestamp: number;
}

// 随机盐响应
export interface RandomSaltResponse {
  randomSalt: string;
  expiresAt: number;
}

// 认证响应（登录/刷新Token）
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: number;
  refreshTokenExpiresAt: number;
  encryptedUserId: string;
  username: string;
  maskedEmail: string;
}

// 注册请求
export interface RegisterRequest {
  username: string;
  email: string;
  password: string; // SHA256(原密码 + 固定盐)
}

// 登录请求
export interface LoginRequest {
  email: string;
  password: string; // SHA256(原密码 + 固定盐 + 随机盐)
  randomSalt: string;
  deviceId: string;
}

// 刷新Token请求
export interface RefreshTokenRequest {
  refreshToken: string;
  deviceId: string;
}

// 用户认证状态
export interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: number | null;
  refreshTokenExpiresAt: number | null;
  user: {
    encryptedUserId: string;
    username: string;
    maskedEmail: string;
  } | null;
}

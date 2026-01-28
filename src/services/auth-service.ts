/**
 * 认证服务
 * 封装所有认证相关的 API 调用
 */

import { apiGet, apiPost } from '@/lib/api-client';
import { encryptRegisterPassword, encryptLoginPassword } from '@/lib/crypto';
import { getDeviceId, saveAuthTokens, clearAuthTokens } from '@/lib/auth-utils';
import { AUTH_ENDPOINTS } from '@/config/api';
import type {
  ApiResponse,
  RandomSaltResponse,
  AuthResponse,
  RegisterRequest,
  LoginRequest,
} from '@/types/auth';

/**
 * 获取随机盐（用于登录）
 * GET /api/web-auth/random-salt
 */
export async function getRandomSalt(): Promise<RandomSaltResponse> {
  const response = await apiGet<RandomSaltResponse>(AUTH_ENDPOINTS.RANDOM_SALT);
  return response.data;
}

/**
 * 用户注册
 * POST /api/web-auth/register
 * @param username 用户名
 * @param email 邮箱
 * @param plainPassword 明文密码
 */
export async function register(
  username: string,
  email: string,
  plainPassword: string
): Promise<string> {
  // 加密密码：SHA256(原密码 + 固定盐)
  const encryptedPassword = await encryptRegisterPassword(plainPassword);

  const requestBody: RegisterRequest = {
    username,
    email,
    password: encryptedPassword,
  };

  const response = await apiPost<string>(AUTH_ENDPOINTS.REGISTER, requestBody);
  return response.message;
}

/**
 * 用户登录
 * POST /api/web-auth/login
 * @param email 邮箱
 * @param plainPassword 明文密码
 * @returns 认证响应
 */
export async function login(
  email: string,
  plainPassword: string
): Promise<AuthResponse> {
  // 1. 获取随机盐
  const { randomSalt } = await getRandomSalt();

  // 2. 加密密码：SHA256(原密码 + 固定盐 + 随机盐)
  const encryptedPassword = await encryptLoginPassword(plainPassword, randomSalt);
  console.log("测试"+plainPassword);
  console.log(randomSalt);
  console.log(encryptedPassword);
  // 3. 构建登录请求
  const deviceId = getDeviceId();
  const requestBody: LoginRequest = {
    email,
    password: encryptedPassword,
    randomSalt,
    deviceId,
  };

  // 4. 发起登录请求
  const response = await apiPost<AuthResponse>(AUTH_ENDPOINTS.LOGIN, requestBody);
  const authData = response.data;

  // 5. 保存认证信息到 LocalStorage
  saveAuthTokens(
    authData.accessToken,
    authData.refreshToken,
    authData.accessTokenExpiresAt,
    authData.refreshTokenExpiresAt,
    {
      encryptedUserId: authData.encryptedUserId,
      username: authData.username,
      maskedEmail: authData.maskedEmail,
    }
  );

  return authData;
}

/**
 * 用户登出
 * POST /api/web-auth/logout
 */
export async function logout(): Promise<void> {
  try {
    await apiPost(AUTH_ENDPOINTS.LOGOUT, {}, { requiresAuth: true });
  } catch (error) {
    console.error('Logout API call failed:', error);
  } finally {
    // 无论 API 调用是否成功，都清除本地认证信息
    clearAuthTokens();
  }
}

/**
 * 获取当前用户信息
 * GET /api/web-auth/me
 */
export async function getCurrentUser(): Promise<{
  encryptedUserId: string;
  username: string;
  maskedEmail: string;
  emailVerified: boolean;
  active: boolean;
  createTime: string;
  lastLoginTime: string;
}> {
  const response = await apiGet(AUTH_ENDPOINTS.ME, { requiresAuth: true });
  return response.data;
}

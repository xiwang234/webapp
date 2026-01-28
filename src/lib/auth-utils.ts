/**
 * 认证工具
 * 提供 Token 管理、设备 ID 生成等功能
 */

import { AuthState } from '@/types/auth';
import { STORAGE_KEYS, TOKEN_REFRESH_BUFFER_MS } from '@/config/api';

/**
 * 生成或获取设备 ID
 * @returns 设备 ID
 */
export function getDeviceId(): string {
  if (typeof window === 'undefined') {
    return '';
  }

  let deviceId = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);

  if (!deviceId) {
    // 生成新的设备 ID：时间戳 + 随机数
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(STORAGE_KEYS.DEVICE_ID, deviceId);
  }

  return deviceId;
}

/**
 * 保存认证信息到 LocalStorage
 * @param accessToken 访问令牌
 * @param refreshToken 刷新令牌
 * @param accessTokenExpiresAt 访问令牌过期时间
 * @param refreshTokenExpiresAt 刷新令牌过期时间
 * @param userInfo 用户信息
 */
export function saveAuthTokens(
  accessToken: string,
  refreshToken: string,
  accessTokenExpiresAt: number,
  refreshTokenExpiresAt: number,
  userInfo: {
    encryptedUserId: string;
    username: string;
    maskedEmail: string;
  }
): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT, accessTokenExpiresAt.toString());
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN_EXPIRES_AT, refreshTokenExpiresAt.toString());
  localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
}

/**
 * 获取访问令牌
 * @returns 访问令牌或 null
 */
export function getAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

/**
 * 获取刷新令牌
 * @returns 刷新令牌或 null
 */
export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

/**
 * 获取访问令牌过期时间
 * @returns 过期时间戳或 null
 */
export function getAccessTokenExpiresAt(): number | null {
  if (typeof window === 'undefined') {
    return null;
  }
  const expiresAt = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT);
  return expiresAt ? parseInt(expiresAt, 10) : null;
}

/**
 * 检查访问令牌是否即将过期（提前 1 分钟）
 * @returns 是否即将过期
 */
export function isAccessTokenExpiringSoon(): boolean {
  const expiresAt = getAccessTokenExpiresAt();
  if (!expiresAt) {
    return true;
  }

  const now = Date.now();
  const bufferTime = TOKEN_REFRESH_BUFFER_MS;
  return now >= expiresAt - bufferTime;
}

/**
 * 检查刷新令牌是否过期
 * @returns 是否过期
 */
export function isRefreshTokenExpired(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  const expiresAt = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN_EXPIRES_AT);
  if (!expiresAt) {
    return true;
  }

  const now = Date.now();
  return now >= parseInt(expiresAt, 10);
}

/**
 * 获取当前认证状态
 * @returns 认证状态
 */
export function getAuthState(): AuthState {
  if (typeof window === 'undefined') {
    return {
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresAt: null,
      refreshTokenExpiresAt: null,
      user: null,
    };
  }

  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  const accessTokenExpiresAt = getAccessTokenExpiresAt();
  const refreshTokenExpiresAtStr = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN_EXPIRES_AT);
  const userInfoStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);

  const isAuthenticated = !!(
    accessToken &&
    refreshToken &&
    !isRefreshTokenExpired()
  );

  return {
    isAuthenticated,
    accessToken,
    refreshToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt: refreshTokenExpiresAtStr ? parseInt(refreshTokenExpiresAtStr, 10) : null,
    user: userInfoStr ? JSON.parse(userInfoStr) : null,
  };
}

/**
 * 清除认证信息
 */
export function clearAuthTokens(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN_EXPIRES_AT);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN_EXPIRES_AT);
  localStorage.removeItem(STORAGE_KEYS.USER_INFO);
}

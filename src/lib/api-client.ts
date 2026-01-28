/**
 * API 客户端
 * 提供统一的 HTTP 请求封装，支持：
 * 1. 自动添加签名头部
 * 2. 自动添加 Authorization 头部
 * 3. 自动刷新过期的 accessToken
 * 4. 统一错误处理
 */

import { generateSignatureHeaders } from './signature';
import {
  getAccessToken,
  getRefreshToken,
  getDeviceId,
  isAccessTokenExpiringSoon,
  saveAuthTokens,
  clearAuthTokens,
} from './auth-utils';
import type { ApiResponse, AuthResponse, RefreshTokenRequest } from '@/types/auth';
import { API_BASE_URL, AUTH_ENDPOINTS } from '@/config/api';

// 是否正在刷新 token 的标志
let isRefreshing = false;
// 等待刷新完成的请求队列
let refreshSubscribers: Array<(token: string) => void> = [];

/**
 * 订阅 token 刷新完成事件
 */
function subscribeTokenRefresh(callback: (token: string) => void): void {
  refreshSubscribers.push(callback);
}

/**
 * 通知所有订阅者 token 刷新完成
 */
function onTokenRefreshed(token: string): void {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

/**
 * 刷新 accessToken
 */
async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  const deviceId = getDeviceId();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const requestBody: RefreshTokenRequest = {
    refreshToken,
    deviceId,
  };

  // 生成签名头部
  const signatureHeaders = await generateSignatureHeaders(requestBody);

  const response = await fetch(`${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...signatureHeaders,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    // Token 刷新失败，清除认证信息
    clearAuthTokens();
    throw new Error('Failed to refresh token');
  }

  const result: ApiResponse<AuthResponse> = await response.json();

  if (result.code !== 200 || !result.data) {
    clearAuthTokens();
    throw new Error(result.message || 'Failed to refresh token');
  }

  // 保存新的 token
  const authData = result.data;
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

  return authData.accessToken;
}

/**
 * HTTP 请求配置
 */
interface RequestConfig extends RequestInit {
  requiresAuth?: boolean; // 是否需要认证
  skipSignature?: boolean; // 是否跳过签名
}

/**
 * 发起 HTTP 请求
 * @param url 请求 URL（相对路径或完整路径）
 * @param config 请求配置
 * @returns 响应数据
 */
export async function apiRequest<T = any>(
  url: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    requiresAuth = false,
    skipSignature = false,
    headers = {},
    body,
    ...restConfig
  } = config;

  // 构建完整 URL
  const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;

  console.log('[API Client] request:', { url, fullUrl, method: config.method || 'GET', API_BASE_URL });

  // 准备请求头
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers as Record<string, string>,
  };

  // 添加签名头部（除非明确跳过）
  if (!skipSignature) {
    const bodyData = body ? (typeof body === 'string' ? JSON.parse(body) : body) : undefined;
    const signatureHeaders = await generateSignatureHeaders(bodyData);
    Object.assign(requestHeaders, signatureHeaders);
  }

  // 添加认证头部
  if (requiresAuth) {
    let accessToken = getAccessToken();

    // 检查 token 是否即将过期
    if (accessToken && isAccessTokenExpiringSoon()) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          accessToken = await refreshAccessToken();
          onTokenRefreshed(accessToken);
        } catch (error) {
          isRefreshing = false;
          throw error;
        } finally {
          isRefreshing = false;
        }
      } else {
        // 如果正在刷新，等待刷新完成
        accessToken = await new Promise<string>((resolve) => {
          subscribeTokenRefresh(resolve);
        });
      }
    }

    if (accessToken) {
      requestHeaders['Authorization'] = `Bearer ${accessToken}`;
    } else {
      throw new Error('No access token available');
    }
  }

  // 发起请求
  const response = await fetch(fullUrl, {
    ...restConfig,
    headers: requestHeaders,
    body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : undefined,
  });

  // 解析响应
  const result: ApiResponse<T> = await response.json();

  // 处理错误
  if (!response.ok || result.code !== 200) {
    throw new Error(result.message || `Request failed with status ${response.status}`);
  }

  return result;
}

/**
 * GET 请求
 */
export async function apiGet<T = any>(
  url: string,
  config: Omit<RequestConfig, 'method' | 'body'> = {}
): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, { ...config, method: 'GET' });
}

/**
 * POST 请求
 */
export async function apiPost<T = any>(
  url: string,
  body?: any,
  config: Omit<RequestConfig, 'method' | 'body'> = {}
): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, { ...config, method: 'POST', body });
}

/**
 * PUT 请求
 */
export async function apiPut<T = any>(
  url: string,
  body?: any,
  config: Omit<RequestConfig, 'method' | 'body'> = {}
): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, { ...config, method: 'PUT', body });
}

/**
 * DELETE 请求
 */
export async function apiDelete<T = any>(
  url: string,
  config: Omit<RequestConfig, 'method' | 'body'> = {}
): Promise<ApiResponse<T>> {
  return apiRequest<T>(url, { ...config, method: 'DELETE' });
}

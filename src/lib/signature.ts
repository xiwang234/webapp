/**
 * API 请求签名工具
 * 用于生成和验证 API 请求签名
 *
 * 签名规则（与后端 SignatureUtil 一致）：
 * 1. 将所有业务参数（body 中的参数）+ timestamp + nonce 合并
 * 2. 按 key 的字母顺序排序
 * 3. 拼接成 key1=value1&key2=value2&... 格式
 * 4. 最后直接拼接签名密钥（不带 & 符号）
 * 5. 对整个字符串进行 SHA256 加密
 *
 * 示例：
 * params = {email: "test@a.com", password: "xxx", deviceId: "yyy", randomSalt: "zzz"}
 * timestamp = 1769595637202
 * nonce = "OCInXDpEcmTNi7o1VHCundNuo4k5kyzh"
 *
 * signSource = "deviceId=yyy&email=test@a.com&nonce=OCInXDpEcmTNi7o1VHCundNuo4k5kyzh&password=xxx&randomSalt=zzz&timestamp=1769595637202szbz-api-sign-key-2026"
 * signature = SHA256(signSource)
 */

import { sha256 } from './crypto';
import { API_SIGN_KEY, SIGN_VALIDITY_MS } from '@/config/api';

/**
 * 生成 API 请求签名
 * @param params 业务参数对象
 * @param timestamp 时间戳（毫秒）
 * @param nonce 随机字符串
 * @returns 签名字符串
 */
export async function generateSignature(
  params: Record<string, any>,
  timestamp: number,
  nonce: string
): Promise<string> {
  // 1. 合并所有参数（业务参数 + timestamp + nonce）
  const allParams: Record<string, string> = {
    ...flattenObject(params),
    timestamp: timestamp.toString(),
    nonce: nonce,
  };

  // 2. 过滤空值参数
  const filteredParams: Record<string, string> = {};
  for (const [key, value] of Object.entries(allParams)) {
    if (value !== null && value !== undefined && value !== '') {
      filteredParams[key] = value;
    }
  }

  // 3. 按 key 的字母顺序排序
  const sortedKeys = Object.keys(filteredParams).sort();

  // 4. 拼接参数字符串：key1=value1&key2=value2&...
  const paramString = sortedKeys
    .map(key => `${key}=${filteredParams[key]}`)
    .join('&');

  // 5. 拼接签名源字符串：参数字符串 + 密钥（直接拼接，不带 & ）
  const signSource = paramString + API_SIGN_KEY;

  // 调试日志（开发环境）
  if (process.env.NODE_ENV === 'development') {
    console.log('[Signature] params:', params);
    console.log('[Signature] timestamp:', timestamp);
    console.log('[Signature] nonce:', nonce);
    console.log('[Signature] sortedKeys:', sortedKeys);
    console.log('[Signature] paramString:', paramString);
    console.log('[Signature] signSource:', signSource);
  }

  // 6. SHA256 加密
  const signature = await sha256(signSource);

  if (process.env.NODE_ENV === 'development') {
    console.log('[Signature] signature:', signature);
  }

  return signature;
}

/**
 * 将嵌套对象展平为一层键值对
 * 例如：{user: {name: 'John', age: 30}} -> {'user.name': 'John', 'user.age': '30'}
 * @param obj 待展平的对象
 * @param prefix 键名前缀
 * @returns 展平后的对象
 */
function flattenObject(
  obj: Record<string, any>,
  prefix: string = ''
): Record<string, string> {
  const result: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value === null || value === undefined) {
      continue;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      // 递归处理嵌套对象
      Object.assign(result, flattenObject(value, fullKey));
    } else if (Array.isArray(value)) {
      // 数组转换为 JSON 字符串
      result[fullKey] = JSON.stringify(value);
    } else {
      // 基本类型直接转字符串
      result[fullKey] = String(value);
    }
  }

  return result;
}

/**
 * 生成随机 nonce 字符串
 * @param length 长度（默认32位）
 * @returns 随机字符串
 */
export function generateNonce(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }

  return result;
}

/**
 * 检查时间戳是否在有效期内
 * @param timestamp 时间戳（毫秒）
 * @returns 是否有效
 */
export function isTimestampValid(timestamp: number): boolean {
  const now = Date.now();
  return Math.abs(now - timestamp) <= SIGN_VALIDITY_MS;
}

/**
 * 生成请求签名头部
 * @param body 请求体对象（不是字符串）
 * @returns 包含签名的头部对象
 */
export async function generateSignatureHeaders(body?: any): Promise<{
  'X-Timestamp': string;
  'X-Nonce': string;
  'X-Signature': string;
}> {
  const timestamp = Date.now();
  const nonce = generateNonce();

  // 如果没有 body，使用空对象
  const params = body || {};

  // 生成签名（传入业务参数对象，而不是 JSON 字符串）
  const signature = await generateSignature(params, timestamp, nonce);

  return {
    'X-Timestamp': timestamp.toString(),
    'X-Nonce': nonce,
    'X-Signature': signature,
  };
}

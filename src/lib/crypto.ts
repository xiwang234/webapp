/**
 * 加密工具
 * 提供 SHA256 加密功能
 */

import { FIXED_SALT } from '@/config/api';

/**
 * SHA256 加密
 * @param data 待加密的字符串
 * @returns 加密后的十六进制字符串
 */
export async function sha256(data: string): Promise<string> {
  // 将字符串转换为 Uint8Array
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  // 使用 Web Crypto API 进行 SHA-256 加密
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

  // 将 ArrayBuffer 转换为十六进制字符串
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

/**
 * 加密注册密码
 * @param plainPassword 明文密码
 * @returns SHA256(原密码 + 固定盐)
 */
export async function encryptRegisterPassword(plainPassword: string): Promise<string> {
  return sha256(plainPassword + FIXED_SALT);
}

/**
 * 加密登录密码
 * @param plainPassword 明文密码
 * @param randomSalt 随机盐
 * @returns SHA256(SHA256(原密码 + 固定盐) + 随机盐)
 *
 * 登录密码加密分两步（与后端 AuthService 一致）：
 * 1. 第一步：SHA256(原密码 + 固定盐) - 得到数据库中存储的密码哈希
 * 2. 第二步：SHA256(第一步的结果 + 随机盐) - 得到最终发送的密码
 */
export async function encryptLoginPassword(
  plainPassword: string,
  randomSalt: string
): Promise<string> {
  // 第一步：SHA256(原密码 + 固定盐) - 与数据库中存储的密码一致
  const firstHash = await sha256(plainPassword + FIXED_SALT);

  // 第二步：SHA256(第一步的哈希 + 随机盐)
  const finalHash = await sha256(firstHash + randomSalt);

  return finalHash;
}

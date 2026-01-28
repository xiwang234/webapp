/**
 * 认证演示组件
 * 展示如何使用后端认证接口
 */

'use client';

import { useState } from 'react';
import { login, register, logout, getCurrentUser } from '@/services/auth-service';
import { getAuthState } from '@/lib/auth-utils';
import { apiPost } from '@/lib/api-client';
import { AUTH_ENDPOINTS } from '@/config/api';

export default function AuthDemo() {
  // 登录状态
  const [authState, setAuthState] = useState(getAuthState());

  // 表单状态
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // UI 状态
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 刷新认证状态
  const refreshAuthState = () => {
    setAuthState(getAuthState());
  };

  // 处理登录
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const authData = await login(loginEmail, loginPassword);
      setMessage(`登录成功！欢迎 ${authData.username}`);
      refreshAuthState();
      setLoginEmail('');
      setLoginPassword('');
    } catch (err: any) {
      setError(`登录失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 处理注册
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const msg = await register(registerUsername, registerEmail, registerPassword);
      setMessage(msg);
      setRegisterUsername('');
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (err: any) {
      setError(`注册失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 处理登出
  const handleLogout = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await logout();
      setMessage('登出成功');
      refreshAuthState();
    } catch (err: any) {
      setError(`登出失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 获取用户信息
  const handleGetUserInfo = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const userInfo = await getCurrentUser();
      setMessage(`用户信息: ${JSON.stringify(userInfo, null, 2)}`);
    } catch (err: any) {
      setError(`获取用户信息失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 测试受保护的接口
  const handleTestProtectedAPI = async () => {
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await apiPost(
        AUTH_ENDPOINTS.LIFE_AI,
        {
          background: '我是一名35岁的软件工程师，目前在一家中型互联网公司工作。',
          question: '我应该跳槽到大厂吗？',
          birthYear: 1989,
          gender: '男',
          category: 'career',
        },
        { requiresAuth: true }
      );
      setMessage(`API 调用成功: ${JSON.stringify(response.data, null, 2)}`);
    } catch (err: any) {
      setError(`API 调用失败: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>后端认证接口演示</h1>

      {/* 认证状态显示 */}
      <div style={{
        padding: '15px',
        marginBottom: '20px',
        backgroundColor: authState.isAuthenticated ? '#d4edda' : '#f8d7da',
        borderRadius: '5px'
      }}>
        <h3>当前状态: {authState.isAuthenticated ? '✅ 已登录' : '❌ 未登录'}</h3>
        {authState.isAuthenticated && authState.user && (
          <div>
            <p>用户名: {authState.user.username}</p>
            <p>邮箱: {authState.user.maskedEmail}</p>
            <p>Token 过期时间: {authState.accessTokenExpiresAt ? new Date(authState.accessTokenExpiresAt).toLocaleString() : 'N/A'}</p>
          </div>
        )}
      </div>

      {/* 消息提示 */}
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#d1ecf1',
          borderRadius: '5px',
          whiteSpace: 'pre-wrap'
        }}>
          {message}
        </div>
      )}

      {/* 错误提示 */}
      {error && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: '#f8d7da',
          borderRadius: '5px',
          color: '#721c24'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* 登录表单 */}
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h2>登录</h2>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || authState.isAuthenticated}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {loading ? '处理中...' : '登录'}
            </button>
          </form>
        </div>

        {/* 注册表单 */}
        <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h2>注册</h2>
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                placeholder="Username"
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="Email"
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="Password"
                required
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {loading ? '处理中...' : '注册'}
            </button>
          </form>
        </div>
      </div>

      {/* 操作按钮 */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={handleLogout}
          disabled={loading || !authState.isAuthenticated}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          登出
        </button>

        <button
          onClick={handleGetUserInfo}
          disabled={loading || !authState.isAuthenticated}
          style={{
            padding: '10px 20px',
            backgroundColor: '#17a2b8',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          获取用户信息
        </button>

        <button
          onClick={handleTestProtectedAPI}
          disabled={loading || !authState.isAuthenticated}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          测试受保护的 API
        </button>

        <button
          onClick={refreshAuthState}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          刷新状态
        </button>
      </div>

      {/* 说明文档 */}
      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '5px' }}>
        <h3>使用说明</h3>
        <ol>
          <li>确保后端服务已启动（默认: http://localhost:8080）</li>
          <li>先注册账号，然后使用注册的邮箱和密码登录</li>
          <li>登录成功后，可以测试"获取用户信息"和"测试受保护的 API"功能</li>
          <li>所有密码会自动使用 SHA256 加密，所有请求会自动添加签名</li>
          <li>Token 即将过期时会自动刷新</li>
        </ol>
        <p><strong>技术文档:</strong> 查看 <code>docs/AUTH_INTEGRATION.md</code> 了解详细实现</p>
      </div>
    </div>
  );
}

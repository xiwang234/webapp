# Mock 模式说明文档

## 📋 概述

项目已成功移除 Supabase 依赖，改用 **Mock 数据服务**，方便在开发阶段无需真实后端即可测试所有功能。

---

## ✅ 已完成的改动

### 1. 创建的新文件

#### `src/lib/mockAuth.ts`
- **功能**：模拟用户认证服务
- **提供的方法**：
  - `signUp(email, password, displayName)` - 注册新用户
  - `signIn(email, password)` - 用户登录
  - `getUser(userId)` - 获取用户信息
- **预置账号**：
  - 邮箱：`demo@example.com`
  - 密码：`password123`

#### `src/lib/mockDb.ts`
- **功能**：模拟数据库服务
- **提供的方法**：
  - `profiles.get/upsert/delete` - 用户资料 CRUD
  - `consultations.list/get/create/delete` - 咨询记录 CRUD
- **存储方式**：内存存储（重启服务器后数据会丢失）

### 2. 修改的文件

- ✅ `src/lib/supabase.ts` - 禁用 Supabase，设置为 Mock 模式
- ✅ `src/lib/auth.ts` - 使用 mockAuthService 替代 Supabase Auth
- ✅ `src/components/auth/SignUpForm.tsx` - 使用 mockAuthService 注册
- ✅ `src/app/api/profile/route.ts` - 使用 mockDbService
- ✅ `src/app/api/consultations/route.ts` - 使用 mockDbService
- ✅ `src/app/api/consultations/[id]/route.ts` - 使用 mockDbService

### 3. 移除的依赖

- ❌ `@supabase/supabase-js`
- ❌ `@supabase/auth-helpers-nextjs`

---

## 🚀 使用方法

### 启动项目
\`\`\`bash
npm run dev
\`\`\`

访问：http://localhost:3000

### 测试账号

#### 方式 1：使用预置账号
- 邮箱：`demo@example.com`
- 密码：`password123`

#### 方式 2：注册新账号
1. 点击 "Sign Up"
2. 填写信息（任意邮箱和密码）
3. 注册成功后返回登录页面
4. 使用刚才注册的信息登录

---

## 📊 Mock 数据存储

### 特点
- ✅ 内存存储，快速响应
- ✅ 支持所有 CRUD 操作
- ✅ 数据在服务器重启后清空
- ✅ 多用户隔离（按 user_id）

### 数据结构

#### 用户资料（User Profiles）
\`\`\`typescript
{
  id: string
  user_id: string
  birth_date: string
  birth_time?: string
  timezone?: string
  display_name?: string
  created_at: string
  updated_at: string
}
\`\`\`

#### 咨询记录（Consultations）
\`\`\`typescript
{
  id: string
  user_id: string
  birth_date: string
  birth_time?: string
  timezone?: string
  scene: string
  efficiency_score?: number
  risk_index?: number
  timeline_data?: any
  summary?: string
  action_steps?: string[]
  created_at: string
}
\`\`\`

---

## 🔄 后续迁移到真实后端

当您准备好连接真实后端 API 时，只需要：

### 方法 1：直接替换 Mock 服务
修改以下文件中的实现：
- `src/lib/mockAuth.ts` - 改为调用您的认证 API
- `src/lib/mockDb.ts` - 改为调用您的数据库 API

### 方法 2：创建适配层
1. 创建 `src/lib/apiService.ts`
2. 根据环境变量决定使用 mock 还是真实 API：
\`\`\`typescript
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';
export const authService = USE_MOCK ? mockAuthService : realAuthService;
export const dbService = USE_MOCK ? mockDbService : realDbService;
\`\`\`

---

## 🧪 调试工具

Mock 服务提供了调试方法：

\`\`\`typescript
// 在浏览器控制台或服务器端使用
import { mockAuthService } from '@/lib/mockAuth';
import { mockDbService } from '@/lib/mockDb';

// 查看所有用户
mockAuthService.getAllUsers();

// 查看所有资料
mockDbService.debug.getAllProfiles();

// 查看所有咨询记录
mockDbService.debug.getAllConsultations();

// 清空所有数据
mockDbService.debug.clear();
\`\`\`

---

## ⚠️ 注意事项

1. **数据不持久化**：服务器重启后所有数据清空
2. **密码明文存储**：仅用于开发，生产环境请使用加密
3. **无并发控制**：内存数组不保证并发安全
4. **Google 登录暂不可用**：需要配置真实的 OAuth

---

## 📝 API 路由说明

所有 API 路由保持不变，仍然需要认证：

### 认证相关
- `POST /api/auth/signin` - 登录
- `POST /api/auth/signout` - 登出

### 用户资料
- `GET /api/profile` - 获取资料
- `POST /api/profile` - 创建/更新资料
- `DELETE /api/profile` - 删除资料

### 咨询记录
- `GET /api/consultations` - 获取列表
- `POST /api/consultations` - 创建记录
- `GET /api/consultations/[id]` - 获取单条
- `DELETE /api/consultations/[id]` - 删除记录

---

## 🎉 现在可以做的事

1. ✅ 注册新用户
2. ✅ 登录/登出
3. ✅ 查看所有页面效果
4. ✅ 创建和管理用户资料
5. ✅ 创建和查看咨询记录
6. ✅ 测试完整的用户流程

享受开发吧！🚀

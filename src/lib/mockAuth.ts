// Mock Authentication Service
// 模拟认证服务 - 用于开发测试，无需真实后端

interface MockUser {
  id: string;
  email: string;
  password: string;
  displayName?: string;
  createdAt: string;
}

// 使用全局变量存储用户数据（在 Node.js 进程中持久化）
// @ts-ignore
if (!global.mockUsers) {
  // @ts-ignore
  global.mockUsers = [
    {
      id: 'mock-user-1',
      email: 'demo@example.com',
      password: 'password123',
      displayName: 'Demo User',
      createdAt: new Date().toISOString(),
    },
  ] as MockUser[];
}

// @ts-ignore
const mockUsers: MockUser[] = global.mockUsers;

export const mockAuthService = {
  // 注册新用户
  signUp: async (email: string, password: string, displayName?: string) => {
    // 检查用户是否已存在
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return {
        user: null,
        error: 'User already exists',
      };
    }

    const newUser: MockUser = {
      id: `mock-user-${Date.now()}`,
      email,
      password,
      displayName,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    console.log('✅ User registered:', { email, displayName });
    console.log('📊 Total users:', mockUsers.length);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        user_metadata: {
          display_name: newUser.displayName,
        },
      },
      error: null,
    };
  },

  // 用户登录
  signIn: async (email: string, password: string) => {
    console.log('🔐 Login attempt:', { email, totalUsers: mockUsers.length });
    
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      console.log('❌ Login failed: Invalid credentials');
      return {
        user: null,
        error: { message: 'Invalid email or password' },
      };
    }

    console.log('✅ Login successful:', { email, userId: user.id });

    return {
      user: {
        id: user.id,
        email: user.email,
        user_metadata: {
          display_name: user.displayName,
        },
      },
      error: null,
    };
  },

  // 获取用户信息
  getUser: async (userId: string) => {
    const user = mockUsers.find((u) => u.id === userId);
    
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      user_metadata: {
        display_name: user.displayName,
      },
    };
  },

  // 获取所有用户（调试用）
  getAllUsers: () => {
    return mockUsers.map((u) => ({
      id: u.id,
      email: u.email,
      displayName: u.displayName,
    }));
  },
};

// Mock Database Service
// 模拟数据库服务 - 用于开发测试，无需真实数据库

interface MockUserProfile {
  id: string;
  user_id: string;
  birth_date: string;
  birth_time?: string;
  timezone?: string;
  display_name?: string;
  created_at: string;
  updated_at: string;
}

interface MockConsultation {
  id: string;
  user_id: string;
  birth_date: string;
  birth_time?: string;
  timezone?: string;
  scene: string;
  efficiency_score?: number;
  risk_index?: number;
  timeline_data?: any;
  summary?: string;
  action_steps?: string[];
  created_at: string;
}

// 使用全局变量存储数据（在 Node.js 进程中持久化）
// @ts-ignore
if (!global.mockProfiles) {
  // @ts-ignore
  global.mockProfiles = [] as MockUserProfile[];
}

// @ts-ignore
if (!global.mockConsultations) {
  // @ts-ignore
  global.mockConsultations = [] as MockConsultation[];
}

// @ts-ignore
const mockProfiles: MockUserProfile[] = global.mockProfiles;
// @ts-ignore
const mockConsultations: MockConsultation[] = global.mockConsultations;

export const mockDbService = {
  // ===== User Profiles =====
  profiles: {
    // 获取用户资料
    get: async (userId: string) => {
      const profile = mockProfiles.find((p) => p.user_id === userId);
      return profile || null;
    },

    // 创建或更新用户资料
    upsert: async (userId: string, data: Partial<MockUserProfile>) => {
      const existingIndex = mockProfiles.findIndex((p) => p.user_id === userId);

      if (existingIndex >= 0) {
        // 更新现有资料
        mockProfiles[existingIndex] = {
          ...mockProfiles[existingIndex],
          ...data,
          updated_at: new Date().toISOString(),
        };
        return mockProfiles[existingIndex];
      } else {
        // 创建新资料
        const newProfile: MockUserProfile = {
          id: `profile-${Date.now()}`,
          user_id: userId,
          birth_date: data.birth_date || '',
          birth_time: data.birth_time,
          timezone: data.timezone,
          display_name: data.display_name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        mockProfiles.push(newProfile);
        return newProfile;
      }
    },

    // 删除用户资料
    delete: async (userId: string) => {
      const index = mockProfiles.findIndex((p) => p.user_id === userId);
      if (index >= 0) {
        mockProfiles.splice(index, 1);
        return true;
      }
      return false;
    },
  },

  // ===== Consultations =====
  consultations: {
    // 获取用户的所有咨询记录
    list: async (
      userId: string,
      options?: { limit?: number; offset?: number; scene?: string }
    ) => {
      let filtered = mockConsultations.filter((c) => c.user_id === userId);

      // 按场景筛选
      if (options?.scene) {
        filtered = filtered.filter((c) => c.scene === options.scene);
      }

      // 按创建时间倒序排列
      filtered.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      // 分页
      const offset = options?.offset || 0;
      const limit = options?.limit || 10;
      const paginated = filtered.slice(offset, offset + limit);

      return {
        data: paginated,
        total: filtered.length,
      };
    },

    // 获取单个咨询记录
    get: async (consultationId: string, userId: string) => {
      const consultation = mockConsultations.find(
        (c) => c.id === consultationId && c.user_id === userId
      );
      return consultation || null;
    },

    // 创建新的咨询记录
    create: async (userId: string, data: Omit<MockConsultation, 'id' | 'user_id' | 'created_at'>) => {
      const newConsultation: MockConsultation = {
        id: `consultation-${Date.now()}`,
        user_id: userId,
        ...data,
        created_at: new Date().toISOString(),
      };
      mockConsultations.push(newConsultation);
      return newConsultation;
    },

    // 删除咨询记录
    delete: async (consultationId: string, userId: string) => {
      const index = mockConsultations.findIndex(
        (c) => c.id === consultationId && c.user_id === userId
      );
      if (index >= 0) {
        mockConsultations.splice(index, 1);
        return true;
      }
      return false;
    },
  },

  // 调试方法：获取所有数据
  debug: {
    getAllProfiles: () => mockProfiles,
    getAllConsultations: () => mockConsultations,
    clear: () => {
      mockProfiles.length = 0;
      mockConsultations.length = 0;
    },
  },
};

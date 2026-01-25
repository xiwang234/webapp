// Mock mode enabled - Supabase is disabled
// 使用 Mock 模式，不依赖真实的 Supabase 服务

export const SUPABASE_ENABLED = false;

// Mock Supabase client for type compatibility
// 这些是占位符，不会被实际使用
export const supabase = null as any;
export const supabaseAdmin = null as any;

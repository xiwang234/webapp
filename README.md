# Life Strategy AI - Frontend Implementation

面向海外中产阶级的战略决策AI产品前端实现

## 技术栈

- **Next.js 14** - React框架，支持SSR和优化性能
- **TypeScript** - 类型安全
- **Tailwind CSS** - 极简深色模式设计
- **Framer Motion** - 流畅动画效果
- **Lucide React** - 现代化图标库

## 设计特点

### 1. **极简深色模式（Dark Mode First）**
- 深色背景（`#0f172a` 系）+ 金色强调（`#facc15`）
- 玻璃拟态卡片（glass-card）+ 微妙渐变
- 符合海外高端用户审美

### 2. **四阶段交互流程**

#### Stage 1: Identity Sync（身份同步）
- 录入出生日期、时间、时区
- 星历矩阵动画背景
- 建立专业感和科技感

#### Stage 2: Scenario Selection（场景选择）
- 4个核心场景卡片：
  - High-Stakes Investment（高风险投资）
  - Career Transition（职业转型）
  - Strategic Negotiation（战略谈判）
  - Critical Timing（关键时机）
- 悬停效果 + 渐变图标

#### Stage 3: The Inquiry（推演过程）
- 模拟后台计算过程
- 伪代码滚动显示（消除黑盒焦虑）
- 进度条 + 旋转加载动画

#### Stage 4: Strategy Dashboard（策略仪表板）
- **Efficiency Score（效率分数）** + **Risk Index（风险指数）**
- **Evolution Path（三传时间轴）**：Initial → Middle → Final
- **Executive Summary（执行摘要）**
- **Actionable Steps（可执行步骤）**

### 3. **Mock数据结构**
当前使用前端Mock数据，生产环境应替换为：
\`\`\`typescript
// Java后端排盘计算输出JSON
const calculationResult = {
  scenario: "investment",
  three_transmissions: {
    initial: { branch: "Mao", deity: "Qing-Long", status: "Strong" },
    middle: { branch: "You", deity: "Bai-Hu", status: "Conflict" },
    final: { branch: "Mao", deity: "Qing-Long", status: "Return" }
  }
};

// 传递给Gemini API进行人话翻译
const prompt = `Based on this temporal matrix: ${JSON.stringify(calculationResult)}, 
generate strategic recommendations for ${scenario}`;
\`\`\`

## 快速开始

### 1. 安装依赖
\`\`\`bash
npm install
\`\`\`

### 2. 启动开发服务器
\`\`\`bash
npm run dev
\`\`\`

### 3. 打开浏览器
访问 [http://localhost:3000](http://localhost:3000)

## 项目结构

\`\`\`
tong/
├── src/
│   ├── app/
│   │   ├── globals.css         # 全局样式（深色模式变量）
│   │   ├── layout.tsx          # 根布局
│   │   └── page.tsx            # 主页（流程控制）
│   ├── components/
│   │   ├── IdentitySync.tsx    # 身份同步组件
│   │   ├── ScenarioSelection.tsx # 场景选择组件
│   │   ├── TheInquiry.tsx      # 推演过程组件
│   │   └── StrategyDashboard.tsx # 策略仪表板组件
│   └── lib/
│       └── utils.ts            # 工具函数
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
\`\`\`

## 后端集成方案

### 方案1：API路由（推荐）
在 `src/app/api/analyze/route.ts` 创建API端点：
\`\`\`typescript
export async function POST(request: Request) {
  const { birthDate, birthTime, scenario } = await request.json();
  
  // 1. 调用Java后端排盘接口
  const calculationResult = await fetch('YOUR_JAVA_API/calculate', {
    method: 'POST',
    body: JSON.stringify({ birthDate, birthTime })
  }).then(r => r.json());
  
  // 2. 将结果传递给Gemini API
  const geminiResponse = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent', {
    method: 'POST',
    headers: { 'x-goog-api-key': process.env.GEMINI_API_KEY },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: \`As a strategic consultant, analyze this: \${JSON.stringify(calculationResult)}\`
        }]
      }]
    })
  }).then(r => r.json());
  
  return Response.json({ strategy: geminiResponse });
}
\`\`\`

### 方案2：直连Java API
修改 `TheInquiry.tsx` 中的逻辑，直接调用Java后端：
\`\`\`typescript
const response = await fetch('YOUR_JAVA_API/full-analysis', {
  method: 'POST',
  body: JSON.stringify({ profile, scenario })
});
const data = await response.json();
\`\`\`

## 生产部署

### Vercel（推荐）
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### 自托管
\`\`\`bash
npm run build
npm start
\`\`\`

## 下一步优化建议

1. **后端集成**：连接Java排盘引擎 + Gemini API
2. **支付系统**：集成Stripe订阅（$29/月 或 $79/季度）
3. **身份验证**：NextAuth.js + OAuth（Google/Apple登录）
4. **数据持久化**：保存用户分析历史（可选Supabase/Firebase）
5. **SEO优化**：添加元数据和结构化数据
6. **PWA支持**：添加manifest.json实现类原生体验
7. **国际化**：添加多语言支持（i18next）

## 核心差异化价值

❌ **不卖**："算命"、"占卜"、"神秘主义"  
✅ **卖**："Decision Intelligence"、"战略咨询"、"风险评估"

目标用户：35-55岁海外华人中产阶级，面临高风险决策（投资/职业/创业）

## 许可证

Private - 商业项目

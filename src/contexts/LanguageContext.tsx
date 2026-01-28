'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Common
    'app.title': 'Life Strategy AI',
    'app.subtitle': 'Strategic Intelligence for Life Decisions',
    'common.optional': 'Optional',
    'common.back': 'Back',
    'common.continue': 'Continue',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.confirm': 'Confirm',
    'common.loading': 'Loading...',

    // Landing Page
    'landing.hero.title': 'Strategic Intelligence for Life Decisions',
    'landing.hero.subtitle': 'Transform critical decisions into strategic advantages',
    'landing.hero.cta': 'Start Your Analysis',
    'landing.hero.learnMore': 'Learn More',
    'landing.carousel.title': 'How It Works',
    'landing.carousel.step1.title': 'Enter Your Profile',
    'landing.carousel.step1.desc': 'Provide your birth date, time, and timezone to initialize your temporal matrix',
    'landing.carousel.step2.title': 'Select Your Challenge',
    'landing.carousel.step2.desc': 'Choose from investment, career, negotiation, or timing scenarios',
    'landing.carousel.step3.title': 'Get Strategic Insights',
    'landing.carousel.step3.desc': 'Receive actionable recommendations based on temporal analysis',

    // Navigation
    'nav.home': 'Home',
    'nav.history': 'History',
    'nav.profile': 'Profile',
    'nav.signIn': 'Sign In',
    'nav.signOut': 'Sign Out',

    // Authentication
    'auth.email': 'Email Address',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.displayName': 'Display Name',
    'auth.or': 'or',
    'auth.signin.title': 'Welcome Back',
    'auth.signin.submit': 'Sign In',
    'auth.signin.google': 'Continue with Google',
    'auth.signin.noAccount': "Don't have an account?",
    'auth.signin.link': 'Sign in',
    'auth.signup.title': 'Create Account',
    'auth.signup.submit': 'Sign Up',
    'auth.signup.hasAccount': 'Already have an account?',
    'auth.signup.link': 'Sign up',
    'auth.signup.success': 'Registration successful! Please sign in with your new account.',
    'auth.error.invalidCredentials': 'Invalid email or password',
    'auth.error.passwordMismatch': 'Passwords do not match',
    'auth.error.passwordTooShort': 'Password must be at least 8 characters',
    'auth.error.generic': 'An error occurred. Please try again.',

    // Event Context
    'eventContext.title': 'Describe Your Situation',
    'eventContext.subtitle.investment': "Tell us about the investment opportunity you're considering",
    'eventContext.subtitle.career': "Describe the career transition or decision you're facing",
    'eventContext.subtitle.negotiation': "Explain the negotiation context and what's at stake",
    'eventContext.subtitle.timing': 'What event or decision are you trying to time optimally?',
    'eventContext.description.label': 'Situation Description',
    'eventContext.description.hint': 'Be as specific as possible. Include key details, constraints, and what you hope to achieve.',
    'eventContext.additional.label': 'Additional Context',
    'eventContext.additional.placeholder': 'Any other relevant information, concerns, or specific questions...',
    'eventContext.placeholder.investment': "Example: I'm considering investing $50,000 in a tech startup. The company is pre-revenue but has strong team and IP. I need to decide within 2 weeks...",
    'eventContext.placeholder.career': 'Example: I have two job offers - one at a stable Fortune 500 with good benefits, another at a high-growth startup with equity. Both start in 3 months...',
    'eventContext.placeholder.negotiation': 'Example: Negotiating a partnership deal worth $200K annually. The other party wants exclusivity, but I prefer flexibility. Meeting scheduled for next week...',
    'eventContext.placeholder.timing': 'Example: Planning to launch a new product. Market conditions are favorable now, but competitors are also moving. Should I launch in Q2 or wait for Q3?',

    // History
    'history.title': 'Consultation History',
    'history.subtitle': 'Review your past strategic analyses and insights',
    'history.results': 'consultations',
    'history.view': 'View Details',
    'history.delete': 'Delete',
    'history.confirmDelete': 'Are you sure you want to delete this consultation? This action cannot be undone.',
    'history.backToHistory': 'Back to History',
    'history.filter.all': 'All Scenarios',
    'history.filter.investment': 'Investment',
    'history.filter.career': 'Career',
    'history.filter.negotiation': 'Negotiation',
    'history.filter.timing': 'Timing',
    'history.empty.title': 'No Consultations Yet',
    'history.empty.description': 'Start your first strategic analysis to see your consultation history here.',
    'history.empty.cta': 'Start New Analysis',
    
    // Identity Sync
    'identity.title': 'Life Strategy AI',
    'identity.subtitle': 'Strategic Intelligence for Critical Decisions',
    'identity.heading': 'Identity Sync',
    'identity.description': 'Your temporal coordinates unlock the strategic matrix',
    'identity.birthDate': 'Birth Date',
    'identity.birthDateFormat': 'Format: Y/M/D',
    'identity.birthTime': 'Birth Time',
    'identity.timezone': 'Timezone',
    'identity.timezone.pacific': 'UTC-8 (Pacific)',
    'identity.timezone.eastern': 'UTC-5 (Eastern)',
    'identity.timezone.london': 'UTC+0 (London)',
    'identity.timezone.europe': 'UTC+1 (Central Europe)',
    'identity.timezone.asia': 'UTC+8 (Asia)',
    'identity.timezone.japan': 'UTC+9 (Japan)',
    'identity.submit': 'Initialize Matrix',
    'identity.privacy': 'Your data is processed securely and never stored without consent',
    'identity.footer': 'Powered by advanced temporal logic engine',
    'identity.useSavedProfile': 'Use my saved profile',
    'identity.saveProfile': 'Save this profile for future consultations',
    'identity.saveProfileHint': 'Your birth information will be securely stored and auto-filled next time',
    
    // Scenario Selection
    'scenario.title': 'Select Your Challenge',
    'scenario.subtitle': 'Choose the domain for strategic analysis',
    'scenario.investment.title': 'High-Stakes Investment',
    'scenario.investment.desc': 'Evaluate market entry, M&A, or portfolio rebalancing',
    'scenario.career.title': 'Career Transition',
    'scenario.career.desc': 'Job change, promotion negotiation, or entrepreneurship',
    'scenario.negotiation.title': 'Strategic Negotiation',
    'scenario.negotiation.desc': 'Contract signing, partnership, or conflict resolution',
    'scenario.timing.title': 'Critical Timing',
    'scenario.timing.desc': 'Project launch, relocation, or major life decision',
    'scenario.action': 'Analyze Strategy',
    'scenario.footer': 'Each analysis is uniquely calibrated to your temporal matrix',
    
    // The Inquiry
    'inquiry.title': 'The Inquiry',
    'inquiry.subtitle': 'Computing strategic pathways through the temporal matrix',
    'inquiry.analyzing': 'Analyzing',
    'inquiry.step1': 'Initializing temporal matrix...',
    'inquiry.step2': 'Calculating celestial coordinates...',
    'inquiry.step3': 'Mapping subject-object dynamics...',
    'inquiry.step4': 'Analyzing three transmissions path...',
    'inquiry.step5': 'Evaluating strategic variables...',
    'inquiry.step6': 'Synthesizing decision intelligence...',
    'inquiry.birthDate': 'Birth Date:',
    'inquiry.birthTime': 'Birth Time:',
    'inquiry.timezone': 'Timezone:',
    'inquiry.scenario': 'Scenario:',
    'inquiry.scenario.investment': 'investment',
    'inquiry.scenario.career': 'career',
    'inquiry.scenario.negotiation': 'negotiation',
    'inquiry.scenario.timing': 'timing',
    'inquiry.footer': 'Backend logic engine processing your unique temporal signature',
    
    // Strategy Dashboard
    'dashboard.title': 'Strategy Dashboard',
    'dashboard.subtitle.investment': 'Investment Analysis Complete',
    'dashboard.subtitle.career': 'Career Analysis Complete',
    'dashboard.subtitle.negotiation': 'Negotiation Analysis Complete',
    'dashboard.subtitle.timing': 'Timing Analysis Complete',
    'dashboard.efficiency': 'Efficiency Score',
    'dashboard.risk': 'Risk Index',
    'dashboard.evolution': 'Evolution Path',
    'dashboard.phase.initial': 'Initial',
    'dashboard.phase.middle': 'Middle',
    'dashboard.phase.final': 'Final',
    'dashboard.summary': 'Executive Summary',
    'dashboard.actions': 'Actionable Steps',
    'dashboard.newAnalysis': 'New Analysis',
    'dashboard.export': 'Export Report',
    'dashboard.footer': 'Strategic intelligence generated by temporal logic engine + AI synthesis',
    
    // Strategy Content (Investment)
    'strategy.investment.timeline.initial.status': 'Strong Growth Signal',
    'strategy.investment.timeline.initial.deity': 'Qing-Long (Capital)',
    'strategy.investment.timeline.middle.status': 'Competitive Pressure',
    'strategy.investment.timeline.middle.deity': 'Bai-Hu (Force)',
    'strategy.investment.timeline.final.status': 'Return to Growth',
    'strategy.investment.timeline.final.deity': 'Qing-Long (Capital)',
    'strategy.investment.summary': 'The temporal matrix indicates a favorable window for capital deployment. Initial momentum is strong, supported by positive market alignment. Mid-phase turbulence is expected due to competitive dynamics, but structural advantages position you for recovery.',
    'strategy.investment.action1': 'Execute entry within 72 hours to capture peak momentum',
    'strategy.investment.action2': 'Allocate 30% reserve for mid-phase volatility hedge',
    'strategy.investment.action3': 'Set profit-taking threshold at 85% efficiency score',
    'strategy.investment.action4': 'Monitor for competitive signal reversal in weeks 8-10',
    
    // Strategy Content (Career)
    'strategy.career.timeline.initial.status': 'Hidden Opportunity',
    'strategy.career.timeline.initial.deity': 'Tian-Kong (Void)',
    'strategy.career.timeline.middle.status': 'Power Alignment',
    'strategy.career.timeline.middle.deity': 'Gou-Chen (Authority)',
    'strategy.career.timeline.final.status': 'Stable Foundation',
    'strategy.career.timeline.final.deity': 'Teng-She (Structure)',
    'strategy.career.summary': 'Career transition shows moderate strategic advantage with patience required. Initial phase reveals non-obvious opportunities requiring deeper exploration. Authority alignment emerges mid-cycle, creating negotiation leverage.',
    'strategy.career.action1': 'Research 3-5 unconventional pathways before committing',
    'strategy.career.action2': 'Schedule critical conversations during weeks 4-6',
    'strategy.career.action3': 'Document achievements for leverage in negotiations',
    'strategy.career.action4': 'Build strategic relationships with decision-makers',
    
    // Strategy Content (Negotiation)
    'strategy.negotiation.timeline.initial.status': 'Mutual Benefit Signal',
    'strategy.negotiation.timeline.initial.deity': 'Tai-Yin (Harmony)',
    'strategy.negotiation.timeline.middle.status': 'Strategic Clarity',
    'strategy.negotiation.timeline.middle.deity': 'Tian-Hou (Nobility)',
    'strategy.negotiation.timeline.final.status': 'Sustainable Win-Win',
    'strategy.negotiation.timeline.final.deity': 'Liu-He (Alliance)',
    'strategy.negotiation.summary': 'Negotiation matrix shows exceptional alignment for mutually beneficial outcomes. Harmony indicators suggest counterparty shares strategic interests. High probability of sustainable partnership formation.',
    'strategy.negotiation.action1': 'Lead with collaborative framing in opening statements',
    'strategy.negotiation.action2': 'Propose tiered value-exchange structure',
    'strategy.negotiation.action3': 'Schedule final agreement signing within 10-day window',
    'strategy.negotiation.action4': 'Build long-term relationship mechanisms into contract',
    
    // Strategy Content (Timing)
    'strategy.timing.timeline.initial.status': 'Premature Launch Risk',
    'strategy.timing.timeline.initial.deity': 'Zhu-Que (Speed)',
    'strategy.timing.timeline.middle.status': 'Resource Consolidation',
    'strategy.timing.timeline.middle.deity': 'Gou-Chen (Control)',
    'strategy.timing.timeline.final.status': 'Optimal Execution Window',
    'strategy.timing.timeline.final.deity': 'Qing-Long (Success)',
    'strategy.timing.summary': 'Timing analysis reveals patience will yield superior outcomes. Initial impulse to act should be resisted. Mid-phase requires resource preparation and stakeholder alignment before final execution window opens.',
    'strategy.timing.action1': 'Delay launch by 2-3 weeks from original plan',
    'strategy.timing.action2': 'Use initial phase for stress-testing and preparation',
    'strategy.timing.action3': 'Consolidate resources and team alignment mid-cycle',
    'strategy.timing.action4': 'Execute during final window for maximum impact',
  },
  zh: {
    // Common
    'app.title': '人生策略AI',
    'app.subtitle': '关键决策的战略智能',
    'common.optional': '可选',
    'common.back': '返回',
    'common.continue': '继续',
    'common.save': '保存',
    'common.cancel': '取消',
    'common.delete': '删除',
    'common.confirm': '确认',
    'common.loading': '加载中...',

    // Landing Page
    'landing.hero.title': '为人生决策提供战略智能',
    'landing.hero.subtitle': '将关键决策转化为战略优势',
    'landing.hero.cta': '开始分析',
    'landing.hero.learnMore': '了解更多',
    'landing.carousel.title': '如何使用',
    'landing.carousel.step1.title': '输入您的资料',
    'landing.carousel.step1.desc': '提供您的出生日期、时间和时区以初始化您的时间矩阵',
    'landing.carousel.step2.title': '选择您的挑战',
    'landing.carousel.step2.desc': '从投资、职业、谈判或时机场景中选择',
    'landing.carousel.step3.title': '获取战略洞察',
    'landing.carousel.step3.desc': '基于时间分析获得可执行的建议',

    // Navigation
    'nav.home': '首页',
    'nav.history': '历史记录',
    'nav.profile': '个人资料',
    'nav.signIn': '登录',
    'nav.signOut': '退出',

    // Authentication
    'auth.email': '电子邮箱',
    'auth.password': '密码',
    'auth.confirmPassword': '确认密码',
    'auth.displayName': '显示名称',
    'auth.or': '或',
    'auth.signin.title': '欢迎回来',
    'auth.signin.submit': '登录',
    'auth.signin.google': '使用 Google 继续',
    'auth.signin.noAccount': '还没有账户？',
    'auth.signin.link': '登录',
    'auth.signup.title': '创建账户',
    'auth.signup.submit': '注册',
    'auth.signup.hasAccount': '已有账户？',
    'auth.signup.link': '注册',
    'auth.signup.success': '注册成功！请使用您的新账户登录。',
    'auth.error.invalidCredentials': '邮箱或密码无效',
    'auth.error.passwordMismatch': '密码不匹配',
    'auth.error.passwordTooShort': '密码至少需要8个字符',
    'auth.error.generic': '发生错误，请重试',

    // Event Context
    'eventContext.title': '描述您的情况',
    'eventContext.subtitle.investment': '告诉我们您正在考虑的投资机会',
    'eventContext.subtitle.career': '描述您面临的职业转型或决策',
    'eventContext.subtitle.negotiation': '解释谈判背景和利害关系',
    'eventContext.subtitle.timing': '您想要优化时机的事件或决策是什么？',
    'eventContext.description.label': '情况描述',
    'eventContext.description.hint': '请尽可能具体。包括关键细节、约束条件以及您希望实现的目标。',
    'eventContext.additional.label': '补充信息',
    'eventContext.additional.placeholder': '任何其他相关信息、顾虑或具体问题...',
    'eventContext.placeholder.investment': '示例：我正在考虑向一家科技初创公司投资5万美元。该公司尚未盈利，但拥有强大的团队和知识产权。我需要在两周内做出决定...',
    'eventContext.placeholder.career': '示例：我有两个工作机会 - 一个是稳定的世界500强公司，福利好；另一个是高增长初创公司，有股权。两者都在3个月后开始...',
    'eventContext.placeholder.negotiation': '示例：正在谈判一项年价值20万美元的合作协议。对方要求独家合作，但我更倾向于灵活性。会议定于下周...',
    'eventContext.placeholder.timing': '示例：计划推出新产品。目前市场条件有利，但竞争对手也在行动。应该在第二季度推出还是等到第三季度？',

    // History
    'history.title': '咨询历史',
    'history.subtitle': '查看您过去的战略分析和见解',
    'history.results': '次咨询',
    'history.view': '查看详情',
    'history.delete': '删除',
    'history.confirmDelete': '确定要删除此咨询记录吗？此操作无法撤销。',
    'history.backToHistory': '返回历史记录',
    'history.filter.all': '所有场景',
    'history.filter.investment': '投资',
    'history.filter.career': '职业',
    'history.filter.negotiation': '谈判',
    'history.filter.timing': '时机',
    'history.empty.title': '暂无咨询记录',
    'history.empty.description': '开始您的第一次战略分析，在此查看咨询历史。',
    'history.empty.cta': '开始新分析',
    
    // Identity Sync
    'identity.title': '人生策略AI',
    'identity.subtitle': '为关键决策提供战略智能',
    'identity.heading': '身份同步',
    'identity.description': '您的时间坐标将解锁战略矩阵',
    'identity.birthDate': '出生日期',
    'identity.birthDateFormat': '格式：年/月/日',
    'identity.birthTime': '出生时间',
    'identity.timezone': '时区',
    'identity.timezone.pacific': 'UTC-8 (太平洋时区)',
    'identity.timezone.eastern': 'UTC-5 (东部时区)',
    'identity.timezone.london': 'UTC+0 (伦敦)',
    'identity.timezone.europe': 'UTC+1 (中欧)',
    'identity.timezone.asia': 'UTC+8 (亚洲)',
    'identity.timezone.japan': 'UTC+9 (日本)',
    'identity.submit': '初始化矩阵',
    'identity.privacy': '您的数据经过安全处理，未经同意绝不存储',
    'identity.footer': '由先进的时间逻辑引擎驱动',
    'identity.useSavedProfile': '使用我保存的资料',
    'identity.saveProfile': '保存此资料以供将来咨询使用',
    'identity.saveProfileHint': '您的出生信息将被安全存储，下次自动填充',
    
    // Scenario Selection
    'scenario.title': '选择您的挑战',
    'scenario.subtitle': '选择战略分析领域',
    'scenario.investment.title': '高风险投资',
    'scenario.investment.desc': '评估市场进入、并购或投资组合调整',
    'scenario.career.title': '职业转型',
    'scenario.career.desc': '工作变动、晋升谈判或创业',
    'scenario.negotiation.title': '战略谈判',
    'scenario.negotiation.desc': '合同签署、合作伙伴关系或冲突解决',
    'scenario.timing.title': '关键时机',
    'scenario.timing.desc': '项目启动、搬迁或重大人生决策',
    'scenario.action': '分析策略',
    'scenario.footer': '每次分析都根据您的时间矩阵进行独特校准',
    
    // The Inquiry
    'inquiry.title': '策略推演',
    'inquiry.subtitle': '通过时间矩阵计算战略路径',
    'inquiry.analyzing': '分析中',
    'inquiry.step1': '初始化时间矩阵...',
    'inquiry.step2': '计算天体坐标...',
    'inquiry.step3': '映射主客体动态...',
    'inquiry.step4': '分析三传路径...',
    'inquiry.step5': '评估战略变量...',
    'inquiry.step6': '综合决策智能...',
    'inquiry.birthDate': '出生日期：',
    'inquiry.birthTime': '出生时间：',
    'inquiry.timezone': '时区：',
    'inquiry.scenario': '场景：',
    'inquiry.scenario.investment': '投资',
    'inquiry.scenario.career': '职业',
    'inquiry.scenario.negotiation': '谈判',
    'inquiry.scenario.timing': '时机',
    'inquiry.footer': '后端逻辑引擎正在处理您的独特时间签名',
    
    // Strategy Dashboard
    'dashboard.title': '策略仪表板',
    'dashboard.subtitle.investment': '投资分析完成',
    'dashboard.subtitle.career': '职业分析完成',
    'dashboard.subtitle.negotiation': '谈判分析完成',
    'dashboard.subtitle.timing': '时机分析完成',
    'dashboard.efficiency': '效率评分',
    'dashboard.risk': '风险指数',
    'dashboard.evolution': '演化路径',
    'dashboard.phase.initial': '初期',
    'dashboard.phase.middle': '中期',
    'dashboard.phase.final': '末期',
    'dashboard.summary': '执行摘要',
    'dashboard.actions': '可执行步骤',
    'dashboard.newAnalysis': '新分析',
    'dashboard.export': '导出报告',
    'dashboard.footer': '由时间逻辑引擎 + AI综合生成的战略智能',
    
    // Strategy Content (Investment)
    'strategy.investment.timeline.initial.status': '强劲增长信号',
    'strategy.investment.timeline.initial.deity': '青龙（资本）',
    'strategy.investment.timeline.middle.status': '竞争压力',
    'strategy.investment.timeline.middle.deity': '白虎（力量）',
    'strategy.investment.timeline.final.status': '回归增长',
    'strategy.investment.timeline.final.deity': '青龙（资本）',
    'strategy.investment.summary': '时间矩阵显示资本部署的有利窗口。初期势头强劲，得到积极的市场协调支持。由于竞争动态，预计中期会出现动荡，但结构性优势使您能够恢复。',
    'strategy.investment.action1': '在72小时内执行入场以捕捉峰值动量',
    'strategy.investment.action2': '分配30%储备金用于中期波动对冲',
    'strategy.investment.action3': '将获利门槛设定在85%效率评分',
    'strategy.investment.action4': '监控第8-10周的竞争信号反转',
    
    // Strategy Content (Career)
    'strategy.career.timeline.initial.status': '隐藏机会',
    'strategy.career.timeline.initial.deity': '天空（虚空）',
    'strategy.career.timeline.middle.status': '权力协调',
    'strategy.career.timeline.middle.deity': '勾陈（权威）',
    'strategy.career.timeline.final.status': '稳定基础',
    'strategy.career.timeline.final.deity': '螣蛇（结构）',
    'strategy.career.summary': '职业转型显示出适度的战略优势，需要耐心。初期阶段揭示了需要深入探索的非显而易见的机会。权威协调在中期出现，创造谈判杠杆。',
    'strategy.career.action1': '在承诺之前研究3-5条非常规路径',
    'strategy.career.action2': '在第4-6周安排关键对话',
    'strategy.career.action3': '记录成就以在谈判中获得杠杆',
    'strategy.career.action4': '与决策者建立战略关系',
    
    // Strategy Content (Negotiation)
    'strategy.negotiation.timeline.initial.status': '互惠信号',
    'strategy.negotiation.timeline.initial.deity': '太阴（和谐）',
    'strategy.negotiation.timeline.middle.status': '战略清晰',
    'strategy.negotiation.timeline.middle.deity': '天后（高贵）',
    'strategy.negotiation.timeline.final.status': '可持续双赢',
    'strategy.negotiation.timeline.final.deity': '六合（联盟）',
    'strategy.negotiation.summary': '谈判矩阵显示互惠结果的卓越协调。和谐指标表明对方共享战略利益。形成可持续伙伴关系的高概率。',
    'strategy.negotiation.action1': '在开场陈述中以协作框架为主导',
    'strategy.negotiation.action2': '提出分层价值交换结构',
    'strategy.negotiation.action3': '在10天窗口内安排最终协议签署',
    'strategy.negotiation.action4': '在合同中建立长期关系机制',
    
    // Strategy Content (Timing)
    'strategy.timing.timeline.initial.status': '过早启动风险',
    'strategy.timing.timeline.initial.deity': '朱雀（速度）',
    'strategy.timing.timeline.middle.status': '资源整合',
    'strategy.timing.timeline.middle.deity': '勾陈（控制）',
    'strategy.timing.timeline.final.status': '最佳执行窗口',
    'strategy.timing.timeline.final.deity': '青龙（成功）',
    'strategy.timing.summary': '时机分析表明耐心将产生更优结果。应该抵制最初的行动冲动。中期需要资源准备和利益相关者协调，然后最终执行窗口打开。',
    'strategy.timing.action1': '从原计划延迟2-3周启动',
    'strategy.timing.action2': '利用初期阶段进行压力测试和准备',
    'strategy.timing.action3': '在中期整合资源和团队协调',
    'strategy.timing.action4': '在最终窗口执行以获得最大影响',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

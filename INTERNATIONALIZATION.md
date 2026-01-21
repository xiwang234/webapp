# 国际化功能说明

## ✅ 已实现功能

### 1. 语言切换器（右上角）
- 位置：固定在右上角
- 支持语言：英文（EN）、中文（中文）
- 默认语言：英文（English）
- 样式：玻璃拟态效果 + 金色高亮选中状态

### 2. 全局状态管理
- 使用 React Context API
- 语言状态在所有页面间共享
- 切换语言后立即生效，无需刷新

### 3. 完整翻译覆盖

#### Identity Sync（身份同步）
- 页面标题和描述
- 表单标签（出生日期、出生时间、时区）
- 时区选项（太平洋、东部、伦敦、中欧、亚洲、日本）
- 提交按钮和隐私声明

#### Scenario Selection（场景选择）
- 页面标题和描述
- 4个场景卡片：
  - 高风险投资
  - 职业转型
  - 战略谈判
  - 关键时机
- 每个卡片的标题和描述
- 行动按钮文字

#### The Inquiry（策略推演）
- 页面标题和描述
- 6个分析步骤文字
- 用户信息展示标签
- 进度提示文字

#### Strategy Dashboard（策略仪表板）
- 页面标题（根据场景变化）
- 效率评分 / 风险指数
- 演化路径（初期/中期/末期）
- 执行摘要
- 可执行步骤
- 按钮文字（新分析、导出报告）

### 4. 翻译内容类型

**英文版本**：
- 术语专业化（Decision Intelligence、Strategic Variables）
- 商业语言风格
- 面向海外中产用户

**中文版本**：
- 保持原始术语的准确性
- 商务风格翻译
- 符合中文用户阅读习惯

## 📁 文件结构

```
src/
├── contexts/
│   └── LanguageContext.tsx     # 语言状态管理 + 翻译字典
├── components/
│   ├── LanguageSwitcher.tsx    # 语言切换器组件
│   ├── IdentitySync.tsx        # 已支持i18n
│   ├── ScenarioSelection.tsx   # 已支持i18n
│   ├── TheInquiry.tsx          # 已支持i18n
│   └── StrategyDashboard.tsx   # 已支持i18n
└── app/
    ├── layout.tsx              # 包裹LanguageProvider
    └── page.tsx                # 添加LanguageSwitcher
```

## 🔧 使用方法

### 在组件中使用翻译

```tsx
import { useLanguage } from '@/contexts/LanguageContext';

export default function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('my.translation.key')}</h1>
      <button onClick={() => setLanguage('zh')}>切换到中文</button>
    </div>
  );
}
```

### 添加新的翻译

编辑 `src/contexts/LanguageContext.tsx`：

```tsx
const translations = {
  en: {
    'new.key': 'English Text',
  },
  zh: {
    'new.key': '中文文本',
  },
};
```

## 🎯 测试步骤

1. 访问 http://localhost:3000
2. 点击右上角 "EN" / "中文" 切换
3. 观察所有页面文字是否同步切换
4. 完成整个流程测试：
   - Identity Sync → Scenario Selection → The Inquiry → Strategy Dashboard
5. 确认所有场景（投资/职业/谈判/时机）的翻译正确

## 🌍 扩展其他语言

如需添加日语、韩语等：

```tsx
type Language = 'en' | 'zh' | 'ja' | 'ko';

const translations = {
  en: { /* ... */ },
  zh: { /* ... */ },
  ja: { /* 日语翻译 */ },
  ko: { /* 韩语翻译 */ },
};
```

## 💡 最佳实践

1. **翻译键命名规范**：`模块.子模块.具体项`
   - 例如：`identity.birthDate`、`dashboard.efficiency`

2. **动态内容翻译**：
   ```tsx
   {t(`dashboard.subtitle.${scenario}`)}
   ```

3. **保持翻译简洁**：
   - 中文版避免过度翻译专业术语
   - 英文版保持商业化专业感

4. **测试覆盖**：
   - 每次添加新功能都要更新翻译
   - 确保两种语言的用户体验一致

## 🚀 生产环境优化建议

1. **本地存储语言偏好**：
   ```tsx
   useEffect(() => {
     const savedLang = localStorage.getItem('language');
     if (savedLang) setLanguage(savedLang as Language);
   }, []);
   ```

2. **SEO优化**：
   - 根据语言设置 `<html lang="en">` 或 `lang="zh"`
   - 添加 `hreflang` 标签

3. **翻译文件分离**：
   - 将翻译字典移到独立的JSON文件
   - 按需加载减少初始包体积

4. **浏览器语言自动检测**：
   ```tsx
   const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
   ```

## 📝 更新日志

**2025-01-09**：
- ✅ 实现中英文双语切换
- ✅ 添加右上角语言切换器
- ✅ 完整覆盖所有4个页面组件
- ✅ 支持4种场景的完整翻译
- ✅ 默认语言设置为英文

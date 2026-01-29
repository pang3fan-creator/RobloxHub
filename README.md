# RobloxHub 🎮

> 一个专业、极速的 Roblox 游戏攻略门户，基于 Next.js 15 构建，专为追求极致体验的现代游戏玩家设计。

## ✨ 特性

### 核心功能
- **🚀 极速加载**：基于 Next.js 15 SSG/ISR 技术，首屏加载时间 < 1s
- **🌍 多语言支持**：原生支持英语 (EN)、中文 (ZH)、西班牙语 (ES)
- **🎨 暗黑模式**：默认夜间模式，完美契合恐怖游戏氛围
- **📱 移动端优先**：响应式设计，支持单手快速查询
- **🔍 SEO 优化**：集成 JSON-LD 结构化数据，自动生成 Sitemap

### 技术亮点
- **Anomaly Slider**：创新的左右滑块对比组件，直观展示"正常 vs 异常"
- **Floating Navigation**：移动端底部悬浮导航，毛玻璃效果
- **MDX 支持**：动态内容生成，快速响应游戏更新
- **组件化设计**：高度可复用的 UI 组件库

## 🛠️ 技术栈

### 前端框架
- **Next.js 15** - React 框架 (App Router)
- **React 19** - UI 库
- **TypeScript** - 类型安全

### 样式与 UI
- **Tailwind CSS** - 原子化 CSS 框架
- **Tailwind Typography** - 优美的排版插件
- **clsx & tailwind-merge** - 条件类名工具

### 内容管理
- **MDX** - Markdown + JSX
- **gray-matter** - Frontmatter 解析
- **remark-gfm** - GitHub Flavored Markdown

### 国际化
- **next-intl** - Next.js i18n 解决方案

### 测试
- **Jest** - 单元测试
- **React Testing Library** - React 组件测试
- **Playwright** - E2E 测试

### 开发工具
- **ESLint** - 代码检查
- **PostCSS** - CSS 处理
- **Autoprefixer** - CSS 兼容性

## 📦 安装

```bash
# 克隆仓库
git clone https://github.com/your-username/roblox-hub.git
cd roblox-hub

# 安装依赖
npm install

# 或使用 pnpm
pnpm install

# 或使用 yarn
yarn install
```

## 🚀 快速开始

```bash
# 启动开发服务器
npm run dev

# 在浏览器中打开
# http://localhost:3000
```

## 📝 可用脚本

```bash
# 开发
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 运行 ESLint

# 测试
npm test             # 运行单元测试
npm run test:watch   # 监听模式运行测试
npm run test:coverage # 生成测试覆盖率报告
npm run test:e2e     # 运行 E2E 测试
npm run test:e2e:ui  # 运行 E2E 测试（UI 模式）
```

## 📁 项目结构

```
roblox-hub/
├── public/                 # 静态资源
│   └── Scary-Shawarma-Kiosk/  # 游戏图片资源
├── posts/                  # MDX 游戏攻略内容
│   └── Scary-Shawarma-Kiosk.mdx
├── messages/               # i18n 翻译文件
│   ├── en.json
│   ├── zh.json
│   └── es.json
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── [locale]/     # 国际化路由
│   │   │   ├── games/[slug]/  # 游戏详情页
│   │   │   └── page.tsx   # 首页
│   │   ├── globals.css    # 全局样式
│   │   ├── sitemap.ts     # 站点地图
│   │   └── robots.ts      # 爬虫配置
│   ├── components/        # React 组件
│   │   ├── AnomalySlider.tsx      # 异常对比滑块
│   │   ├── FloatingNav.tsx         # 悬浮导航
│   │   ├── QuickReference.tsx     # 速查表
│   │   └── ...
│   ├── lib/              # 工具函数
│   │   ├── games.ts      # 游戏数据
│   │   ├── i18n.ts       # 国际化工具
│   │   └── seo.ts        # SEO 工具
│   ├── i18n/             # i18n 配置
│   └── __tests__/        # 单元测试
├── tests/                # E2E 测试
│   └── e2e/
├── .interface-design/    # 设计系统文档
├── PRD.md                # 产品需求文档
└── package.json
```

## 🎯 核心组件

### AnomalySlider
异常对比滑块组件，支持左右拖拽对比"正常 vs 异常"状态。

**使用示例：**
```tsx
<AnomalySlider
  normalImage="/path/to/normal.webp"
  anomalyImage="/path/to/anomaly.webp"
  alt="Anomaly Comparison"
/>
```

### FloatingNav
移动端底部悬浮导航，点击弹出毛玻璃效果的菜单。

### QuickReference
速查表组件，支持锚点跳转和移动端优化。

## 🌐 国际化

项目使用 `next-intl` 实现多语言支持。

### 添加新语言
1. 在 `messages/` 目录下创建新的 JSON 文件（如 `fr.json`）
2. 在 `src/i18n.ts` 中添加语言配置
3. 在 `src/middleware.ts` 中更新语言列表

### 添加新翻译
编辑对应语言的 JSON 文件：
```json
{
  "nav": {
    "home": "Home",
    "games": "Games"
  }
}
```

## 📄 内容管理

### 添加新游戏攻略
1. 在 `posts/` 目录创建新的 MDX 文件
2. 在 `src/lib/games.ts` 中添加游戏元数据
3. 在 `public/` 目录添加对应的图片资源

**MDX 文件模板：**
```mdx
---
title: "Game Title"
slug: "game-slug"
locale: "en"
date: "2026-01-29"
---

# Game Title

Your game guide content here...
```

## 🎨 设计系统

项目遵循**沉浸式暗黑实用主义**设计风格：

- **配色**：深背景 (`slate-950`)、高对比度文字 (`slate-200`)
- **强调色**：红色/紫色用于关键警告
- **交互**：平滑滚动、悬浮导航、毛玻璃效果

详细设计规范请查看 [`.interface-design/system.md`](./.interface-design/system.md)

## 🧪 测试

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test AnomalySlider.test.tsx

# 生成覆盖率报告
npm run test:coverage

# 运行 E2E 测试
npm run test:e2e
```

## 📈 性能优化

- **SSG/ISR**：静态生成 + 增量静态再验证
- **图片优化**：WebP 格式、懒加载
- **代码分割**：自动路由级代码分割
- **字体优化**：使用 `next/font` 自动优化
- **缓存策略**：合理的 Cache-Control 配置

**性能目标：**
- Lighthouse Performance: > 90
- Lighthouse SEO: > 90
- 首屏加载时间: < 1s

## 🔧 配置

### 环境变量
创建 `.env.local` 文件：
```env
# 添加你的环境变量
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### SEO 配置
在 `src/lib/seo.ts` 中配置默认 SEO 元数据。

## 🚢 部署

### Vercel (推荐)
```bash
# 一键部署到 Vercel
vercel
```

### 其他平台
```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm run start
```

## 📚 相关文档

- [Next.js 文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [MDX 文档](https://mdxjs.com/docs)
- [next-intl 文档](https://next-intl-docs.vercel.app/)

## 🗺️ 路线图

- [x] Next.js 15 + React 19 架构搭建
- [x] 暗黑模式 + 响应式设计
- [x] i18n 多语言支持
- [x] AnomalySlider 组件
- [x] 首发游戏《Scary Shawarma Kiosk》内容
- [ ] 更多游戏内容扩展
- [ ] Email 订阅功能
- [ ] 用户评论系统
- [ ] 社交媒体分享优化

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 👨‍💻 作者

Created by your-name

---

**Made with ❤️ for Roblox gamers**

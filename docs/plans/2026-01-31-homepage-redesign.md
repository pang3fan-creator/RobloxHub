# 首页重新设计方案

> 设计日期：2026-01-31
> 设计风格：游乐场风格（活泼年轻化）

## 设计目标

| 维度     | 决策                                     |
| -------- | ---------------------------------------- |
| 整体定位 | 混合型（流量分发 + 品牌展示 + 内容发现） |
| 首屏核心 | 热门游戏大图卡片（2-3 个）               |
| 搜索位置 | 首屏内嵌，放在 Hero 区域下方             |
| 滚动模块 | Trending Now → 最新更新                  |
| 视觉风格 | 活泼年轻化（更多色彩、圆角、微动效）     |

## 页面结构

```
┌─────────────────────────────────────────────────────────┐
│  [FloatingNav 药丸菜单]                                 │  ← 保留现有组件
├─────────────────────────────────────────────────────────┤
│                                                         │
│              🎮 RobloxHub 攻略中心                       │  ← 简洁标题
│                                                         │
│         ┌─────────────────────────────────────┐         │
│         │  🔍 搜索游戏名称...                  │         │  ← 内嵌搜索框
│         └─────────────────────────────────────┘         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  🔥 热门攻略                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │
│  │             │  │             │  │             │      │  ← 3 张大图卡片
│  │  游戏封面    │  │  游戏封面    │  │  游戏封面    │      │    (悬浮 3D 倾斜)
│  │             │  │             │  │             │      │
│  └─────────────┘  └─────────────┘  └─────────────┘      │
├─────────────────────────────────────────────────────────┤
│  ⚡ Trending Now                                         │
│  [标签1] [标签2] [标签3] [标签4] ...                      │  ← 横向滚动标签
├─────────────────────────────────────────────────────────┤
│  📝 最新更新                                             │
│  [缩略图] 游戏A - 更新描述                    时间       │  ← 紧凑列表
│  [缩略图] 游戏B - 更新描述                    时间       │
│  [缩略图] 游戏C - 更新描述                    时间       │
├─────────────────────────────────────────────────────────┤
│  Footer                                                 │
└─────────────────────────────────────────────────────────┘
```

## 组件设计详情

### 1. 热门游戏大图卡片

**卡片结构：**

- 游戏封面图（占卡片 70% 高度）
- 游戏名称
- 快速统计（异常数量、结局数等）
- CTA 按钮「查看攻略」

**视觉效果：**

- 圆角：`rounded-3xl`（24px）
- 边框：彩色渐变边框（紫色→青色→粉色流动动画）
- 悬浮效果：3D 倾斜（鼠标跟随 + `perspective`）+ 轻微放大
- 阴影：彩色发光阴影（`shadow-purple-500/20`）
- 封面图：轻微渐变蒙版，让底部文字清晰

**响应式布局：**

- 桌面端：3 列并排
- 平板端：2 列
- 移动端：1 列，可横向滑动

**数据来源：**

- 从 `posts/` 目录读取 MDX 文件的 frontmatter
- 按热度/更新时间排序取前 3 个

### 2. 内嵌搜索框

**视觉设计：**

- 尺寸：`max-w-xl`
- 圆角：`rounded-full`（药丸形状）
- 背景：`bg-slate-800/60` + `backdrop-blur`
- 边框：默认 `border-slate-600`，聚焦时渐变边框发光
- 图标：左侧搜索图标，聚焦时轻微弹跳动画
- 占位符：`text-slate-400`

**交互效果：**

- 聚焦时：边框变为彩色渐变 + `scale-105`
- 回车/点击：跳转到 `/search?q=xxx`

### 3. Trending Now 模块

**结构：**

- 标题：`⚡ Trending Now` + `[查看全部 →]`
- 内容：横向滚动的彩色标签

**标签设计：**

- 形状：药丸形 `rounded-full`
- 背景：循环使用 4-5 种渐变配色
  - 紫色系：`from-purple-600 to-pink-500`
  - 青色系：`from-cyan-500 to-blue-500`
  - 橙色系：`from-orange-500 to-yellow-500`
  - 绿色系：`from-green-500 to-emerald-400`
- 悬浮效果：`scale-110` + 阴影加深

**横向滚动：**

- `overflow-x-auto` + 隐藏滚动条
- 左右边缘渐变遮罩提示可滚动

**数据来源：**

- `data/trending.json` 或手动维护的列表

### 4. 最新更新模块

**结构：**

- 标题：`📝 最新更新` + `[查看全部 →]`
- 列表项：左侧小缩略图 + 右侧文字信息 + 时间

**视觉设计：**

- 缩略图：`rounded-xl`
- 背景：`bg-slate-800/40`，悬浮时 `bg-slate-700/60`
- 分隔：`divide-y divide-slate-700/50`
- 时间：`text-slate-500`，相对时间格式

**交互效果：**

- 悬浮：整行 `translate-x-1` + 背景变亮

**数据来源：**

- 读取 MDX 文件的 `updatedAt` 字段
- 按更新时间倒序，取前 5 条

### 5. FloatingNav 优化

**保持不变：**

- 药丸形状浮动按钮
- 顶部居中位置
- 滚动时隐藏/显示逻辑
- 半屏模态展开方式
- emoji 图标

**优化调整：**

- 边框：`border-slate-700` → `border-purple-500/50`
- 悬浮时边框颜色流动动画
- 菜单项背景加轻微彩色渐变
- 展开动画加弹性效果 `cubic-bezier(0.34, 1.56, 0.64, 1)`

**新增元素：**

- 按钮微弱脉冲动画
- 菜单项图标悬浮时弹跳效果

## 技术实现要点

### 新增组件

1. `HeroSearch.tsx` - 首屏搜索框组件
2. `FeaturedGameCard.tsx` - 热门游戏大图卡片
3. `TrendingNow.tsx` - 横向滚动标签模块
4. `RecentUpdates.tsx` - 最新更新列表

### 数据获取

```typescript
// lib/posts.ts 扩展
export async function getFeaturedPosts(limit = 3): Promise<Post[]>;
export async function getRecentUpdates(limit = 5): Promise<Post[]>;
```

### 动画效果

使用 Tailwind CSS 自定义动画：

- `animate-gradient` - 渐变边框流动
- `animate-pulse-subtle` - 微弱脉冲
- `animate-bounce-subtle` - 轻微弹跳

### 3D 倾斜效果

使用 CSS transform + JavaScript 鼠标跟踪：

```typescript
const handleMouseMove = (e: MouseEvent) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
};
```

## 文件变更清单

| 文件                                  | 操作 | 说明               |
| ------------------------------------- | ---- | ------------------ |
| `src/app/[locale]/page.tsx`           | 重写 | 首页主体布局       |
| `src/components/HeroSearch.tsx`       | 新增 | 搜索框组件         |
| `src/components/FeaturedGameCard.tsx` | 新增 | 热门游戏卡片       |
| `src/components/TrendingNow.tsx`      | 新增 | Trending 模块      |
| `src/components/RecentUpdates.tsx`    | 新增 | 最新更新模块       |
| `src/components/FloatingNav.tsx`      | 修改 | 视觉优化           |
| `tailwind.config.ts`                  | 修改 | 添加自定义动画     |
| `src/lib/posts.ts`                    | 修改 | 添加数据获取函数   |
| `messages/*.json`                     | 修改 | 添加新的 i18n 文案 |

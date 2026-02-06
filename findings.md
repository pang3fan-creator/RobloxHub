# 主题切换问题审查报告

## 审查日期
2025-02-06

## 问题摘要
当前主题切换只能改变 body 背景色，组件中的硬编码暗色样式阻止了主题切换生效。

## 问题统计总览

| 文件类型 | 文件数 | 问题总数 | Critical | Medium | Low |
|---------|-------|---------|----------|--------|-----|
| 页面文件 | 2 | 9 | 3 | 5 | 1 |
| 组件文件 | 14 | 82 | 24 | 45 | 13 |
| **总计** | **16** | **91** | **27** | **50** | **14** |

## 问题分类

### 1. 硬编码背景色 (Critical - 27 个)
组件使用 `bg-slate-950`, `bg-slate-900`, `bg-slate-800` 等硬编码暗色背景

### 2. 硬编码文字颜色 (Medium - 35 个)
组件使用 `text-white`, `text-slate-200`, `text-slate-300` 等硬编码浅色文字

### 3. 硬编码边框颜色 (Medium - 20 个)
组件使用 `border-slate-700`, `border-slate-800` 等暗色边框

### 4. 渐变背景 (Low/Medium - 9 个)
组件使用 `from-slate-800/50 to-slate-900/50` 等暗色渐变

## 修复优先级

### 🔴 Critical Priority (立即修复) - 27 个问题
影响页面主体和核心组件的硬编码背景色

| 文件 | 行号 | 问题 |
|------|------|------|
| `games/[slug]/page.tsx` | 130 | `bg-slate-950`, `text-slate-200` |
| `FloatingNav.tsx` | 92, 154 | `bg-slate-900/80`, `bg-slate-900` |
| `QuickCard.tsx` | 109 | `bg-slate-900` |
| `QuickReference.tsx` | 111, 120 | `bg-slate-900`, `bg-slate-800/50` |
| `AnomalySlider.tsx` | 128 | `bg-slate-950` |
| `GameMDX.tsx` | 100 | `bg-slate-900` |
| `FeaturedGameCard.tsx` | 40 | `bg-slate-900` |
| `HeroSearch.tsx` | 24 | `bg-slate-800/60` |
| `RecentUpdates.tsx` | 41 | `bg-slate-800/30` |
| `Footer.tsx` | 26 | `bg-slate-900` |
| `HowToPlay.tsx` | 41 | `bg-slate-900` |
| `FAQSection.tsx` | 45 | `bg-slate-900` |
| `ProTips.tsx` | 49 | `bg-slate-900` |
| `MdxTable.tsx` | 28, 72 | `bg-slate-800/50`, `border-slate-800` |

### 🟡 Medium Priority (近期修复) - 50 个问题
边框颜色、文字颜色等次要样式

### 🟢 Low Priority (可选) - 14 个问题
装饰性渐变、半透明遮罩等

## 修复策略

### 策略 1: 使用 `dark:` 前缀（推荐）
```tsx
// 修复前
<div className="bg-slate-900 border border-slate-800 text-slate-200">

// 修复后
<div className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-200">
```

### 策略 2: 使用 CSS 变量
```css
/* globals.css */
:root {
  --bg-primary: #ffffff;
  --text-primary: #0f172a;
  --border-color: #e2e8f0;
}

.dark {
  --bg-primary: #020617;
  --text-primary: #e2e8f0;
  --border-color: #1e293b;
}
```

## 预计工作量
- Critical 问题修复：约 2-3 小时
- Medium 问题修复：约 3-4 小时
- Low 问题修复：约 1 小时
- 总计：约 6-8 小时

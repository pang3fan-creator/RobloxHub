# 主题切换全面修复计划

## 目标
使主题切换功能对所有页面和组件都生效，移除所有硬编码的暗色样式。

## 问题背景
- 当前主题切换按钮只能改变 body 背景色
- **91 个问题**分布在 **16 个文件**中
- 组件使用硬编码的 Tailwind 类覆盖了 CSS 变量

## 新增问题（用户反馈）

### 🔴 NEW: H2 标题文字可见性问题
**描述**: 一些组件中的 H2 标题使用 `text-white`，在浅色模式下与白色背景相同导致文字不可见

**受影响组件**:
- `TrendingNow.tsx:32` - `text-white`
- `RecentUpdates.tsx:31,69` - `text-white`
- 其他可能的 H2 标题

**修复方案**: 将所有 H2 标题改为 `text-slate-900 dark:text-white`

## 问题统计

| 严重程度 | 数量 | 描述 |
|---------|------|------|
| Critical | 27 | 硬编码背景色，影响主体视觉 |
| Medium | 50 | 边框、文字颜色 |
| Low | 14 | 装饰性渐变 |
| **总计** | **91** | - |

## 阶段划分

### ✅ 阶段 1: 全面审查 (completed)
**目标**: 识别所有需要修复的文件和问题

**已完成**:
1. ✅ 审查所有 2 个页面文件
2. ✅ 审查所有 14 个组件文件
3. ✅ 生成详细的问题清单
4. ✅ 分类整理问题类型

**输出**: `findings.md` - 包含 91 个问题的详细清单

---

### ✅ 阶段 1.5: 核心组件快速修复 (completed)
**目标**: 快速验证修复方案有效性

**已完成**:
1. ✅ FloatingNav.tsx (10 个问题)
2. ✅ QuickCard.tsx (11 个问题)
3. ✅ page.tsx (4 个问题)

**输出**: 25 个问题已修复，修复方案验证通过

---

### 🔄 阶段 2: 修复剩余 Critical 问题 (in_progress)
**目标**: 修复剩余 Critical 级别的硬编码背景色

**待修复文件** (按优先级):
1. ✅ `FloatingNav.tsx` - 已完成
2. ✅ `QuickCard.tsx` - 已完成
3. ⏳ `games/[slug]/page.tsx` - 5 个问题
4. ⏳ `QuickReference.tsx` - 5 个问题
5. ⏳ `AnomalySlider.tsx` - 9 个问题
6. ⏳ `GameMDX.tsx` - 7 个问题
7. ⏳ `FeaturedGameCard.tsx` - 4 个问题
8. ⏳ `HeroSearch.tsx` - 3 个问题
9. ⏳ `RecentUpdates.tsx` - 5 个问题
10. ⏳ `Footer.tsx` - 5 个问题
11. ⏳ `HowToPlay.tsx` - 3 个问题
12. ⏳ `FAQSection.tsx` - 4 个问题
13. ⏳ `ProTips.tsx` - 4 个问题
14. ⏳ `MdxTable.tsx` - 5 个问题

**预期输出**: Critical 问题修复完成

---

### 阶段 3: 修复 Medium 问题 (pending)
**目标**: 修复 50 个 Medium 级别的边框和文字颜色

**重点**: 修复所有 H2 标题的文字可见性问题

**预期输出**: Medium 问题修复完成

---

### 阶段 4: 修复 Low 问题 (pending)
**目标**: 修复 14 个 Low 级别的装饰性样式

**预期输出**: Low 问题修复完成

---

### 阶段 5: 验证测试 (pending)
**目标**: 确保所有页面和组件主题切换正常

**任务**:
1. 启动开发服务器
2. 测试所有页面的主题切换
3. 测试所有组件的主题切换
4. 检查浅色模式和深色模式显示效果
5. 特别检查 H2 标题在浅色模式下的可见性

**预期输出**: 验证报告

---

## 修复策略

**使用 Tailwind `dark:` 前缀**:
```tsx
// 修复前
<div className="bg-slate-900 text-slate-200 border border-slate-800">
<h2 className="text-white">标题</h2>

// 修复后
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 border-slate-200 dark:border-slate-800">
<h2 className="text-slate-900 dark:text-white">标题</h2>
```

---

## 错误记录

| 错误 | 尝试 | 解决方案 |
|------|------|---------|
| - | - | - |

---

## 决策记录

| 决策 | 理由 | 日期 |
|------|------|------|
| 使用 `dark:` 前缀而非 CSS 变量 | Tailwind 已配置 darkMode，无需额外配置 | 2025-02-06 |
| 优先修复 H2 标题文字可见性 | 用户报告的 Critical 问题，影响可读性 | 2025-02-06 |

---

## 相关文件

- `findings.md` - 详细问题清单
- `progress.md` - 进度日志

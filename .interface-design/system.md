# RobloxHub Interface Design System

> Dark Utility-First Gaming Guide Platform
> Updated: 2025-01-28

---

## Direction & Feel

**Design Philosophy:** Dark Utility-First（暗黑实用主义）

This is a **functional tool for gamers**, not a decorative marketing site.

### Core Attributes

- **Purpose:** Quick reference during gameplay（游戏过程中快速查询）
- **Environment:** Horror game atmosphere（恐怖游戏氛围）
- **Primary Device:** Mobile, single-hand operation（移动端优先，单手操作）
- **Interaction Speed:** < 2 seconds to find information（2秒内找到信息）
- **Visual Priority:** Information density > visual decoration（信息密度 > 视觉装饰）

### Emotional Tone

- **Tense but focused**（紧张但专注）- like checking a walkthrough mid-game
- **Dark without being edgy**（暗黑但不过度）- professional horror atmosphere
- **High contrast, low fatigue**（高对比度，低视觉疲劳）- extended reading sessions

---

## Domain Context

**Product World:** Roblox horror game guides, anomaly hunting, trigger events, ending routes

**Concepts:**
- Anomaly Hunting（异常狩猎）
- Quick Reference（快速速查）
- Trigger Events（事件触发）
- Ending Routes（结局路线）
- Horror Atmosphere（恐怖氛围）
- Mobile Gaming（移动游戏）

**Color World:**
- Dark Abyss（深渊黑）- slate-950
- Blood Crimson（血色红）- warning/danger
- Phantom Purple（幽灵紫）- anomaly highlight
- Terminal Green（终端绿）- game text
- Moonlight Silver（月光银）- secondary labels
- Ink Dark（墨黑）- primary text

**Signature Element:**
- **Before/After Anomaly Slider** - Interactive comparison component for "Normal vs Anomaly" scenarios

---

## Tokens

### Spacing Scale

**Base Unit:** 4px（移动端友好的小网格）

```css
--spacing-1: 4px;
--spacing-2: 8px;
--spacing-3: 12px;
--spacing-4: 16px;
--spacing-5: 20px;
--spacing-6: 24px;
--spacing-8: 32px;
--spacing-10: 40px;
--spacing-12: 48px;
```

**Usage:**
- Component padding: 16px (spacing-4)
- Section gaps: 24px (spacing-6)
- Information cards: 12px (spacing-3) - tighter than usual for density

---

### Typography

**Font Stack:**
```css
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'SF Mono', 'Consolas', 'Monaco', monospace;
```

**Type Scale:**
```css
--text-xs: 0.75rem;   /* 12px - labels, metadata */
--text-sm: 0.875rem;  /* 14px - secondary text */
--text-base: 1rem;    /* 16px - body text */
--text-lg: 1.125rem;  /* 18px - emphasized */
--text-xl: 1.25rem;   /* 20px - section headers */
--text-2xl: 1.5rem;   /* 24px - page title */
--text-3xl: 1.875rem; /* 30px - hero title */
```

**Weights:**
- Regular (400): Body text
- Medium (500): Emphasized text
- Semibold (600): Headers, interactive elements
- Bold (700): Critical warnings

---

### Colors (Dark Mode Default)

**Primitive Colors:**
```css
/* Semantic - Dark Mode */
--background-primary: #020617;  /* slate-950 */
--background-secondary: #0f172a; /* slate-900 */
--background-tertiary: #1e293b; /* slate-800 */

--foreground-primary: #e2e8f0;   /* slate-200 */
--foreground-secondary: #94a3b8; /* slate-400 */
--foreground-tertiary: #64748b;  /* slate-500 */

--border-default: rgba(148, 163, 184, 0.1);  /* slate-400/10 */
--border-strong: rgba(148, 163, 184, 0.2);   /* slate-400/20 */

/* Brand & Semantic */
--brand-primary: #a855f7; /* purple-500 - anomaly highlight */
--brand-secondary: #8b5cf6; /* violet-500 */

--semantic-danger: #dc2626; /* red-600 - warnings, dangerous anomalies */
--semantic-warning: #f59e0b; /* amber-500 - caution */
--semantic-success: #10b981; /* emerald-500 - safe routes */
--semantic-info: #3b82f6; /* blue-500 - informational */
```

**Light Mode (Opt-in):**
```css
--background-primary: #ffffff;
--background-secondary: #f8fafc; /* slate-50 */
--foreground-primary: #0f172a; /* slate-900 */
--foreground-secondary: #475569; /* slate-600 */
```

---

### Depth Strategy

**Approach:** Borders-only（仅边框，无阴影）

**Rationale:**
- Clean, technical feel（干净、技术感）
- Works better in dark mode（暗黑模式下更清晰）
- Reduces visual noise（减少视觉干扰）
- Improves perceived performance（提升性能感知）

**Implementation:**
```css
/* Surface Elevation */
--surface-base: background-primary;
--surface-raised: background-secondary;
--surface-overlay: background-tertiary;

/* Border Hierarchy */
--border-subtle: border-default;
--border-default: border-strong;
--border-focus: brand-primary;
```

**No shadows** - Use subtle border changes to indicate elevation

---

### Border Radius

**Scale:**
```css
--radius-sm: 4px;   /* Small elements, badges */
--radius-md: 8px;   /* Cards, buttons, inputs */
--radius-lg: 12px;  /* Large cards, modals */
--radius-full: 9999px; /* Pills, avatars */
```

**Usage:**
- Buttons: `radius-md` (8px)
- Cards: `radius-md` (8px)
- Floating nav: `radius-full` (pill shape)

---

## Component Patterns

### AnomalySlider（签名组件）

**Purpose:** Interactive before/after comparison for anomaly detection

**Key Features:**
- Touch-optimized drag handle（44px × 44px minimum）
- Real-time image comparison
- Brightness adjustment slider（optional）
- "Mark as Found" checkbox integration

**Structure:**
```
┌─────────────────────────────────────┐
│  [Before Image | After Image]        │
│         ↕ [Drag Handle] ↕           │
│  ☐ Mark as Found                    │
└─────────────────────────────────────┘
```

**Tokens:**
- Container height: 200px (mobile), 300px (desktop)
- Handle size: 44px (touch target)
- Border: 1px solid var(--border-default)

---

### Floating Navigation（移动端）

**Purpose:** Bottom pill-shaped floating nav for mobile one-hand use

**Key Features:**
- Fixed position bottom-center（底部居中固定）
- Blur glass effect（毛玻璃背景）
- Collapses on scroll（滚动时收起）
- Semi-screen modal on tap（点击弹出半屏菜单）

**Structure:**
```
      ┌──────────────────┐
      │  ≡ Menu (48px)   │ ← Pill shape
      └──────────────────┘
```

**Tokens:**
- Height: 48px
- Width: min(200px, 80vw)
- Background: rgba(15, 23, 42, 0.8) + backdrop-blur-md
- Border-radius: radius-full
- Shadow: none (borders-only strategy)

---

### Quick Reference Card（速查卡片）

**Purpose:** Compact information display for anomaly lists, event tables

**Key Features:**
- Tight spacing (12px padding)
- High contrast borders
- Checkbox for "Found" state
- Tap to expand details

**Structure:**
```
┌──────────────────────────────────┐
│ ☐ Anomaly #12 - "Moving Statue"  │
│    Location: Hallway → Kitchen   │
│    Risk Level: ⚠️ High           │
└──────────────────────────────────┘
```

**Tokens:**
- Padding: spacing-3 (12px)
- Border: 1px solid var(--border-default)
- Border-radius: radius-md (8px)
- Background: var(--surface-raised)

---

### Action Button

**Purpose:** Primary actions（CTA, navigation）

**Tokens:**
```css
--button-height: 44px; /* Touch target minimum */
--button-padding: 0 spacing-4; /* 16px horizontal */
```

**States:**
- Default: `bg-brand-primary text-white`
- Hover: `bg-brand-secondary`
- Active: `scale-95`（subtle press feedback）
- Disabled: `opacity-50 cursor-not-allowed`

---

## Layout Patterns

### Mobile-First Grid

**Container:**
```css
--container-max: 1200px;
--container-padding-mobile: spacing-4; /* 16px */
--container-padding-desktop: spacing-6; /* 24px */
```

**Grid:**
- Mobile: 1 column（单列）
- Tablet: 2 columns（双列）
- Desktop: 3 columns（三列）

---

### Information Hierarchy

**Visual Priority:**
1. **Critical warnings** - Semantic danger color, bold
2. **Anomaly names** - Brand primary color, semibold
3. **Action labels** - Foreground primary, medium weight
4. **Supporting text** - Foreground secondary, regular
5. **Metadata** - Foreground tertiary, small

---

## Animation & Micro-interactions

**Timing:**
- Fast transitions: 150ms（hover, focus）
- Medium transitions: 300ms（modals, navigation）
- Slow transitions: 500ms（page transitions）

**Easing:**
```css
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**No bounce effects** - Keep movements snappy and purposeful

---

## Responsive Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

**Mobile-first approach** - Start with mobile layout, enhance for larger screens

---

## Accessibility

**Contrast Requirements:**
- All text: WCAG AA (4.5:1 minimum)
- Critical warnings: WCAG AAA (7:1 preferred)

**Touch Targets:**
- Minimum size: 44px × 44px
- Spacing between targets: 8px

**Focus States:**
- All interactive elements must have visible focus rings
- Focus color: var(--brand-primary)

---

## Decisions Log

| Decision | Rationale | Date |
|----------|-----------|------|
| Dark mode default | Fits horror game atmosphere, reduces eye strain during gameplay | 2025-01-28 |
| Borders-only depth | Cleaner in dark mode, better performance perception | 2025-01-28 |
| 4px spacing base | Mobile-friendly small grid, allows tight information density | 2025-01-28 |
| Purple brand color | Represents "anomaly" mystery, stands out in dark theme | 2025-01-28 |
| Floating pill nav | Mobile-first, single-thumb operation optimization | 2025-01-28 |
| Tight card padding (12px) | Enables more information per screen, reduces scrolling | 2025-01-28 |
| 44px touch targets | Apple HIG compliance, comfortable thumb interaction | 2025-01-28 |

---

## Next Steps

1. ✅ Design system established
2. ⏳ Build AnomalySlider component
3. ⏳ Build Floating Navigation component
4. ⏳ Create Quick Reference Card pattern
5. ⏳ Implement typography scale and color tokens
6. ⏳ Test on real devices（mobile touch targets）

---

**Last Updated:** 2025-01-28
**Version:** 1.0.0

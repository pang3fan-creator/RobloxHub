# 1. 项目愿景 (Project Vision)

- **核心目标**：建立一个专业、极速的 Roblox 游戏攻略门户
- **竞争策略**：针对目前游戏攻略市场（如 Fandom、老旧博客）UX 破烂、广告密集的现状进行“降维打击”。通过极致的加载速度、现代感设计和结构化的数据，抢占搜索排名。
- **扩展性要求**：初期以《Scary Shawarma Kiosk》作为首发流量破局点（Pillar Content），但系统架构必须支持无限横向扩展其他 Roblox 游戏（如 _SAVE THE PEOPLE_、_BIZARRE LINEAGE_ 等）。

# 2. 页面架构 (Information Architecture)

## 2.1 门户型主页 (Home Page Portal)

主页不应只是单篇攻略，而是一个**流量分发中心**：

- **Hero 区域**：展示当前最热门的“破局”游戏（首发为《Scary Shawarma Kiosk》）的快捷入口。
- **Trending Now 模块**：以卡片形式展示近期 TikTok/Reddit 爆火的 3-5 款游戏及对应的速查链接（如 Codes、Guides）。
- **分类导航**：按内容属性划分为：Anomaly Lists（异常清单）、Game Codes（礼包码）、Tier Lists（等级表）、Technical Fixes（技术修复）。
- **关于与信誉 (E-E-A-T)**：简述站点的专业性，强调由资深玩家实测更新。

## 2.2 游戏详情/专题页 (Game Pillar Page)

每个游戏的独立路径（如 `/games/scary-shawarma-kiosk`），采用之前设计的结构化模板：

- **顶部速查表**：带锚点跳转，直达异常清单、事件和结局。
- **核心内容区**：详细的异常对比卡片、全结局解锁步骤、随机事件应对方案。

# 3. 核心功能与技术需求 (Core Features)

## 3.1 极速访问与响应式

- **性能标准**：基于 Next.js SSG/ISR 技术，首屏加载时间 < 1s，Lighthouse SEO 与 Performance 分数 > 90。
- **主题模式**：支持**日间（Light）/ 夜间（Dark）模式**切换，默认采用夜间模式以契合恐怖游戏氛围。
- **移动端优先**：针对手机端优化速查表的交互，确保玩家能单手快速查询。

## 3.2 多语言支持 (I18n)

- **主语言**：英语 (EN)。
- **扩展语言**：中文 (ZH)、西班牙语 (ES)。
- **架构**：路由采用 `/[locale]/...` 格式，支持通过 JSON 字典快速扩展新语种。

## 3.3 SEO 增强 (Technical SEO)

- **自动化元数据**：根据游戏名、版本号、日期（如 `Jan 2026`）自动生成吸引点击的 Title 和 Description。
- **JSON-LD 注入**：为异常清单生成 `ItemList` 结构化数据，为攻略步骤生成 `HowTo` 结构化数据。
- **Sitemap 自动生成**：包含所有游戏路径及对应的多语言版本。

# 4. UI/UX 设计风格 (Visual Identity)

## 4.1 风格定义：沉浸式暗黑实用主义

- **配色**：深背景（`slate-950`）、高对比度文字（`slate-200`）、关键警告使用红色或紫色强调。
- **交互**：
  - **Anomaly Slider**：实现“正常 vs 异常”图片的左右滑块对比。
  - **Floating Navigation**：移动端底部悬浮的“药丸型”导航按钮，点击弹出半屏毛玻璃效果的导航菜单。
  - **平滑滚动**：点击速查表后的平滑锚点跳转。

# 5. 增长与商业化 (4C Model Implementation)

- **Create (创作)**：快速响应 TikTok 趋势，利用 MDX 模板在 3 小时内上线新热门游戏内容。
- **Connect (连接)**：通过极佳的 UX（如“已发现异常”勾选功能）增加用户在站内的停留时长。
- **Capture (捕获)**：攻略页底部预留 Email 订阅框，用于推送最新 Codes 和游戏更新提醒，沉淀私域流量 。
- **Convert (转化)**：预留 Amazon Roblox 礼品卡推荐位和广告位。

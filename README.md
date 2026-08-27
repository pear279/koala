# Moodseed

> 种下你的心事，长出你的故事

Moodseed 是一个情绪记录与植物养成结合的 AI 陪伴应用。用户与 AI 伙伴对话记录心情，情绪被转化为「种子」，在个人森林中培育成植物。

**当前状态：前端原型（无后端）**。界面可交互浏览，数据为本地演示数据。

## 快速开始

```bash
npm install
npm run dev      # 开发服务器 http://localhost:5173
npm run build    # 生产构建，产物在 dist/
npm run preview  # 预览构建产物
```

要求 Node.js 18 及以上。

## 技术栈

| 用途 | 选择 | 说明 |
| --- | --- | --- |
| 构建 | Vite 6 | 产物为纯静态文件 |
| 框架 | Vue 3（SFC + Composition API） | 组件化消除页面间重复 |
| 路由 | vue-router 4（hash 模式） | 静态托管无需服务端重写规则 |
| 样式 | 原生 CSS + CSS 变量 | 无预处理器、无 UI 框架 |

运行依赖仅 `vue` 与 `vue-router` 两项。

## 目录结构

```
├── index.html              # 单一入口
├── public/images/          # 静态图片资源（ASCII 命名）
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/index.js     # 6 条路由 + 兜底重定向
│   ├── config/navigation.js# 导航单一数据源
│   ├── data/mock.js        # 演示数据，接真实接口时整体替换
│   ├── utils/datetime.js   # 相对时间格式化
│   ├── styles/
│   │   ├── tokens.css      # 设计令牌
│   │   └── base.css        # 全局基础样式
│   ├── components/
│   │   ├── AppLayout.vue   # 三栏布局壳
│   │   ├── AppSidebar.vue  # 左侧导航
│   │   ├── ResourceBar.vue # 养成资源进度条
│   │   ├── ChatPanel.vue   # 右侧对话面板（可交互）
│   │   ├── MoodCalendar.vue# 心情日历
│   │   └── GrowthProgress.vue # 培育进度
│   └── pages/              # 6 个页面
├── references/             # 项目方案与优化规划文档，不参与构建
└── archive/                # 早期原型，仅作视觉参考，不参与构建
    ├── prototype-html/     # Figma 还原稿（6 页静态 HTML）
    └── frontend-demo-1/    # 早期交互草稿
```

## 页面与完成度

6 个页面已全部脱离设计稿截图，均为真实 DOM 结构。

| 路由 | 页面 | 状态 |
| --- | --- | --- |
| `/` | 首页（幸运花语 + AI 性格） | 已组件化 |
| `/forest` | 我的森林（植物图鉴 + 培育进度） | 已数据驱动 |
| `/story` | 故事库（心情日历 + 社区入口） | 已还原，日历跟随系统时间 |
| `/seed` | 我的种子（记录列表 + 入口卡 + 模式卡） | 已还原 |
| `/message` | 消息（分组列表） | 已还原 |
| `/my` | 我的（个人资料） | 已还原，可编辑 |

页面按钮多为占位，尚无真实行为；数据均来自 `src/data/mock.js`。

## 适配范围

桌面优先，**900px 及以上可用**，不支持移动端。

三栏宽度使用 `clamp()` 随视口平滑缩放，无断点跳变：

| 变量 | 取值 |
| --- | --- |
| `--sidebar-width` | `clamp(148px, 13vw, 200px)` |
| `--chat-panel-width` | `clamp(280px, 22vw, 380px)` |
| `--content-gutter` | `clamp(20px, 3vw, 64px)` |

「我的」页为全宽布局（无两侧栏），卡片限宽 1180px 居中，内部使用容器查询（`container-type: inline-size` + `cqi`）随卡片宽度缩放。

## 开发约定

**样式**：颜色、间距、字号、圆角、布局尺寸一律使用 `src/styles/tokens.css` 中的 CSS 变量，不写字面量。

**布局区块显隐**：通过路由 `meta` 声明，默认全部显示。

```js
meta: { showResourceBar: false, showChatPanel: false }
```

**导航**：只改 `src/config/navigation.js`，激活态由 `vue-router` 自动注入 `router-link-exact-active`，不要手写 active 判断。

## 安全约束

以下三条在接入真实 AI 服务前必须保持：

1. **消息渲染只用文本插值** `{{ }}`，禁止 `v-html`。用户输入与 AI 回复都属于不可信输入。
2. **API 密钥不进前端**。任何 AI 服务凭证必须放在服务端并通过代理调用，前端不得持有。密钥仅存环境变量，`.env*` 已在 `.gitignore` 中排除。
3. **不引入未校验的第三方 CDN**。如需外部资源，使用本地依赖或附带 SRI 完整性校验。

## 后续计划

详见 [references/项目优化文档.md](./references/项目优化文档.md)，其中包含现状评估、技术债清单、五阶段优化规划与待确认事项。

近期优先项：

1. 引入 Pinia 与 `api/` 层，打通数据链路（阻塞后续全部交互功能）
2. 补 ESLint / Prettier / Stylelint / Vitest 与 CI 检查
3. 实现核心交互闭环：养护 → 资源 → 成长
4. 移动端适配与图片 WebP 化

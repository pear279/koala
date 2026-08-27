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
│   ├── styles/
│   │   ├── tokens.css      # 设计令牌 + 响应式断点
│   │   └── base.css        # 全局基础样式
│   ├── components/
│   │   ├── AppLayout.vue   # 三栏布局壳
│   │   ├── AppSidebar.vue  # 左侧导航
│   │   ├── ResourceBar.vue # 养成资源进度条
│   │   └── ChatPanel.vue   # 右侧对话面板（可交互）
│   └── pages/              # 6 个页面
└── archive/                # 早期原型，仅作视觉参考，不参与构建
    ├── prototype-html/     # Figma 还原稿（6 页静态 HTML）
    └── frontend-demo-1/    # 早期交互草稿
```

## 页面与完成度

| 路由 | 页面 | 状态 |
| --- | --- | --- |
| `/` | 首页（幸运花语 + AI 性格） | 已组件化 |
| `/forest` | 我的森林（植物图鉴 + 培育进度） | 图鉴已数据驱动，进度条仍为截图 |
| `/story` | 故事库 | **仍为设计稿截图，待替换** |
| `/seed` | 我的种子 | **仍为设计稿截图，待替换** |
| `/message` | 消息 | **仍为设计稿截图，待替换** |
| `/my` | 我的 | **仍为设计稿截图，待替换** |

标注「待替换」的页面目前用整张 PNG 呈现，无法交互、无法读屏、无法改文案，是后续迭代的首要目标。`archive/prototype-html/my.css` 中已备好 `.profile-details` / `.detail-item` / `.action-buttons` 等样式、仅缺 DOM 结构，是成本最低的切入点。

## 适配范围

桌面优先，**1024px 及以上可用**，不支持移动端。侧栏宽度在 1600px / 1200px 两处断点等比收窄，保证中间内容区不被挤压。

实测中间内容区宽度：1920px → 1220px，1440px → 880px，1024px → 544px，三档均无横向滚动条。

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

1. 将 4 个截图页替换为真实 DOM，从 `/my` 开始
2. 森林页培育进度改为数据驱动组件
3. 引入 Prettier + Stylelint 与 CI 构建检查
4. 接入真实 AI 对话（需先搭建服务端代理层）

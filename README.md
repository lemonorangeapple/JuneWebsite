# blog-rewrite

一个基于 [Astro](https://astro.build/) + [Tailwind CSS v4](https://tailwindcss.com/) 的个人博客项目，界面遵循 [Material Design 3](https://m3.material.io/) 规范。

## 特性

- 文章内容使用 Markdown 编写
- 自动生成文章列表与文章页
- 支持标签、专题、日期排序
- 内置代码高亮与 KaTeX 数学公式
- Material Design 3 设计令牌（色彩角色、字阶、形状、层级与动效），支持浅色 / 深色主题并记忆选择
- 顶栏、按钮、卡片、筛选芯片、搜索视图等组件均按 M3 规范实现
- 带有评论组件接入位

## 技术栈

- Astro 7
- Tailwind CSS v4
- Roboto（`@fontsource-variable`，自托管）
- remark-breaks
- astro-icon
- Waline

## 运行环境

- Node.js `>= 22.12.0`
- npm

## 本地启动

```bash
npm install
npm run dev
```

开发服务器默认运行在 `http://localhost:4321`

## 构建与预览

```bash
npm run build
npm run preview
```

## 质量检查

首次运行端到端测试前安装 Playwright 浏览器：

```bash
npx playwright install chromium
```

```bash
npm run check
npm test
npm run verify
```

- `npm run check`：执行 Astro 与 TypeScript 检查
- `npm test`：构建站点并运行移动端、桌面端 Playwright 测试
- `npm run verify`：依次执行类型检查、端到端测试和依赖安全审计

## 项目结构

```text
src/
  assets/        设计令牌（tokens.css）、基础样式与各组件样式
  components/    可复用组件
  layouts/       页面布局
  pages/         路由页面与文章内容
tests/           Playwright 端到端测试
public/          静态资源
```

## 内容约定

- `src/pages/index.astro`：首页
- `src/pages/posts/index.astro`：文章列表页
- `src/pages/posts/*.md`：文章内容
- `src/pages/posts/topic.astro`：专题页
- `src/pages/posts/tags.astro`：标签页

## 设计系统

样式不依赖 UI 组件库，由 `src/assets/` 下的几个文件组成，全部在 `app.css` 中汇总：

| 文件 | 内容 |
| --- | --- |
| `tokens.css` | `@theme` 中的 M3 令牌：色彩角色、字阶、形状、阴影层级、缓动曲线 |
| `base.css` | 配色方案、焦点环、`prefers-reduced-motion` 降级 |
| `components.css` | 状态层、按钮、图标按钮、卡片、芯片、列表项、搜索栏 |
| `NavBar.css` | 顶栏与面包屑 |
| `SearchModal.css` | 搜索视图（手机全屏，桌面悬浮对话框） |
| `PostList.css` / `index.css` | 文章卡片网格 / 首页 |
| `prose.css` | Markdown 正文与代码块 |
| `Comments.css` | Waline 评论区配色（不进入 cascade layer，才能覆盖 Waline 自带样式） |

要点：

- 每个颜色角色只写一次：`--color-primary: light-dark(#6750A4, #CFBCFF)`，由 `color-scheme` 决定取亮色还是暗色值。
- 色板由种子色 `#6750A4` 经 `@material/material-color-utilities` 生成；换主题色只需替换 `tokens.css` 里的十六进制值。
- 令牌同时是 Tailwind 工具类：`bg-surface-container`、`text-on-surface-variant`、`text-title-large`、`rounded-lg`（= M3 的 large 圆角，16px）、`shadow-elevation-2` 等。已移除 Tailwind 默认的颜色、字号、圆角和阴影，请只使用 M3 令牌。
- 组件类以 `m3-` 为前缀，如 `m3-button m3-button--tonal`、`m3-card m3-card--outlined`、`m3-chip`。
- 代码块使用 Shiki 的 `github-light-high-contrast` / `github-dark-high-contrast` 双主题，随页面主题切换。

## 主题切换

主题切换组件是 `src/components/ThemeController.astro`（顶栏右侧的图标按钮）。

- 首次进入会优先跟随系统浅色/深色偏好
- 用户手动切换后会写入 `localStorage`
- 刷新页面后会自动恢复上次主题（`Head.astro` 中的内联脚本会在首次绘制前设置 `data-theme`，避免闪烁）

## 说明

这是一个持续重写中的博客项目，目录和组件会继续调整。如果你想快速扩展内容，优先在 `src/pages/posts/` 下新增 Markdown 文章即可。

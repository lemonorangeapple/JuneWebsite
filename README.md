# blog-rewrite

一个基于 [Astro](https://astro.build/) + [Tailwind CSS v4](https://tailwindcss.com/) + [daisyUI](https://daisyui.com/) 的个人博客项目。

## 特性

- 文章内容使用 Markdown 编写
- 自动生成文章列表与文章页
- 支持标签、专题、日期排序
- 内置代码高亮与 KaTeX 数学公式
- 使用 daisyUI 主题，并支持本地 `localStorage` 记忆
- 带有评论组件接入位

## 技术栈

- Astro 7
- Tailwind CSS v4
- daisyUI 5
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

## 项目结构

```text
src/
  assets/        全局样式与组件样式
  components/    可复用组件
  layouts/       页面布局
  pages/         路由页面与文章内容
public/          静态资源
```

## 内容约定

- `src/pages/index.astro`：首页
- `src/pages/posts/index.astro`：文章列表页
- `src/pages/posts/*.md`：文章内容
- `src/pages/posts/topic.astro`：专题页
- `src/pages/posts/tags.astro`：标签页

## 主题切换

项目内置了主题切换组件 `src/components/ThemeController.astro`。

- 首次进入会优先跟随系统浅色/深色偏好
- 用户手动切换后会写入 `localStorage`
- 刷新页面后会自动恢复上次主题

## 说明

这是一个持续重写中的博客项目，目录和组件会继续调整。如果你想快速扩展内容，优先在 `src/pages/posts/` 下新增 Markdown 文章即可。

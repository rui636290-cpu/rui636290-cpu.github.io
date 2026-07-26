# 丰瑞 · 个人求职网站

面向杭州中小企业招聘者的求职作品集。定位：有天猫运营实习经验的 AI 产品方向候选人。使用 Astro 静态生成，部署到 GitHub Pages，中国大陆可直接访问。

## 技术栈

- **框架**：Astro + TypeScript
- **内容**：Markdown/MDX (Content Collections)
- **样式**：原生 CSS，支持深色/浅色模式
- **部署**：GitHub Pages + GitHub Actions
- **视觉**：现代清晰风格，钴蓝强调色，系统字体，无外部 CDN

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:4321` 预览。

## 构建

```bash
npm run build
npm run preview   # 预览构建产物
```

构建产物在 `dist/` 目录。

## 如何修改个人资料

编辑 `src/data/profile.ts`，修改以下字段：

- `name` — 你的姓名
- `title` — 首页定位（如"有天猫运营实习经验的 AI 产品方向候选人"）
- `subtitle` — Hero 副标题
- `intro` — 个人介绍
- `target` — 目标岗位
- `city` — 城市
- `school` — 学校名称
- `major` — 专业
- `email` — 邮箱
- `phone` — 手机号（占位符则不在页面显示）
- `wechatQr` — 微信二维码图片路径
- `bossLink` — Boss 直聘链接
- `github` — GitHub 主页链接

`capabilities` 数组控制首页"我能带来的能力"三个卡片。编辑 `src/data/navigation.ts` 修改导航和联系方式。

## 如何添加工作经历

目前工作经历写在首页 HTML 和简历页中，位于：

- `src/pages/index.astro` — 首页"工作经历"区域
- `src/pages/resume.astro` — 在线简历"工作经历"区域

找到对应的 `timeline-item` 或 `h3` 标题，参考现有结构添加新的经历条目。

## 如何添加项目

1. 在 `src/content/projects/` 目录下新建 `.md` 文件
2. 复制一个现有项目的 frontmatter 作为模板
3. 填写项目信息（标题、slug、summary、tags 等）
4. 将 `draft: false` 设置为 `false` 则在站点可见
5. 将 `featured: true` 设置首页精选展示
6. 设置 `priority` 控制排序（数字越小越靠前）

## 如何替换项目封面

在项目的 frontmatter 中设置 `coverImage` 字段：

```yaml
coverImage: '/images/project-cover.webp'
```

将图片放入 `public/images/` 目录。建议使用 WebP 格式，单张不超过 300KB。

## 如何替换个人照片

目前 Hero 区域未使用个人照片，采用抽象几何视觉。如需添加个人照片：

1. 将照片放入 `public/images/` 目录
2. 编辑 `src/pages/index.astro` 的 Hero 区域，在 `.hero-copy` 中添加 `<img>` 标签
3. 照片建议尺寸：400×400px，WebP 格式

## 如何添加 PDF 简历

将你的 PDF 简历命名为 `你的简历.pdf`，放入 `public/resume/` 目录。然后修改 `src/data/navigation.ts` 中 `contactLinks.resumePdf` 的路径：

```ts
resumePdf: '/resume/你的简历.pdf',
```

替换后，需同步更新 `src/components/ContactCTA.astro` 和 `src/pages/resume.astro` 中的 PDF 下载入口显示逻辑。当前正式 PDF 未提供，下载按钮不显示。

## 如何替换微信二维码

将二维码图片放入 `public/images/` 目录，然后修改 `src/data/profile.ts` 中的 `wechatQr` 字段：

```ts
wechatQr: '/images/your-wechat-qr.png',
```

## 如何配置 GitHub Pages

### 用户主页仓库（`用户名.github.io`）

部署地址：`https://用户名.github.io/`

1. 无需设置 `base` 路径
2. 在仓库 Settings → Pages → Build and deployment → Source 选择 **GitHub Actions**
3. 修改 `astro.config.mjs`：
   ```js
   site: 'https://用户名.github.io',
   base: '',
   ```

### 普通项目仓库（如 `resume-portfolio`）

部署地址：`https://用户名.github.io/resume-portfolio/`

1. 需要设置 `base` 路径为仓库名
2. 在仓库 Settings → Pages → Source 选择 **GitHub Actions**
3. 修改 `astro.config.mjs`：
   ```js
   site: 'https://用户名.github.io',
   base: '/resume-portfolio',
   ```
4. 或使用环境变量构建：
   ```bash
   BASE_PATH=/resume-portfolio npm run build
   ```

### 部署流程

推送代码到 `main` 分支后，GitHub Actions 自动构建并部署。工作流配置在 `.github/workflows/deploy.yml`。

## 用户主页仓库和普通仓库的区别

| 项目 | 用户主页仓库 | 普通项目仓库 |
|------|------------|-------------|
| 仓库名 | `用户名.github.io` | 任意名称 |
| 访问地址 | `https://用户名.github.io/` | `https://用户名.github.io/仓库名/` |
| `base` | `''` | `'/仓库名'` |
| 资源路径 | `/favicon.svg` | `/仓库名/favicon.svg` |

本项目通过 `astro.config.mjs` 中的 `base` 字段和 `BASE_PATH` 环境变量同时兼容两种部署方式。

## 如何检查中国大陆访问依赖

构建后检查 `dist/` 目录和 HTML 文件，确认：

1. 没有 `fonts.googleapis.com` 外链
2. 没有 `unpkg.com`、`cdn.jsdelivr.net` 等 CDN 外链
3. 没有外部统计服务（Google Analytics 等）
4. 图片资源在 `dist/images/` 和 `dist/resume/` 目录中
5. 字体使用系统字体栈，无外部字体下载

也可运行以下命令快速检查：

```bash
grep -r "googleapis\|unpkg\|jsdelivr\|googletagmanager\|analytics" dist/ 2>/dev/null
```

无输出即为通过。

## 如何部署更新

1. 修改内容（编辑 Markdown 或 TypeScript 数据文件）
2. 本地验证：`npm run build && npm run preview`
3. 提交并推送到 GitHub：
   ```bash
   git add .
   git commit -m "更新内容"
   git push origin main
   ```
4. GitHub Actions 自动构建并发布

## 当前仍需用户补充的信息

以下信息使用占位符标记，请在部署前替换。已确认并填入的信息（姓名、邮箱、学校、公司、实习时间）不在此列。

| 项目 | 占位符 | 替换位置 |
|------|--------|---------|
| 手机号 | `你的手机号` | `src/data/profile.ts` |
| 微信二维码 | `wechat-qr-placeholder.svg` | `public/images/` + `profile.ts` |
| Boss 直聘链接 | `你的Boss直聘链接` | `src/data/profile.ts` |
| GitHub 链接 | `https://github.com/YOUR_USERNAME` | `src/data/profile.ts` + `navigation.ts` |
| PDF 简历 | `简历待替换.pdf` | `public/resume/` + `navigation.ts` |
| 项目素材 | 脱敏后的价格带分析图、竞品分析表 | `public/images/` + `sunscreen-category.md` |
| 项目改善数据 | 销量/利润的精确改善幅度 | `src/content/projects/sunscreen-category.md` |
| GitHub Pages 地址 | `YOUR_USERNAME` | `astro.config.mjs` |
| OG 图片 | `og-image.png` | `public/` |

所有占位符均可在 VSCode 中全局搜索 `待替换`、`YOUR_USERNAME` 快速定位。

## 许可

本项目为个人求职用途，内容版权归个人所有。

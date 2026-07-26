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

## 仓库与站点

- 仓库：`https://github.com/rui636290-cpu/rui636290-cpu.github.io`
- 正式站点：`https://rui636290-cpu.github.io/`
- 本项目使用用户主页仓库根路径发布，`base` 为 `''`。

### 部署流程

推送代码到 `main` 分支后，GitHub Actions 自动构建并部署。工作流配置在 `.github/workflows/deploy.yml`。

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

以下信息尚未提供，请在确认后补充。

| 项目 | 说明 | 位置 |
|------|------|---------|
| 项目素材 | 脱敏后的价格带分析图、竞品分析表 | `public/images/` + `sunscreen-category.md` |
| 可验证改善数据 | 销量/利润的改善幅度 | `src/content/projects/sunscreen-category.md` |

## 许可

本项目为个人求职用途，内容版权归个人所有。

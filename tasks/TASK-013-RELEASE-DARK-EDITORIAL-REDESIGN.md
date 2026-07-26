# TASK-013-RELEASE-DARK-EDITORIAL-REDESIGN：提交、推送并验证 V3 改版

状态：`CHANGES_REQUESTED`

## 用户授权

用户已明确授权：

> 授权提交当前个人网站变更并推送到 origin/main，禁止强推。

本任务是独立 RELEASE 任务。允许提交当前已验收的网站与治理变更，并普通推送到既有 `origin/main`。推送会触发现有 GitHub Pages Actions；允许监控该次自动部署并验证公开页面。

## 已确认目标

- Git 根目录：`D:/fr个人网站/fr个人网站`
- 当前分支：`main`
- remote：`origin`
- 目标仓库：`https://github.com/rui636290-cpu/rui636290-cpu.github.io`
- 发布前本地 HEAD：`aefd8f8fad23ede19491d92d27b7757539c490e0`
- 发布前 `origin/main`：`aefd8f8fad23ede19491d92d27b7757539c490e0`
- 全局 Git 身份属于实际开发者 `观澜23333 <gaolinhao1104b@gmail.com>`，必须保持不变；仓库所有者与网站主体为丰瑞。

任何根目录、分支、remote URL 或远端基线不一致时，立即停止并报告 `BLOCKED`。

## 发布内容

首个发布提交只允许包含以下当前已验收变更：

- `PROJECT_STRATEGY.md`
- `TASK.md`
- 删除 `public/images/analysis-path.svg`
- `src/components/ContactCTA.astro`
- `src/components/ProjectCard.astro`
- `src/layouts/BaseLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `src/pages/index.astro`
- `src/styles/global.css`
- `tasks/TASK-005-RELEASE-GITHUB-PAGES.md`
- `tasks/TASK-010-RESUME-RELEASE.md`
- `tasks/TASK-011-DARK-EDITORIAL-REDESIGN.md`
- `tasks/TASK-012-FIX-DUPLICATE-INNER-NAV.md`
- `reports/TASK-011-REPORT.md`
- `reports/TASK-012-REPORT.md`
- 本任务文件 `tasks/TASK-013-RELEASE-DARK-EDITORIAL-REDESIGN.md`

不得包含 `dist/`、缓存、凭证、其他仓库内容或未列出的文件。

## 执行阶段

### 1. 发布前只读核验

从磁盘重新读取 `TASK.md`、本任务、`AGENTS.md`、`CLAUDE.md`、TASK-011/012 及报告，然后运行：

```text
git rev-parse --show-toplevel
git branch --show-current
git remote -v
git status --short --branch
git rev-parse HEAD
git rev-parse origin/main
git config --global user.name
git config --global user.email
git diff --check
git diff --name-status
git ls-files --others --exclude-standard
npm run build
```

不得输出或检查凭证内容。Git 身份只读确认，不得修改。

### 2. 同步远端基线

允许运行：

```text
git fetch origin main
```

fetch 后再次确认：

- 当前仍为 `main`；
- `HEAD` 与 `origin/main` 都仍为 `aefd8f8fad23ede19491d92d27b7757539c490e0`；
- 没有远端新提交需要合并；
- 工作区变更仍严格等于“发布内容”清单。

任一条件不满足则停止，不得合并、变基、覆盖或强推。

### 3. 创建发布提交

只暂存“发布内容”清单，不使用会扩大范围的通配暂存。检查：

```text
git diff --cached --check
git diff --cached --name-status
git status --short
```

确认无越界后创建一个提交：

```text
git commit -m "feat: redesign portfolio experience"
```

记录完整提交 SHA。不得 amend、变基或修改 Git 身份。

### 4. 普通推送与自动部署

执行：

```text
git push origin main
```

禁止使用 `--force`、`--force-with-lease` 或任何历史覆盖方式。

确认远端 `main` 包含发布提交。使用 GitHub CLI 查看该提交触发的 `Deploy to GitHub Pages` workflow；等待该 run 达到 `completed success`。如果 workflow 失败，只记录失败原因并报告 `BLOCKED`，不得手动重跑、修改代码或推送额外修复。

### 5. 公开页面验证

自动部署成功后检查以下地址返回 HTTP 200，并核对标题、丰瑞身份和核心内容：

- `https://rui636290-cpu.github.io/`
- `https://rui636290-cpu.github.io/projects/sunscreen-category/`
- `https://rui636290-cpu.github.io/resume/`

首页应呈现深色暖橙双栏改版；项目详情只显示一个“← 返回首页”。不得把缓存中的旧页面误报为新版本。

### 6. 发布报告与审计提交

写入 `reports/TASK-013-REPORT.md`，记录：

1. 状态：`COMPLETED` 或 `BLOCKED`；
2. 根目录、分支、remote 与发布前基线；
3. 发布提交完整 SHA、提交作者与文件范围；
4. push 结果；
5. Actions run URL、状态和部署提交 SHA；
6. 三个公开页面的 HTTP 与内容验证结果；
7. 最终本地/远端 SHA、分支和工作区状态；
8. 未完成项或风险；
9. 末行：`等待用户通知 Codex 审核。`

部署成功后，允许只暂存 `reports/TASK-013-REPORT.md`，创建第二个审计提交：

```text
git commit -m "docs: record TASK-013 release [skip ci]"
git push origin main
```

第二次推送同样禁止强推。确认 `[skip ci]` 没有触发新的部署 workflow，且最终 `origin/main` 等于本地 `HEAD`。

## 允许的 Git 与网络操作

- `git fetch origin main`
- 精确暂存本任务列出的发布文件
- 两次 `git commit`
- 两次普通 `git push origin main`
- 只读查看 GitHub Actions 状态与公开网站

不允许其他 Git 写操作。

## 禁止项

- 禁止强推、删除远端历史、merge、rebase、amend、reset、tag 或创建/切换分支；
- 禁止修改 remote、Git 身份、凭证、Actions 工作流或 Pages 设置；
- 禁止修改业务代码、战略、既有任务或报告内容；
- 禁止提交 `dist/`、缓存、日志、密钥、Token、密码、`.env` 或认证文件；
- 禁止操作任何其他目录、项目或仓库；
- 禁止在部署失败后自行修复或重跑。

## 完成条件

- 发布提交已普通推送到目标仓库；
- 对应 GitHub Pages workflow 成功；
- 三个公开页面均为新版本且返回 200；
- TASK-013 报告已通过 `[skip ci]` 审计提交普通推送；
- 本地 `main` 与 `origin/main` 一致；
- 工作区干净；
- 未产生额外分支、标签或 workflow run。

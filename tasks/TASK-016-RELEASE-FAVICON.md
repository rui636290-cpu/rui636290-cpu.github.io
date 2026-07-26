# TASK-016-RELEASE-FAVICON：提交、推送并验证新浏览器图标

状态：`READY`

## 用户授权

用户在 TASK-015 验收通过后明确表示：

> 可以推送

本任务允许提交当前 TASK-015 favicon 与对应治理记录，普通推送到既有 `origin/main`。推送会触发现有 GitHub Pages Actions；允许等待自动部署并验证线上图标。

## 已确认目标

- Git 根目录：`D:/fr个人网站/fr个人网站`
- 当前分支：`main`
- remote：`origin`
- 仓库：`https://github.com/rui636290-cpu/rui636290-cpu.github.io`
- 发布前本地 HEAD：`5edf7673644e78017184d5489c404faa20261eb6`
- 发布前 `origin/main`：`5edf7673644e78017184d5489c404faa20261eb6`
- Git 作者身份保持现有 `观澜23333 <gaolinhao1104b@gmail.com>`，不得修改。

根目录、分支、remote 或远端基线不一致时立即停止并报告 `BLOCKED`。

## 首个发布提交范围

只允许包含：

- `PROJECT_STRATEGY.md`
- `TASK.md`
- `public/favicon.svg`
- `reports/TASK-015-REPORT.md`
- `tasks/TASK-015-ALIGN-FAVICON-BRAND.md`
- 本任务文件 `tasks/TASK-016-RELEASE-FAVICON.md`

不得包含 `dist/`、缓存、凭证或其他文件。

## 执行步骤

### 1. 发布前核验

从磁盘重新读取 `TASK.md`、本任务、`AGENTS.md`、`CLAUDE.md`、TASK-015 及其报告，然后运行：

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

Git 身份只读确认，不得修改；不得读取凭证内容。

### 2. 同步远端基线

允许运行：

```text
git fetch origin main
```

fetch 后必须确认本地 `HEAD` 与 `origin/main` 仍同时等于：

`5edf7673644e78017184d5489c404faa20261eb6`

如有远端新提交则停止，不得 merge、rebase、reset 或强推。

### 3. 发布提交

精确暂存“首个发布提交范围”的六个文件，检查：

```text
git diff --cached --check
git diff --cached --name-status
git status --short
```

确认无越界后提交：

```text
git commit -m "feat: align favicon with portfolio brand"
git push origin main
```

只允许普通推送，禁止 `--force` 和 `--force-with-lease`。记录完整发布提交 SHA。

### 4. 自动部署与线上验证

使用 GitHub CLI查找该发布提交触发的 `Deploy to GitHub Pages` run，等待其达到 `completed success`。失败时记录原因并报告 `BLOCKED`，不得修改代码、重跑或额外推送。

部署成功后验证：

- `https://rui636290-cpu.github.io/` 返回 HTTP 200；
- `https://rui636290-cpu.github.io/favicon.svg` 返回 HTTP 200；
- 线上 SVG 包含 `#FFB454`、`#111318` 和四条几何线；
- 线上 SVG 不包含 `linearGradient`、`<text>`、`#087fbc`、`#2dbca9`；
- 首页仍引用 `/favicon.svg`；
- 浏览器强制刷新后标签页显示暖橙底几何“丰”。

### 5. 发布报告与审计提交

部署成功后创建 `reports/TASK-016-REPORT.md`，状态写为 `COMPLETED`，记录：

1. 根目录、分支、remote 与发布前基线；
2. 发布提交完整 SHA、作者和文件范围；
3. 第一次 push 结果；
4. Actions run ID、URL、状态和部署 SHA；
5. 首页与线上 favicon 的 HTTP、内容及视觉验证；
6. 未完成项与风险；
7. 明确说明“本报告随后将通过 `[skip ci]` 审计提交推送；不在报告中记录其自身提交 SHA”；
8. 末行：`等待用户通知 Codex 审核。`

报告在创建后不得再次修改。只暂存该报告并执行：

```text
git add -- reports/TASK-016-REPORT.md
git diff --cached --check
git diff --cached --name-status
git commit -m "docs: record TASK-016 release [skip ci]"
git push origin main
```

第二次同样只允许普通推送。之后只读确认：

- 第二笔提交只包含 `reports/TASK-016-REPORT.md`；
- `[skip ci]` 没有触发新 workflow；
- 本地 `main` 与 `origin/main` 一致；
- 工作区干净；
- 无额外分支或标签。

不得为了把第二笔审计提交 SHA 写回报告而再次修改报告或创建第三笔提交。

## 允许操作

- `git fetch origin main`
- 精确暂存任务列出的文件
- 两次 `git commit`
- 两次普通 `git push origin main`
- 只读查询 Actions 与公开页面

## 禁止项

- 禁止强推、merge、rebase、amend、reset、tag 或创建/切换分支；
- 禁止修改 remote、Git 身份、凭证、Actions 工作流或 Pages 设置；
- 禁止修改已验收业务内容或任务范围外文件；
- 禁止提交 `dist/`、缓存、日志、密钥、Token、密码、`.env` 或认证文件；
- 禁止操作其他目录、项目或仓库；
- 禁止第三笔提交或推送。

## 完成条件

- favicon 发布提交已普通推送；
- 对应 Pages workflow 成功；
- 线上 favicon 为暖橙底几何“丰”；
- TASK-016 报告已通过第二笔 `[skip ci]` 提交普通推送；
- 本地与远端一致且工作区干净；
- 没有额外 workflow、分支或标签。

# TASK-005-RELEASE：发布到 GitHub Pages

状态：`PAUSED_BY_TASK-007`

## 目标

将已验收的静态站点发布到 GitHub Pages，并取得可访问的正式 URL。

TASK-006 已由 Codex 验收通过。发布任务继续暂停，等待 TASK-007 建立本地 Git 基线并完成验收。

## 已确认事实

- 应用构建已通过，GitHub Pages Actions 工作流 `.github/workflows/deploy.yml` 已存在。
- 当前工作区不是 Git 仓库，未配置分支、提交历史或远程仓库。
- `astro.config.mjs` 的 `site` 仍为 `https://YOUR_USERNAME.github.io` 占位值。
- 用户已授权创建 RELEASE 并上线，但尚未提供 GitHub 用户名、目标仓库名或既有远程仓库 URL。

## 阻塞条件

在执行任何 Git 初始化、提交、远程仓库创建、推送或 GitHub Pages 发布前，用户必须提供以下其一：

1. 已存在的 GitHub 仓库 HTTPS URL；或
2. GitHub 用户名与要创建的仓库名，并明确允许创建该远程仓库。

同时必须确认仓库类型：

- 用户主页仓库：`<用户名>.github.io`，发布地址为根路径；或
- 普通项目仓库：`<仓库名>`，发布地址为 `/<仓库名>/`。

不得要求、读取、记录或在任务文件中写入 Token、密码、API Key 或其他凭证。

## 解锁后执行范围

仅在上述信息明确提供且用户授权仍有效时：

1. 配置 `astro.config.mjs` 的公开 `site` 与 `base`，匹配仓库类型；
2. 运行 `npm run build`；
3. 初始化本地 Git 仓库，创建 `main` 分支，添加并提交当前项目文件；
4. 添加用户指定的远程仓库，推送 `main`；
5. 在 GitHub 仓库启用 GitHub Actions 作为 Pages 来源（如需要）；
6. 观察 Actions 部署结果，记录正式 URL；
7. 写入 `reports/TASK-005-REPORT.md` 后停止，等待用户通知 Codex 审核。

## 允许修改与操作

- `astro.config.mjs`（仅 `site`、`base`）
- `README.md`（仅正式部署地址与对应说明）
- `reports/TASK-005-REPORT.md`
- 本任务明示的 Git 初始化、提交、添加远程和推送操作
- GitHub Pages 的当前仓库设置

不得修改业务页面、内容、依赖、工作流、全局 Git 身份或任何工作区外文件；不得重写历史、强制推送、创建额外仓库或公开任何凭证。

## 完成报告

报告必须记录：远程仓库 URL、仓库类型、配置的 `site`/`base`、提交 SHA、推送结果、Actions 运行 URL/状态、正式 Pages URL、构建结果和未完成项。末行必须为“等待用户通知 Codex 审核。”

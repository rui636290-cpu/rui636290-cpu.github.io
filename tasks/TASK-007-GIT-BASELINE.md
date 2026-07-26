# TASK-007-GIT-BASELINE：建立 TASK-006 后的本地版本基线

状态：`READY`

## 用户授权

用户已明确要求：

> 初始化本地 Git，以 TASK-006 完成后的状态作为首个基线提交。后续任务全部通过 Git Diff 验收。

本授权只覆盖本任务列出的本地 Git 操作，不覆盖远程仓库创建、添加远程、推送、发布、标签、合并、变基或历史重写。

## 已确认前提

- TASK-006 已由 Codex 验收为 `APPROVED`。
- 当前目录尚不是 Git 仓库。
- 当前机器的全局 Git 作者身份属于实际开发者本人，应保持不变。
- 网站主体与未来远程仓库所有者是丰瑞，目标 GitHub 账号为 `rui636290-cpu`。
- Git 提交作者与远程仓库所有者可以不同，本任务不得修改任何全局或仓库级 Git 姓名、邮箱。
- `.gitignore` 已排除 `node_modules/`、`dist/`、`.astro/`、`.env`、日志等生成物或敏感文件。
- `public/resume/简历待替换.pdf` 和 `public/images/wechat-qr-placeholder.svg` 是已知公开占位资源；本任务只建立当前状态基线，不删除或替换它们，发布前另行治理。

## 目标

1. 以 TASK-006 验收后的当前项目状态创建本地 `main` 分支和首个产品基线提交；
2. 将 TASK-007 执行报告纳入后续仅文档提交；
3. 最终保持工作区干净、无远程仓库，使后续任务可以可靠使用 Git Diff 验收。

## 执行步骤

1. 从磁盘重新读取 `TASK.md`、本任务、`AGENTS.md`、`CLAUDE.md` 和 `.gitignore`。
2. 运行只读检查，确认当前目录仍不是 Git 仓库；如果已经存在 `.git`，停止并写 `BLOCKED` 报告，不得覆盖或重建。
3. 只检查待提交文件名和 Git 暂存清单，不读取 `.env`、认证文件或凭证内容。
4. 运行 `npm run build`。失败时停止，不得创建提交。
5. 执行 `git init -b main`。
6. 不修改任何 Git 作者身份，确认：
   - `git config --get user.name`
   - `git config --get user.email`
   两项可供 Git 正常提交；如果缺失则停止并报告 `BLOCKED`，不得自行补写。
7. 执行 `git add --all`，然后检查：
   - `git status --short`
   - `git diff --cached --check`
   - `git diff --cached --stat`
   - `git diff --cached --name-only`
8. 确认暂存内容不包含 `node_modules/`、`dist/`、`.astro/`、`.env`、日志、认证文件或凭证；发现异常时取消对应暂存并报告 `BLOCKED`，不得提交。
9. 创建首个产品基线提交：

   ```text
   chore: establish TASK-006 baseline
   ```

10. 取得首个提交 SHA，并创建 `reports/TASK-007-REPORT.md`，如实记录所有命令、结果、首个提交 SHA、文件范围和已知风险。
11. 第二次只暂存 `reports/TASK-007-REPORT.md`，确认暂存范围只有该报告，然后创建文档提交：

   ```text
   docs: record TASK-007 execution
   ```

12. 最终验证：
   - 当前分支为 `main`；
   - `git status --short --branch` 工作区干净；
   - `git log --oneline -2` 包含上述两个提交；
   - `git remote -v` 没有输出；
   - `npm run build` 仍通过。
13. 停止并等待用户通知 Codex 审核。

## 允许修改与操作

- 创建当前项目根目录内的 `.git/`；
- 本任务明确列出的本地 Git 初始化、暂存和两次提交；
- 新建 `reports/TASK-007-REPORT.md`；
- 构建产生的已忽略目录；
- 只读 Git、文件清单和构建检查。

除报告外，不得修改、删除或重写任何项目文件。

## 禁止项

- 不修改全局或仓库级 Git 姓名、邮箱和凭证；
- 不创建、添加或修改远程仓库；
- 不执行 `git push`、`git pull`、`git fetch`；
- 不创建标签、额外分支、PR 或 GitHub 仓库；
- 不执行 `reset --hard`、`clean -fd`、变基、强制操作或历史重写；
- 不修改业务代码、内容、依赖、工作流或占位资源；
- 不读取、显示、复制或记录 Token、密码、私钥、`.env` 或认证文件内容。

## 完成报告

写入 `reports/TASK-007-REPORT.md`，必须包含：

1. 状态：`COMPLETED` 或 `BLOCKED`；
2. 首个产品基线提交 SHA；
3. 两次提交的消息与范围；
4. 实际运行的命令及结果；
5. 最终分支、工作区与远程状态；
6. 构建结果；
7. 已知公开占位资源和发布前剩余风险；
8. 末行：`等待用户通知 Codex 审核。`

# TASK-005-RELEASE：发布到丰瑞的 GitHub Pages

状态：`BLOCKED`

## 用户授权

用户已明确提供并授权：

> 完整仓库地址：
> `https://github.com/rui636290-cpu/rui636290-cpu.github.io`
>
> 请先检查当前本地项目的 Git 根目录、当前分支和 remote 配置，确认只操作当前个人网站项目后，再完成 Release。
>
> 允许将当前个人网站代码提交并推送到该仓库。
>
> 禁止强制推送、删除远端历史、修改其他项目或仓库。

本授权仅覆盖本任务列出的当前项目、目标仓库和 GitHub Pages 发布操作。

## Codex 已确认事实

- 当前工作目录与 Git 根目录均为 `D:\fr个人网站\fr个人网站`；
- 当前分支仅有 `main`；
- 当前没有 Git remote、标签或其他本地分支；
- 目标仓库为公开用户主页仓库：
  `https://github.com/rui636290-cpu/rui636290-cpu.github.io`；
- Codex 于 2026-07-26 只读确认目标仓库显示为空；
- 正式站点地址应为 `https://rui636290-cpu.github.io/`，`base` 应为根路径；
- TASK-006、TASK-007、TASK-008、TASK-009 均已由 Codex 验收为 `APPROVED`；
- 当前未提交内容包含上述任务的业务修改、报告和 Codex 治理文件；
- 当前全局 Git 提交身份属于实际开发者本人，必须保持不变；
- `gh` 已安装，但 Codex 检查时现有 `guanlan23333` 登录凭证失效。不得修改、刷新、注销或替换该账号；Git 推送可使用系统已有的正常 Git 凭证流程。

## 目标

1. 再次确认只操作当前个人网站 Git 根目录和唯一目标仓库；
2. 配置用户主页仓库对应的 Astro 正式 URL；
3. 提交全部已验收修改；
4. 在确认远端仍无历史后，使用普通推送发布 `main`；
5. 使现有 GitHub Pages Actions 工作流成功部署；
6. 验证正式 URL 可访问；
7. 写入并提交 Release 报告，最终保持本地工作区干净。

## 允许修改

- `astro.config.mjs`：只修改 `site` 与 `base`；
- `README.md`：只更新正式仓库地址、站点地址和对应发布说明；
- 根目录 `TASK.md` 与本任务状态：只允许在报告前保持当前 `READY`，不得自行判定 `APPROVED`；
- `reports/TASK-005-REPORT.md`；
- 本任务明确授权的当前仓库本地 Git、唯一目标 remote、普通提交、普通推送和该仓库 GitHub Pages 设置。

除上述内容外，不得新增业务修改。当前所有已验收的未提交文件可作为发布内容一起提交，但不得改写其内容。

## 强制边界检查

任何写操作前必须重新运行：

```text
git rev-parse --show-toplevel
git branch --show-current
git branch --format="%(refname:short)"
git remote -v
git status --short --branch
git config --show-origin --get user.name
git config --show-origin --get user.email
git ls-remote --heads --tags https://github.com/rui636290-cpu/rui636290-cpu.github.io
```

必须同时满足：

- Git 根目录规范化后等于 `D:\fr个人网站\fr个人网站`；
- 当前分支为 `main`，且只有该本地分支；
- 当前没有 remote；
- 目标仓库 `git ls-remote --heads --tags` 无任何引用输出；
- Git 身份来自现有配置且未被修改。

任一条件不满足，立即写 `BLOCKED` 报告并停止。远端出现任何分支或标签时，不得添加 remote、推送、拉取、合并、变基或覆盖历史。

## 执行步骤

1. 从磁盘重新读取 `TASK.md`、本任务、`AGENTS.md`、`CLAUDE.md`、`.gitignore`、`astro.config.mjs`、部署工作流和当前 Git Diff。
2. 完成上述强制边界检查。
3. 将 `astro.config.mjs` 配置为：

   ```js
   site: 'https://rui636290-cpu.github.io',
   base: '',
   ```

   不改动其他配置。
4. 最小更新 `README.md`，明确：
   - 仓库：`https://github.com/rui636290-cpu/rui636290-cpu.github.io`
   - 正式站点：`https://rui636290-cpu.github.io/`
   - 当前项目采用用户主页仓库根路径发布。
5. 运行：

   ```text
   npm run build
   git diff --check
   git status --short
   git diff --stat
   git diff --name-status
   git ls-files --others --exclude-standard
   ```

6. 执行 `git add --all` 后检查：

   ```text
   git diff --cached --check
   git diff --cached --stat
   git diff --cached --name-status
   git status --short
   ```

   暂存内容不得包含 `node_modules/`、`dist/`、`.astro/`、`.env`、日志、凭证或范围外文件。
7. 创建发布准备提交：

   ```text
   chore: prepare portfolio release
   ```

8. 仅添加以下 remote：

   ```text
   origin https://github.com/rui636290-cpu/rui636290-cpu.github.io
   ```

   添加后立即用 `git remote -v` 核对 fetch/push URL 完全一致。
9. 仅执行普通推送：

   ```text
   git push -u origin main
   ```

   禁止任何 `--force`、`--force-with-lease` 或 refspec 覆盖。
10. 验证远端 `main` SHA 与本地发布准备提交一致。
11. 检查该仓库 Actions 与 Pages：
    - 观察 `.github/workflows/deploy.yml` 对应运行；
    - 若 Pages 尚未启用，只有在已有 GitHub 身份对目标仓库具备写权限时，才可将该仓库 Pages 发布源设为 GitHub Actions；
    - 不得修改其他仓库、账号、全局认证或工作流文件；
    - 若现有凭证无效、身份无写权限或需要用户交互登录，停止并报告 `BLOCKED`，不得要求或处理 Token、密码。
12. 等待部署运行达到成功或明确失败状态；成功后验证：
    - `https://rui636290-cpu.github.io/` 返回成功响应；
    - 页面标题或正文可识别为丰瑞网站；
    - 首页、代表项目、在线简历三个正式 URL 可访问；
    - 页面源码中没有 `YOUR_USERNAME`、`郭南炎` 或已删除占位资源引用。
13. 写入 `reports/TASK-005-REPORT.md`，记录发布准备提交 SHA、推送、Actions、Pages URL 和验证结果。
14. 如果发布成功：
    - 只暂存 `reports/TASK-005-REPORT.md`；
    - 创建报告提交：

      ```text
      docs: record TASK-005 release [skip ci]
      ```

    - 普通推送该提交；
    - 验证远端 `main` 等于本地报告提交，且没有因报告提交触发新的 push 工作流；
    - 验证本地工作区干净。
15. 停止并等待用户通知 Codex 审核。

## 认证与 Pages 阻塞处理

- 不运行 `gh auth login`、`gh auth refresh`、`gh auth logout`；
- 不读取 Git Credential Manager、keyring、Token、密码、Cookie 或认证文件；
- 可以使用当前系统已经配置且无需 Claude 接触凭证内容的 Git 推送认证；
- 若普通推送或 Pages 配置需要重新登录，由用户自行完成认证后再创建新的继续任务；
- 认证失败不是远端历史冲突，不得用强制推送、改 remote 或新建仓库绕过。

## 禁止项

- 不强制推送，不删除或覆盖远端历史；
- 不执行 `git pull`、合并、变基、reset、clean 或历史重写；
- 不创建其他远程仓库、远程名称、分支、标签、PR 或 Release 标签；
- 不修改其他本地项目、Git 仓库或 GitHub 仓库；
- 不修改全局或仓库级 Git 姓名、邮箱、凭证和认证状态；
- 不修改业务页面、内容、样式、依赖或部署工作流；
- 不读取、显示、复制或记录 Token、密码、私钥、`.env` 或认证文件内容。

## 完成报告

写入 `reports/TASK-005-REPORT.md`，必须包含：

1. 状态：`COMPLETED` 或 `BLOCKED`；
2. Git 根目录、分支和操作的唯一 remote；
3. 远端执行前是否为空；
4. 配置的 `site` 与 `base`；
5. 构建与 Git 检查结果；
6. 发布准备提交完整 SHA；
7. 首次推送结果；
8. Pages 启用方式；
9. Actions 运行 URL、状态和部署 SHA；
10. 正式 Pages URL 与三个页面的验证结果；
11. 预定的报告提交消息；报告提交 SHA 和最终远端/本地状态由 Codex 在后续验收中直接核对；
12. 未完成项、认证阻塞或范围偏差；
13. 末行：`等待用户通知 Codex 审核。`

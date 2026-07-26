# TASK-008-FIX-GIT-REPORT：修正 TASK-007 报告中的提交 SHA

状态：`APPROVED`

## 背景

Codex 验收确认：

- 产品基线提交为 `f98bb47a659ae69fb8668ae9a1d7c8e9684daf97`；
- 报告提交实际为 `b6f3c50f19ec09cd7f2a3d1c1d760adfb1f438aa`；
- `reports/TASK-007-REPORT.md` 错误记录为 `fa4665c`；
- 该提交实际为 1 个文件、106 行新增，报告错误记录为 102 行新增；
- 分支、工作区、远程、Git 身份、提交范围和构建均符合 TASK-007 要求。

## 目标

只修正 TASK-007 执行报告中的错误提交 SHA 和新增行数，使报告与 Git 历史一致。

## 允许修改

- `reports/TASK-007-REPORT.md`
- `reports/TASK-008-REPORT.md`

## 执行步骤

1. 从磁盘重新读取 `TASK.md`、本任务、`AGENTS.md`、`CLAUDE.md` 和 `reports/TASK-007-REPORT.md`。
2. 使用 `git log -2 --format="%H %s"` 只读确认两次提交。
3. 将 `reports/TASK-007-REPORT.md` 中错误的 `fa4665c` 更正为实际短 SHA `b6f3c50`，并将该提交错误的 `102 insertions` 更正为 `106 insertions`；不改写其他事实或措辞。
4. 使用 `git diff --check` 和 `git diff -- reports/TASK-007-REPORT.md` 检查修改。
5. 写入 `reports/TASK-008-REPORT.md`，记录实际命令、修改文件和验证结果。
6. 停止并等待用户通知 Codex 审核。

## 禁止项

- 不修改业务代码、配置、任务文件或协作规则。
- 不执行 `git add`、`git commit`、`git push`、远程操作或历史重写。
- 不修改 Git 身份。
- 不读取或记录凭证、Token、密码、私钥或 `.env` 内容。
- 不运行构建；本任务只修正文档事实，TASK-007 构建已由 Codex 复验通过。

## 验收标准

- `reports/TASK-007-REPORT.md` 中第二次提交 SHA 和新增行数与 Git 历史一致。
- Git Diff 仅包含 Codex 的任务治理文件、修正后的 TASK-007 报告和 TASK-008 执行报告。
- 工作区没有业务代码变化。
- 未新增提交、分支、标签或远程。

## 完成报告

写入 `reports/TASK-008-REPORT.md`，包含：

1. 状态：`COMPLETED` 或 `BLOCKED`；
2. 实际修改文件；
3. 实际命令及结果；
4. Git Diff 范围；
5. 未运行构建的原因；
6. 末行：`等待用户通知 Codex 审核。`

# TASK-012-FIX-DUPLICATE-INNER-NAV：移除项目详情重复返回导航

状态：`APPROVED`

## 验收发现

TASK-011 的方向与构建检查通过，但项目详情页同时渲染：

1. `BaseLayout.astro` 的内页顶部“← 返回首页”；
2. `ProjectLayout.astro` 的案例 Hero“← 返回首页”。

这造成重复导航和多余首屏留白，不符合 V3 的“内页只保留一行简洁返回导航”。

## 目标

只保留 `BaseLayout.astro` 提供的全局内页返回导航，删除项目案例 Hero 中重复的返回链接。

## 允许修改

- `src/layouts/ProjectLayout.astro`
- 新建或覆盖 `reports/TASK-012-REPORT.md`

不得修改其他文件。执行前已有的 TASK-011 业务变更和 Codex 治理变更必须完整保留。

## 执行要求

1. 从磁盘重新读取 `TASK.md`、本任务、`AGENTS.md`、`CLAUDE.md` 和 `src/layouts/ProjectLayout.astro`。
2. 记录执行前 `git status --short`。
3. 删除 `ProjectLayout.astro` 的案例 Hero 返回首页链接。
4. 不调整其他结构、样式、文案或事实。

## 验证

必须运行：

```text
git diff --check
rg -n "返回首页" src/layouts/BaseLayout.astro src/layouts/ProjectLayout.astro
npm run build
```

`rg` 结果必须只剩 `BaseLayout.astro` 一处。

必须用浏览器打开 `/projects/sunscreen-category/`，确认：

- 页面只显示一个“← 返回首页”；
- 页面仍保持项目事实 / 案例正文双栏；
- 返回链接可点击并回到首页；
- 无新增横向滚动。

## 禁止项

- 不提交、暂存、推送、部署、创建分支或标签；
- 不修改 Git 身份、remote 或历史；
- 不修改 CSS、首页、简历、项目内容、依赖或配置；
- 不顺手重构。

## 完成报告

写入 `reports/TASK-012-REPORT.md`，包含：

1. 状态：`COMPLETED` 或 `BLOCKED`；
2. 执行前已有变更；
3. 实际修改文件；
4. 实际命令及结果；
5. 浏览器验证结果；
6. 末行：`等待用户通知 Codex 审核。`

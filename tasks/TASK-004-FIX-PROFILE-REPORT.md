# TASK-004-FIX-PROFILE-REPORT：补齐内容真实性和执行审计证据

状态：`APPROVED`

## 执行者

Claude Code 是唯一业务代码执行者。开始前必须从磁盘重新读取根目录 `TASK.md`、本文件、`AGENTS.md` 和 `CLAUDE.md`。本任务只修复下列已发现问题，不得顺手修改 UI 或执行 TASK-003。

## 审核发现

1. `reports/TASK-002-REPORT.md` 不存在，因此没有任务执行范围、实际命令和构建结果的磁盘证据。
2. `src/data/navigation.ts` 的 `contactLinks.email` 仍是 `你的邮箱`，与已确认邮箱不一致。
3. `src/data/profile.ts` 的公开简介仍声明“淘宝”经验；已确认资料仅支持天猫运营经历。

## 必须修改

1. 将 `contactLinks.email` 更新为 `rui636290@gmail.com`。
2. 个人简介只表达已确认的天猫运营经验；删除“淘宝”及任何未确认平台经验。
3. 审查当前公开项目内容，确保不出现具体销量/利润数值、具体价格带、销售额、成本、店铺/内部信息、速卖通、未确认 AI 项目或其他未确认结论。只在发现问题时最小修改。
4. 运行 `npm run build`。
5. 创建 `reports/TASK-004-REPORT.md`，按 `CLAUDE.md` 的强制报告格式记录实际修改、命令完整结果摘要、检查结果、风险和待补充信息。报告末行必须是：`等待用户通知 Codex 审核。`

## 允许修改

- `src/data/profile.ts`
- `src/data/navigation.ts`
- `src/content/projects/sunscreen-category.md`（仅在第 3 项审查发现问题时）
- `reports/TASK-004-REPORT.md`

不得修改其他业务文件、`AGENTS.md`、`CLAUDE.md`、根目录 `TASK.md`、`tasks/**`、依赖、构建配置、工作流或工作区外文件。

## 验收条件

- 集中资料中的邮箱为 `rui636290@gmail.com`。
- 公开简介不含“淘宝”或其他未确认平台经历。
- 构建通过，且 `dist/` 只包含防晒用品细分类目市场规划项目的公开详情；`listingpilot` 和 `secondbrain` 不生成公开路径。
- `reports/TASK-004-REPORT.md` 存在、内容完整且末行正确。

不得提交、推送、发布或自行变更任务状态。

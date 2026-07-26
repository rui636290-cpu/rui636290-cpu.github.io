# TASK-009-RELEASE-CONTENT-HYGIENE：清理上线前未验证公开内容

状态：`APPROVED`

## 战略依据

网站只展示丰瑞已经确认的求职信息和一个真实项目。当前源码与 `public/` 中仍保留：

- 两个未验证的 AI 项目草稿：`ListingPilot AI`、`SecondBrain`；
- 手机、微信、Boss、GitHub 和 PDF 简历占位字段或资源；
- 一张写有其他人姓名“郭南炎”和错误定位文案的 `og-image.png`。

这些内容即使没有出现在当前页面，也会随公开仓库或静态资源上线，损害真实性。正式素材尚未提供，本任务采用删除而不是伪造替代物。

## Git 基线与已有变更

- 验收基线提交：`b6f3c50f19ec09cd7f2a3d1c1d760adfb1f438aa`。
- 当前已有 Codex 治理与报告变更：
  - `TASK.md`
  - `tasks/TASK-005-RELEASE-GITHUB-PAGES.md`
  - `tasks/TASK-007-GIT-BASELINE.md`
  - `tasks/TASK-009-RELEASE-CONTENT-HYGIENE.md`
  - `reports/TASK-007-REPORT.md`
  - `reports/TASK-008-REPORT.md`
  - `tasks/TASK-008-FIX-GIT-REPORT.md`
- 上述已有变更不是 Claude 的业务修改，不得覆盖、还原或重写。报告必须区分“执行前已有变更”和“本任务产生的变更”。

## 目标

1. 公开源码和静态资源中只保留已确认项目与联系方式；
2. 删除错误身份的社交分享图，并暂时移除对应元标签；
3. 保持现有页面结构、视觉、交互和唯一真实项目不变；
4. 构建通过，为后续独立 RELEASE 任务解除内容阻塞。

## 允许修改

- `src/data/profile.ts`
- `src/data/navigation.ts`
- `src/pages/resume.astro`
- `src/layouts/BaseLayout.astro`
- `README.md`
- 删除 `src/content/projects/listingpilot.md`
- 删除 `src/content/projects/secondbrain.md`
- 删除 `public/images/wechat-qr-placeholder.svg`
- 删除 `public/resume/简历待替换.pdf`
- 删除 `public/og-image.png`
- 新建或覆盖 `reports/TASK-009-REPORT.md`

不得修改其他文件。尤其不得修改真实项目 `src/content/projects/sunscreen-category.md`、样式、依赖、构建配置或部署工作流。

## 执行要求

1. 从磁盘重新读取 `TASK.md`、本任务、`AGENTS.md`、`CLAUDE.md`、允许修改的现有文件及其调用位置。
2. 记录执行前 `git status --short`，识别上述已有治理和报告变更。
3. 在 `src/data/profile.ts` 删除未使用且未经确认的 `phone`、`wechatQr`、`bossLink`、`github` 字段。
4. 在 `src/data/navigation.ts` 删除整个未使用的 `contactLinks` 导出，保留现有 `navigation`。
5. 在 `src/pages/resume.astro` 删除依赖手机号占位值的条件分支，只保留真实邮箱。
6. 删除两个未验证项目草稿和三项占位/错误静态资源。
7. 在 `src/layouts/BaseLayout.astro` 删除 `og:image`、尺寸和图片替代文本元标签；保留 `og:type`、标题、描述、URL 和 Twitter 卡片文本配置。不要创建新的分享图。
8. 最小更新 `README.md`：
   - 资料字段说明只保留实际存在字段；
   - 删除 PDF、微信二维码和个人照片的占位操作说明；
   - “当前仍需用户补充的信息”只保留脱敏项目素材、可验证改善数据和待 RELEASE 确认的 GitHub Pages 地址；
   - 不把未提供的信息描述为即将公开展示。
9. 不改变页面文案、布局、配色、交互或现有路由。

## 验证

必须运行：

```text
git diff --check
git diff -- src/data/profile.ts src/data/navigation.ts src/pages/resume.astro src/layouts/BaseLayout.astro README.md
git diff --name-status
git ls-files --others --exclude-standard
rg -n "你的手机号|你的Boss直聘链接|YOUR_USERNAME|待替换|郭南炎|ListingPilot|SecondBrain" src public
rg -n "og:image|og-image" src public
npm run build
```

两个 `rg` 命令在 `src` 与 `public` 中都应无输出。`YOUR_USERNAME` 仍可存在于 `astro.config.mjs`，由后续 RELEASE 根据准确仓库 URL 配置，不属于本任务失败。

## 验收标准

- 首页、项目页和在线简历仍只呈现丰瑞已确认信息；
- `src/content/projects/` 只剩真实项目；
- `public/` 不再包含占位 PDF、占位微信二维码或错误身份 OG 图片；
- 源码没有未确认联系方式和错误身份引用；
- 无新增依赖、页面、功能或替代素材；
- `npm run build` 通过，Astro 检查为 0 errors、0 warnings、0 hints；
- Claude 产生的业务 Diff 只涉及“允许修改”清单。

## 禁止项

- 不提交、暂存、推送、部署、添加远程、创建分支或标签。
- 不修改 Git 身份、历史或当前已有治理变更。
- 不生成个人照片、二维码、PDF、项目数据图或新的 OG 图片。
- 不虚构联系方式、项目、指标、能力或身份。
- 不顺手重构，不新增依赖。
- 不读取或记录凭证、Token、密码、私钥或 `.env` 内容。

## 完成报告

写入 `reports/TASK-009-REPORT.md`，包含：

1. 状态：`COMPLETED` 或 `BLOCKED`；
2. 执行前已有变更；
3. 本任务实际修改和删除的文件；
4. Git Diff 范围；
5. 实际命令及结果；
6. 构建结果；
7. 未完成项和发布前仍需确认的信息；
8. 末行：`等待用户通知 Codex 审核。`

# TASK-006-UX-UI-REALIGN：按 V2 战略对齐求职体验

状态：`APPROVED`

执行依据：根目录 `PROJECT_STRATEGY.md`。

## 目标

在不改变已确认用户事实的前提下，按 V2 战略完成一次集中 UX/UI 对齐，使首页具备明确招聘转化路径，并与 Rico 的现代视觉原则、陈凯与 Simon Pan 的案例叙事原则对齐。

## 必须完成

1. 合并重复的“求职名片”和“已确认经历”，形成一条快速事实栏；
2. 首屏改为姓名、目标岗位、杭州、真实转型说明与三个明确 CTA；
3. 增加只基于真实经历的三项能力证明；
4. 将唯一代表项目升级为全宽重点案例，并加入本地 SVG 分析路径示意图；
5. 导航中的项目直接进入唯一公开项目详情；
6. 正式 PDF 未提供前不显示可下载按钮，只保留在线简历；
7. 项目详情按战略中的 9 段案例结构优化阅读层级，不增加事实；
8. 更新颜色、字号、宽度、圆角和响应式规则；
9. 保持邮箱唯一真实联系方式、无障碍、主题切换与国内可访问性。

## 禁止项

- 不新增依赖、框架、页面、CMS 或复杂动画；
- 不修改实习、项目结果或个人信息事实；
- 不公开草稿项目；
- 不伪造截图、图表、数字或 AI 实践；
- 不提交、推送或发布。

## 允许修改

- `src/data/profile.ts`（仅定位文案）
- `src/data/navigation.ts`（仅导航与占位 PDF 显示逻辑所需数据）
- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `src/components/ProjectCard.astro`
- `src/components/SectionHeading.astro`
- `src/components/ContactCTA.astro`
- `src/pages/index.astro`
- `src/pages/projects/index.astro`
- `src/pages/projects/[slug].astro`
- `src/pages/resume.astro`
- `public/images/analysis-path.svg`
- `README.md`（仅内容维护说明）
- `reports/TASK-006-REPORT.md`

## 验证

- `npm run build`
- 检查无外部字体、CDN、远程图片或运行时 API；
- 使用本地浏览器检查首页、项目详情、在线简历；
- 检查 390px 与 1440px 视觉、无横向溢出；
- 检查菜单、Escape、主题切换、焦点与 `prefers-reduced-motion`；
- 对照 `PROJECT_STRATEGY.md` 逐项报告完成度。

## 完成报告

写入 `reports/TASK-006-REPORT.md`，记录实际修改、视觉对标落实、验证结果、偏差和剩余问题。末行必须为“等待用户通知 Codex 审核。”

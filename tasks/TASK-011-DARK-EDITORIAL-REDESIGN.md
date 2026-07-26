# TASK-011-DARK-EDITORIAL-REDESIGN：重构为深色双栏求职证据流

状态：`APPROVED`

执行依据：根目录 `PROJECT_STRATEGY.md` V3。

## 背景与问题

当前页面虽然信息完整，但视觉由白底钴蓝、Hero 插画、事实栏、Emoji 能力卡、项目卡、时间线卡和联系卡叠加而成，呈现为常见 SaaS 模板，且与此前 Rico 风格过于接近。

新主对标为 `https://brittanychiang.com/` 的“固定身份侧栏 + 右侧连续阅读”模型。只借鉴信息结构，不复制其薄荷绿、开发者内容、社交栏、动效或具体布局。丰瑞版本使用深墨色 + 暖橙，服务中国大陆招聘者快速判断。

## 目标

1. 首页改为桌面 5/7 双栏：左侧身份与联系常驻，右侧按证据顺序滚动；
2. 删除模板感强的插画、Emoji、胶囊、阴影卡片和重复顶部导航；
3. 将唯一真实项目与实习经历作为视觉核心；
4. 项目详情、在线简历和 404 同步为同一深色编辑式视觉；
5. 保持现有事实、路由、SEO、可访问性和 GitHub Pages 兼容性。

## 首页信息顺序

### 左侧身份栏

- 丰瑞；
- AI 产品助理 / AI 产品经理实习生；
- 杭州；
- 现有真实转型说明；
- 锚点：能力证据、代表项目、实习经历、关于；
- 常驻入口：在线简历、邮箱联系。

### 右侧证据流

1. 三条编号能力证据；
2. 防晒用品细分类目市场规划项目；
3. 天猫运营实习经历；
4. 教育与转型说明；
5. 邮箱联系收尾。

不得为了填充版面新增项目、数字、技能、联系方式或个人故事。

## UI 规范

- 背景：`#111318`；
- 主文字：`#F1F0EC`；
- 次文字：`#A4A7AE`；
- 边线：`#2B3038`；
- 唯一强调色：`#FFB454`；
- 使用系统中文字体，标签可使用系统等宽字体；
- 不使用渐变、光晕、玻璃模糊、阴影、Emoji、状态胶囊、图片或远程资源；
- 内容块以细边线、留白、编号和文字层级区分；
- Hover 只改变文字、边线或极轻背景，不做上移；
- 桌面左栏 sticky；`768px` 以下取消 sticky 并改为单列；
- 在线简历打印时强制白底黑字，隐藏站点导航和打印按钮。

## 实现要求

1. 从磁盘重新读取 `TASK.md`、本任务、`AGENTS.md`、`CLAUDE.md`、`PROJECT_STRATEGY.md` 和所有允许修改文件。
2. 记录执行前 `git status --short`；保留现有 Codex 治理变更，不覆盖、还原或重写。
3. 重写首页结构，使用语义化的 `aside`/`nav`/`section` 或等价结构实现双栏，不增加客户端框架。
4. 首页不再渲染 `analysis-path.svg`；删除该文件。
5. 能力区改为三条编号文本行；可以继续复用 `capabilities` 数据，但不得渲染 Emoji 图标。
6. 项目入口保留整块可点击能力与可见焦点；去掉状态胶囊和卡片阴影。
7. 首页不显示全局顶部栏；内页保留最小导航。可以由当前路径判断首页，不新增配置层。
8. 删除主题切换、手机抽屉菜单及其 JavaScript；网站只保留深色主题。保留 skip link、语义导航和键盘焦点。
9. 项目详情在桌面端形成“项目事实 + 案例正文”双栏，移动端单列；不改项目 Markdown 的事实内容。
10. 在线简历保持可打印，打印样式必须为白底黑字并适合 A4。
11. 不新增依赖、组件库、字体、图片、页面或构建脚本。

## 允许修改

- `src/styles/global.css`
- `src/layouts/BaseLayout.astro`
- `src/layouts/ProjectLayout.astro`
- `src/components/ProjectCard.astro`
- `src/components/ContactCTA.astro`
- `src/pages/index.astro`
- `src/pages/resume.astro`
- 删除 `public/images/analysis-path.svg`
- 新建或覆盖 `reports/TASK-011-REPORT.md`

不得修改其他文件。尤其不得修改 `src/data/profile.ts`、项目 Markdown、依赖、构建配置、GitHub Actions 或已完成任务报告。

## 验证

必须运行：

```text
git status --short
git diff --check
git diff --name-status
rg -n "analysis-path|cap-icon|theme-toggle|mobile-menu|backdrop-filter|box-shadow|linear-gradient|radial-gradient" src public
rg -n "https?://" src public
npm run build
```

第一个 `rg` 命令应无输出。第二个 `rg` 只允许已确认的静态链接；不得出现外部字体、CDN、远程图片或运行时 API。

必须用浏览器检查：

- 首页、项目详情、在线简历；
- `390px` 与 `1440px`；
- 首页左栏 sticky 与移动端取消 sticky；
- 所有锚点、项目入口、在线简历、邮箱链接；
- 键盘 Tab 可见焦点；
- 360px 无横向滚动；
- 在线简历打印预览为白底黑字；
- JavaScript 关闭后内容与导航仍可读可用。

## 验收标准

- 首页视觉已从白底钴蓝卡片模板转为深色暖橙双栏编辑式布局；
- 5 秒内看到姓名、目标岗位和杭州；
- 15 秒内看到能力证据、实习公司或代表项目；
- 30 秒内找到邮箱与在线简历；
- 首页无 Hero 插画、Emoji 能力卡、状态胶囊、浮层阴影和重复顶部栏；
- 三个核心页面视觉统一且移动端无横向溢出；
- 所有公开事实保持不变；
- `npm run build` 通过，Astro 检查为 0 errors、0 warnings、0 hints；
- Claude 的业务 Diff 只涉及允许修改清单。

## 禁止项

- 不提交、暂存、推送、部署、创建分支或标签；
- 不修改 Git 身份、remote 或历史；
- 不复制对标站源码、文案、图片、颜色或个人信息；
- 不增加滚动监听、聚光效果、进场动画或复杂交互；
- 不伪造项目、指标、截图、能力或联系方式；
- 不顺手重构，不新增依赖；
- 不读取或记录凭证、Token、密码、私钥或 `.env` 内容。

## 完成报告

写入 `reports/TASK-011-REPORT.md`，包含：

1. 状态：`COMPLETED` 或 `BLOCKED`；
2. 执行前已有变更；
3. 实际新增、修改、删除的文件；
4. Git Diff 范围与统计；
5. 实际命令及结果；
6. 浏览器验证的页面、视口和结果；
7. 构建结果；
8. 范围偏差、已知风险与未完成项；
9. 末行：`等待用户通知 Codex 审核。`

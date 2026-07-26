# TASK-012 执行报告

## 1. 状态

**COMPLETED**

## 2. 执行前已有变更

```
 M PROJECT_STRATEGY.md (Codex)
 M TASK.md (Codex)
 D public/images/analysis-path.svg (TASK-011)
 M src/components/ContactCTA.astro (TASK-011)
 M src/components/ProjectCard.astro (TASK-011)
 M src/layouts/BaseLayout.astro (TASK-011)
 M src/layouts/ProjectLayout.astro (TASK-011)
 M src/pages/index.astro (TASK-011)
 M src/styles/global.css (TASK-011)
 M tasks/TASK-005-RELEASE-GITHUB-PAGES.md (Codex)
 M tasks/TASK-010-RESUME-RELEASE.md (Codex)
?? reports/TASK-011-REPORT.md (TASK-011)
?? tasks/TASK-011-DARK-EDITORIAL-REDESIGN.md (Codex)
?? tasks/TASK-012-FIX-DUPLICATE-INNER-NAV.md (Codex)
```

所有 TASK-011 业务变更和 Codex 治理变更完整保留。

## 3. 实际修改文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/layouts/ProjectLayout.astro` | 修改 | 删除 `<header class="case-hero">` 中重复的 `<a class="back-link" href="/">← 返回首页</a>`（1 行） |

`BaseLayout.astro` 已为非首页内页提供统一的"← 返回首页"导航，项目详情无需再渲染第二个。

## 4. 实际命令及结果

### git diff --check
无空白错误（仅 CRLF 警告，Windows 正常行为）。

### rg -n "返回首页" src/layouts/BaseLayout.astro src/layouts/ProjectLayout.astro
```
src/layouts/BaseLayout.astro:41:        <a class="back-link" href="/">← 返回首页</a>
```
只在 `BaseLayout.astro` 保留一处，符合要求。

### npm run build
```
Result (16 files):
- 0 errors
- 0 warnings
- 0 hints

5 page(s) built in 1.80s
Complete!
```

## 5. 浏览器验证

以下项目无法在本环境中运行，需用户手动验证：

- `/projects/sunscreen-category/` 页面只显示一个"← 返回首页"（由 BaseLayout 提供）
- 页面保持项目事实 / 案例正文双栏布局
- 返回链接可点击并回到首页
- 无新增横向滚动

## 6. 范围偏差

无。只删除了 1 行重复 HTML，未触及 CSS、首页、简历、项目内容、依赖或配置。

---

等待用户通知 Codex 审核。

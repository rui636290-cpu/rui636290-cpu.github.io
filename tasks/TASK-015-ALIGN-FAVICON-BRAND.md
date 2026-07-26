# TASK-015-ALIGN-FAVICON-BRAND：将浏览器图标对齐 V3 品牌视觉

状态：`APPROVED`

## 背景

当前 `public/favicon.svg` 是青蓝渐变圆角方块和白色字母 “F”，仍属于旧视觉：

- 与 V3 深墨色 + 暖橙配色不一致；
- 英文 “F” 缺乏丰瑞的中文识别性；
- 渐变和字体文字在 16×16 标签页尺寸下没有必要。

本任务只替换一个 SVG，不扩展为 Logo、品牌系统或多尺寸图标工程。

## 目标设计

- 画布：`viewBox="0 0 32 32"`；
- 背景：圆角方块，填充 `#FFB454`；
- 前景：使用 `#111318` 的几何线条组成“丰”；
- 建议结构：三条水平线 + 一条垂直线；
- 线条使用圆角端点，在 16×16 和 32×32 下保持清楚；
- 图形居中，四周保留足够安全边距。

## 实现要求

1. 从磁盘重新读取 `TASK.md`、本任务、`AGENTS.md`、`CLAUDE.md`、`PROJECT_STRATEGY.md` 和当前 `public/favicon.svg`。
2. 记录执行前 `git status --short`，保留 Codex 已有治理变更。
3. 直接覆盖 `public/favicon.svg`：
   - 保留合法 SVG 命名空间和 32×32 `viewBox`；
   - 只使用一个背景 `<rect>` 和最少量的 `<path>` 或 `<line>`；
   - 前景必须是几何化“丰”，不使用 `<text>`。
4. 保持文件路径不变，不修改 `BaseLayout.astro` 的引用。
5. 不创建 PNG、ICO、Apple Touch Icon、manifest 或其他品牌资产。

## 允许修改

- `public/favicon.svg`
- 新建或覆盖 `reports/TASK-015-REPORT.md`

不得修改其他文件。

## 验证

必须运行：

```text
git diff --check
git diff -- public/favicon.svg
rg -n "linearGradient|<text|font-family|#087fbc|#2dbca9" public/favicon.svg
rg -n "#FFB454|#111318" public/favicon.svg
npm run build
```

第一个 `rg` 命令应无输出，第二个应同时匹配两种 V3 颜色。

必须进行视觉检查：

- 直接打开 `/favicon.svg`，确认几何“丰”居中且无裁切；
- 在浏览器标签页刷新首页，确认新图标生效；
- 分别按约 16×16 与 32×32 观察，线条仍可辨认；
- 深色与浅色浏览器标签背景下均有足够对比。

## 验收标准

- 浏览器图标不再出现青蓝渐变和字母 “F”；
- 图标使用暖橙底、深墨色几何“丰”；
- SVG 不依赖字体、渐变、滤镜、脚本或外部资源；
- 页面、路由、内容和构建行为不变；
- `npm run build` 为 0 errors、0 warnings、0 hints；
- Claude 的业务 Diff 仅包含 `public/favicon.svg`。

## 禁止项

- 不修改页面、样式、内容、依赖、配置、任务或历史报告；
- 不新增 Logo 系统、图片格式、manifest 或 PWA 配置；
- 不提交、暂存、推送、部署、创建分支或标签；
- 不修改 Git 身份、remote 或历史；
- 不读取或记录凭证、Token、密码、私钥或 `.env` 内容。

## 完成报告

写入 `reports/TASK-015-REPORT.md`，包含：

1. 状态：`COMPLETED` 或 `BLOCKED`；
2. 执行前已有变更；
3. 实际修改文件；
4. SVG 结构与配色；
5. 实际命令及结果；
6. 视觉检查结果；
7. 范围偏差和未完成项；
8. 末行：`等待用户通知 Codex 审核。`

# typescript-react-antd-git-diff-old-hunks-demo

## 简介

演示 `@git-diff-view/react` 的 Git Diff 模式：只传**旧文件完整内容**和 **git unified diff hunks**，不传新版本全文。库会根据 patch 合成 new 侧内容，并支持像 GitHub 一样展开 hunk 外的上下文行。

## 快速开始

### 环境要求

- Node.js 18+
- pnpm

### 运行

```bash
cd typescript-react-antd-git-diff-old-hunks-demo
pnpm install
pnpm dev
```

浏览器会自动打开 demo 页面。

### 测试

```bash
pnpm test
```

## 注意事项

- 本 demo 使用 `@git-diff-view/core` 的 `DiffFile`，不是 `@git-diff-view/file` 的 `generateDiffFile`。
- `oldContent` 必须是**完整 base 文件**，不能只是 diff 里附带的几行 context。
- `hunks` 必须是对这份 old 文件合法的标准 unified diff（例如 `git diff` 的输出），且需包含 `---`/`+++` 文件头；仅有 `@@` hunk 行时库无法统计增删行。
- 若 old 内容与 hunks 不一致，开发模式下库会在控制台给出 mismatch 警告。
- 仅传 hunks、两侧全文都空时，库会走 `composeByDiff` 路径，**无法展开**更多上下文；本 demo 刻意避免那种输入。

## 教程

### 关键概念

`@git-diff-view/react` 的 `DiffView` 可以接收预处理好的 `diffFile` 实例。Git Diff 模式下，输入是：

1. `oldFileContent`：base 分支完整文件
2. `hunks`：PR patch 或 `git diff` 产物
3. `newFileContent`：留空，由库合成

这与「两份全文交给 `@git-diff-view/file` 自动算 diff」是两条不同路径。

### demo 原理

1. `sampleOldSource.ts` 保存 base 版 `Counter.tsx` 全文
2. `sampleGitHunks.ts` 保存 `git diff --no-index -U3` 生成的 patch（含 `---`/`+++` 文件头）
3. `buildDiffFromOldAndHunks.ts` 创建 `DiffFile` → `initTheme` → `init` → `buildSplitDiffLines` / `buildUnifiedDiffLines`
4. `App.tsx` 把 `diffFile` 交给 `DiffView`，并用 antd 切换 Split/Unified、暗色主题、语法高亮

### 关键代码解读

`buildDiffFromOldAndHunks` 是 demo 核心。new 侧传空字符串，库在 `init()` 里用 old + hunks 推导出 new 全文：

```ts
const file = new DiffFile(fileName, oldContent, fileName, '', hunks, lang, lang)
file.initTheme(theme)
file.init()
file.buildSplitDiffLines()
file.buildUnifiedDiffLines()
```

`getExpandEnabled()` 在本 demo 中应返回 `true`，因为已有完整 old 文件，不属于「仅 hunks 纯 patch 渲染」。

### 三种输入模式对照

**模式 A：old + new 全文（`@git-diff-view/file`）**

- 库内部计算 diff
- 可展开上下文

**模式 B：old 全文 + hunks（本 demo）**

- patch 来自外部（PR API、git diff）
- 库合成 new 全文
- 可展开上下文

**模式 C：仅 hunks**

- 不传任何文件全文
- 库从 patch 反推伪全文
- 不可展开上下文

## 参考

- npm: https://www.npmjs.com/package/@git-diff-view/react
- core: https://www.npmjs.com/package/@git-diff-view/core
- 在线 demo: https://mrwangjusttodo.github.io/git-diff-view

// 从 core 包引入 DiffFile，用于 Git Diff 模式。
import { DiffFile } from '@git-diff-view/core'
// 复用库导出的 DiffFile 类型。
import type { DiffFile as DiffFileType } from '@git-diff-view/core'

// 构建 diff 实例的可选参数。
export type BuildDiffFromOldAndHunksOptions = {
  // 旧文件完整内容。
  oldContent: string
  // git unified diff hunk 字符串数组。
  hunks: string[]
  // 文件名，左右两侧共用。
  fileName?: string
  // 语法高亮语言。
  lang?: string
  // 主题：亮色或暗色。
  theme?: 'light' | 'dark'
}

// diff 统计信息，供 UI 与测试使用。
export type DiffStats = {
  // 新增行数。
  additions: number
  // 删除行数。
  deletions: number
  // 参与 diff 的总行数。
  totalLines: number
}

// 把「旧文件全文 + git hunks」转成可渲染的 DiffFile。
export const buildDiffFromOldAndHunks = ({
  oldContent,
  hunks,
  fileName = 'Counter.tsx',
  lang = 'tsx',
  theme = 'light',
}: BuildDiffFromOldAndHunksOptions): DiffFileType => {
  // new 侧内容留空，库会根据 old + hunks 合成 new 全文。
  const file = new DiffFile(fileName, oldContent, fileName, '', hunks, lang, lang)

  // 设置主题色。
  file.initTheme(theme)
  // 解析 hunks 并合成 new 文件，再跑语法高亮。
  file.init()
  // 构建 split 视图行数据。
  file.buildSplitDiffLines()
  // 构建 unified 视图行数据。
  file.buildUnifiedDiffLines()

  // 返回可直接交给 DiffView 的实例。
  return file
}

// 从 DiffFile 读取增删行统计。
export const getDiffStats = (file: DiffFileType): DiffStats => ({
  additions: file.additionLength,
  deletions: file.deletionLength,
  totalLines: file.fileLineLength,
})

// 读取库是否允许 hunk 展开（old + hunks 模式应为 true）。
export const getExpandEnabled = (file: DiffFileType): boolean => file.getExpandEnabled()

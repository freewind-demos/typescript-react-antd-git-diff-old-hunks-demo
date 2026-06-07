// 引入 diff 视图组件与模式枚举。
import { DiffModeEnum, DiffView } from '@git-diff-view/react'
// 引入 antd 布局与交互组件。
import { Alert, Card, Segmented, Space, Switch, Typography } from 'antd'
// 引入 React hooks 与 FC 类型。
import { FC, useMemo, useState } from 'react'
// 引入 old + hunks 构建与统计工具。
import {
  buildDiffFromOldAndHunks,
  getDiffStats,
  getExpandEnabled,
  getHasCollapsedLines,
} from './buildDiffFromOldAndHunks'
// 引入 git patch 样例。
import { counterGitPatch } from './sampleGitHunks'
// 引入旧版完整源码样例。
import { oldCounterSource } from './sampleOldSource'
// 引入组件默认样式，呈现 GitHub 风格 diff。
import '@git-diff-view/react/styles/diff-view.css'

// 主界面：演示「旧文件全文 + git patch」输入模式。
const App: FC = () => {
  // 当前视图模式：分栏或 unified。
  const [viewMode, setViewMode] = useState<DiffModeEnum>(DiffModeEnum.Split)
  // 是否使用暗色主题。
  const [darkTheme, setDarkTheme] = useState(false)
  // 是否开启语法高亮。
  const [highlight, setHighlight] = useState(true)

  // 主题变化时重新构建 diff 实例。
  const diffFile = useMemo(
    () =>
      buildDiffFromOldAndHunks({
        oldContent: oldCounterSource,
        hunks: [counterGitPatch],
        theme: darkTheme ? 'dark' : 'light',
      }),
    [darkTheme],
  )

  // 从 diff 实例读取增删行统计。
  const stats = useMemo(() => getDiffStats(diffFile), [diffFile])
  // 读取是否允许点击展开折叠上下文。
  const expandEnabled = useMemo(() => getExpandEnabled(diffFile), [diffFile])
  // 读取当前视图里是否真的有折叠行。
  const hasCollapsedLines = useMemo(() => getHasCollapsedLines(diffFile), [diffFile])

  // 根据能力与实际折叠状态生成提示文案。
  const expandHint = !expandEnabled
    ? 'Hunk 展开未启用：通常发生在仅传 hunks、不传任何文件全文的模式。'
    : hasCollapsedLines
      ? '下方 diff 中有折叠区（…）：点击可展开 patch 外的上下文。本 demo 用 git diff -U0 刻意制造折叠。'
      : 'Hunk 展开能力已启用，但当前 patch 覆盖了几乎全部行，看不到折叠区。请改用 -U0 或减少 context。'

  // 渲染整个 demo 页面。
  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <Card title="old 全文 + git patch 演示">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary">
            输入 base 分支 Counter.tsx 完整内容与 git patch（不传 new 全文）。patch 使用
            -U0，文件头部/尾部等未改动行会被折叠；点击折叠条即可从 old 全文展开。
          </Typography.Paragraph>

          <Alert type={hasCollapsedLines ? 'success' : 'warning'} showIcon message={expandHint} />

          <Space wrap>
            <Segmented
              value={viewMode}
              options={[
                { label: 'Split 分栏', value: DiffModeEnum.Split },
                { label: 'Unified 单列', value: DiffModeEnum.Unified },
              ]}
              onChange={(value) => setViewMode(value as DiffModeEnum)}
            />
            <Space>
              <span>暗色主题</span>
              <Switch checked={darkTheme} onChange={setDarkTheme} />
            </Space>
            <Space>
              <span>语法高亮</span>
              <Switch checked={highlight} onChange={setHighlight} />
            </Space>
          </Space>

          <Typography.Text>
            +{stats.additions} / -{stats.deletions}，共 {stats.totalLines} 行参与 diff
          </Typography.Text>

          <DiffView
            diffFile={diffFile}
            diffViewMode={viewMode}
            diffViewTheme={darkTheme ? 'dark' : 'light'}
            diffViewHighlight={highlight}
            diffViewWrap={false}
          />
        </Space>
      </Card>
    </div>
  )
}

// 导出 App 供入口文件挂载。
export default App

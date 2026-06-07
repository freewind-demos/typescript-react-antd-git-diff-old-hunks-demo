// 引入 Vitest 断言工具。
import { describe, expect, it } from 'vitest'
// 引入 old + hunks 构建与统计函数。
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

// 测试 old + hunks 构建逻辑。
describe('buildDiffFromOldAndHunks', () => {
  // 验证样例 patch 的增删行统计。
  it('returns stable stats for the sample counter patch', () => {
    // 只传 old 全文与 git patch，不传 new 全文。
    const file = buildDiffFromOldAndHunks({
      oldContent: oldCounterSource,
      hunks: [counterGitPatch],
    })

    // 读取统计结果。
    const stats = getDiffStats(file)

    // 用 inline snapshot 锁定统计值。
    expect(stats).toMatchInlineSnapshot(`
      {
        "additions": 5,
        "deletions": 3,
        "totalLines": 22,
      }
    `)
  })

  // 验证 old + hunks 模式允许展开折叠上下文。
  it('enables hunk expand because new content is composed from old + hunks', () => {
    // 构建 diff 实例。
    const file = buildDiffFromOldAndHunks({
      oldContent: oldCounterSource,
      hunks: [counterGitPatch],
    })

    // old + hunks 不应走 composeByDiff 纯 patch 路径。
    expect(getExpandEnabled(file)).toBe(true)
  })

  // 验证 -U0 patch 会折叠 patch 外的行，UI 上能看到折叠条。
  it('collapses lines outside the zero-context patch', () => {
    // 构建 diff 实例。
    const file = buildDiffFromOldAndHunks({
      oldContent: oldCounterSource,
      hunks: [counterGitPatch],
    })

    // -U0 只列出变更行，其余行应折叠。
    expect(getHasCollapsedLines(file)).toBe(true)
  })
})

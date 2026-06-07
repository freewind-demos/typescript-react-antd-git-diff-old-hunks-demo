// 演示用的旧版 Counter 完整源码（base 分支快照，故意比 patch 长）。
export const oldCounterSource = `/** Counter demo module */
import { FC, useState } from 'react'

const MIN_COUNT = 0
const MAX_COUNT = 99

// 旧版：只有加号按钮。
export const Counter: FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}

export default Counter
`

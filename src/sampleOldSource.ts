// 演示用的旧版 Counter 完整源码（base 分支快照）。
export const oldCounterSource = `import { FC, useState } from 'react'

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
`

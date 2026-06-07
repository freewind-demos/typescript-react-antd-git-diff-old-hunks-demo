// 由 git diff --no-index -U3 生成的 unified diff（含 ---/+++ 文件头，不含 new 全文）。
// 模拟 PR patch：前端只传 base 文件 + 这段 patch。
export const counterGitPatch = `--- a/Counter.tsx
+++ b/Counter.tsx
@@ -1,13 +1,15 @@
 import { FC, useState } from 'react'
 
-// 旧版：只有加号按钮。
+// 新版：支持加减与重置。
 export const Counter: FC = () => {
   const [count, setCount] = useState(0)
 
   return (
-    <div>
+    <section>
       <p>Count: {count}</p>
+      <button onClick={() => setCount(count - 1)}>-1</button>
       <button onClick={() => setCount(count + 1)}>+1</button>
-    </div>
+      <button onClick={() => setCount(0)}>Reset</button>
+    </section>
   )
 }
`

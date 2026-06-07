// 由 git diff --no-index -U0 生成的 unified diff（零 context，故意折叠 patch 外大量行）。
export const counterGitPatch = `--- a/Counter.tsx
+++ b/Counter.tsx
@@ -7 +7 @@ const MAX_COUNT = 99
-// 旧版：只有加号按钮。
+// 新版：支持加减与重置。
@@ -12 +12 @@ export const Counter: FC = () => {
-    <div>
+    <section>
@@ -13,0 +14 @@ export const Counter: FC = () => {
+      <button onClick={() => setCount(count - 1)}>-1</button>
@@ -15 +16,2 @@ export const Counter: FC = () => {
-    </div>
+      <button onClick={() => setCount(0)}>Reset</button>
+    </section>
`

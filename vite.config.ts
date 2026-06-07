// 引入 Vite 配置定义函数。
import { defineConfig } from 'vite'
// 引入 React 插件，编译 TSX。
import react from '@vitejs/plugin-react'

// 导出 Vite 配置。
export default defineConfig({
  // 启用 React 插件。
  plugins: [react()],
})

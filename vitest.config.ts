// 引入 Vitest 配置工具。
import { defineConfig } from 'vitest/config'

// 导出测试配置，逻辑测试跑在 Node 环境。
export default defineConfig({
  test: {
    environment: 'node',
  },
})

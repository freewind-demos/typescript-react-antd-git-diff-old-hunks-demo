// 引入 React 18 的 createRoot API。
import { createRoot } from 'react-dom/client'
// 引入 antd 全局样式重置。
import 'antd/dist/reset.css'
// 引入主应用组件。
import App from './App'

// 找到挂载点 DOM。
const rootElement = document.getElementById('root')

// 若页面缺少 root 节点，直接抛错，避免静默失败。
if (!rootElement) {
  throw new Error('找不到 #root 挂载点')
}

// 创建 React 18 root 并渲染 App。
createRoot(rootElement).render(<App />)

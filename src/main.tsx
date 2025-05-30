import React from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css'
import './index.css'
import { Inspector, gotoWebStorm } from 'react-dev-inspector'
import { App } from './App'

const container = document.getElementById('root')
if (!container) throw new Error('Failed to find the root element')
const root = createRoot(container)

root.render(
  <React.StrictMode>
      <Inspector
          // onInspectElement={gotoVSCode}
          // onInspectElement={gotoVSCodeInsiders}
          onInspectElement={gotoWebStorm}
      />
    <App />
  </React.StrictMode>,
)

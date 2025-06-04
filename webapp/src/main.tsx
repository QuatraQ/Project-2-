import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'

const rootElement = document.getElementById('root')
if (rootElement == null) {
  throw new Error('Корневой элемент не найден')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

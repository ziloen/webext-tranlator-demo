/* eslint-disable no-console */
import { onMessage } from 'webext-bridge'
import App from './views/App'

// import React from 'react'
import ReactDOM from 'react-dom/client'

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  console.clear()
  console.info('脚本注入')

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title ?? ''}"`)
  })

  // mount component to context window
  const container = document.createElement('div')
  const root = document.createElement('div')
  const styleEl = document.createElement('link')
  const shadowDOM = container.attachShadow?.({ mode: 'closed' }) || container
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)
  document.body.appendChild(container)

  ReactDOM.createRoot(root).render(
    <App />
  )
})()

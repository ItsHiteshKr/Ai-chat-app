import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "@/components/ui/provider"
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'

import ChatProvider from './context/ChatProvider'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChatProvider>
      <Provider>
        <App />
      </Provider>
    </ChatProvider>
  </BrowserRouter>
)

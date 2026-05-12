import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TaskProvider } from './TaskContext.jsx'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import router from "./router/router"

createRoot(document.getElementById('root')).render(
  <TaskProvider>
    <RouterProvider router={router} />
    {/* <App /> */}
  </TaskProvider>
)

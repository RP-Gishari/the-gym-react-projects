import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createContext } from 'react';
import './index.css'
import App from './App.jsx'
import { TaskProvider } from './context/taskContext.jsx';
import Reducer from './reducer/Reducer.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <TaskProvider>

     <App />

    </TaskProvider>
   
  </StrictMode>,
)

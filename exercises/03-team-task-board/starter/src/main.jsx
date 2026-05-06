import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createContext } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { TaskProvider } from './context/taskContext.jsx';
import Reducer from './reducer/Reducer.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <TaskProvider>
    <Routes>
      <Route path="/" element={<App/>}/>
       {/* <Route path="/:id" element = {</>}/>*/}
    </Routes>
    </TaskProvider>
    </BrowserRouter>
   
  </StrictMode>,
)

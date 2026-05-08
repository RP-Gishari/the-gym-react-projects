import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createContext } from 'react';
import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MemberPage from './routers/MembersPage.jsx';
import { TaskProvider } from './context/taskContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <TaskProvider>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/member/:id" element = {<MemberPage/>}/>
    </Routes>
    </TaskProvider>
    </BrowserRouter>
   
  </StrictMode>,
)

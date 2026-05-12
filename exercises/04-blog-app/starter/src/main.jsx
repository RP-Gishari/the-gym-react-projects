import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import MainLayout from './Layout/MainLayout';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
         {/* <Route index element={<App/>}/> */}
      </Route>
     
    </Routes>
    </BrowserRouter>
   
  </StrictMode>,
)

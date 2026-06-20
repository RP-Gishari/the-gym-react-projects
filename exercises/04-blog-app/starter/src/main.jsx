import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import {Provider} from 'react-redux'
//this provider is the one that helps each cpt to access the store
import { store } from './store/store'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store={store}>
    <App/>   
    </Provider> 
   </StrictMode>,
)

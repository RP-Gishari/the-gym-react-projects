
import  MainLayout  from './layouts/MainLayout'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
 


 function Posts(){
    return(
      <h1>Posts page</h1>
    )
  }
  function HomePage(){
    return(
      <h1>Home  page</h1>
    )
  }
  function Author(){
    return(
      <h1>Authors page</h1>
    )
  }

export default function App() {
 
      const router = createBrowserRouter([
      {
        path: '/',
        element: <MainLayout/>,
        children: [
          {index:true, element: <Posts/>},
          {path: 'posts', element: <Author/>},
          {path: 'posts/:slug', element: <HomePage/>},
          {path: 'categories/:slug', element: <HomePage/>},
          {path: 'authors/:id', element: <HomePage/>},
          
        ] 
      }
    ])
    
  return( 
    <RouterProvider router={router} />
   
  )
}







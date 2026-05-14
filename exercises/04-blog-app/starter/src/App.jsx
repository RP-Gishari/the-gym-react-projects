
import  MainLayout  from './layouts/MainLayout'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
 import {HomePage} from './pages/HomePage'
import {PostsPage} from './pages/PostsPage'
import {PostDetailPage} from './pages/PostDetailPage'
import {CategoryPage} from './pages/CategoryPage'
import{AuthorPage} from './pages/AuthorPage'
export default function App() {
 
      const router = createBrowserRouter([
      {
        path: '/',
        element: <MainLayout/>,
        children: [
          {index:true, element: <HomePage/>},
          {path: 'posts', element: <PostsPage/>},
          {path: 'posts/:slug', element: <PostDetailPage/>},
          {path: 'categories/:slug', element: <CategoryPage/>},
          {path: 'authors/:id', element: <AuthorPage/>},
          
        ] 
      }
    ])
    
  return( 
    <RouterProvider router={router} />
   
  )
}







// Design System Showcase
//
// This file is a living reference — not part of the app you are building.
// Run `npm run dev` to see all design system components in one place.
// You will create your actual pages in src/pages/ starting from Milestone 2.
//
// Import any component like this:
  // import { Button, Card, Badge } from './components/ui'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BookmarkPlus, Search, ArrowRight } from 'lucide-react'
import { Avatar, Badge, Button, Card, Input, Textarea } from './components/ui'
import MainLayout from './Layout/MainLayout';
import Navbar from './pages/Navbar'
import Home,{ Loader } from './pages/Home'
import PostList,{PostListLoader} from './pages/PostList';
import PostDetail, {PostDetailLoader} from './pages/PostDetail';
import Category,{CategoryLoader} from './pages/Category';
import AuthorProfile,{ AuthorProfileLoader } from './pages/AuthorProfile';



const router= createBrowserRouter([
      {
        path:"/",
        element:<MainLayout/>,
        children: [
           {
        index:true,
        element:<Home/>,
        loader:Loader
      },
      {
        path:"posts",
        element: <PostList/>,
        loader: PostListLoader

      },
      {
        path:"posts/:slug",
        element: <PostDetail/>,
        loader: PostDetailLoader
      },
      {
        path:"categories/:slug",
        element:<Category/>,
        loader:CategoryLoader
      },
      {
        path:"authors/:id",
        element:<AuthorProfile/>,
        loader: AuthorProfileLoader
      }
        ]
      },
      
    ])
export default function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
        )
}

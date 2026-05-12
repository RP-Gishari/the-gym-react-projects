import { BookmarkPlus, Search, ArrowRight } from 'lucide-react'
import { Avatar, Badge, Button, Card, Input, Textarea } from './components/ui'
import Navbar from './components/Navbar'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home, {loader as HomeData } from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail, {loader as PostDetailData} from "./pages/PostDetail";
import Category from "./pages/Category";
import Author from "./pages/Author";

// I used nested routes with a shared MainLayout so the Navbar appears on every page without repeating code.
// The application has routes for Home, Posts, Post Detail.
// This structure keeps the routing organized, scalable, and easier to maintain.
// I'm remaining the work on the Categories, and Author profiles

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: HomeData
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "posts/:slug",
        element: <PostDetail />,
        loader: PostDetailData
      },
      {
        path: "categories/:slug",
        element: <Category />,
      },
      {
        path: "authors/:id",
        element: <Author />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
import { createBrowserRouter } from "react-router-dom"
import Layouts from "./Layouts"

import Home from "./pages/Home"
import Posts from "./pages/Posts"
import Authors from "./pages/Authors"

const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,

    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "posts",
        element: <Posts />
      },
      {
        path: "authors",
        element: <Authors />
      }
    ]
  }
])

export default AppRouter
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom"

import Layouts from "./Layouts"

import Home, { loader as homeLoader } from "./Pages/Home"
import Posts from "./pages/Posts"
import Authors, { AuthorLoader } from "./pages/Authors"
import PostDetails from "./Pages/PostDetails"
import Category from "./Pages/Category"
import AuthorProfile from "./Pages/AuthorProfile"

const router = createBrowserRouter(

  createRoutesFromElements(

    <Route path="/" element={<Layouts />}>

      <Route index element={<Home />} loader={homeLoader} />

      <Route path="/posts" element={<Posts />} loader={homeLoader} />

      <Route path="/authors" element={<Authors />} loader={AuthorLoader}/>

      <Route path="/posts/:slug" element={<PostDetails />} loader={homeLoader} />

      <Route path="/categories/:slug" element={<Category />} loader={homeLoader} />

      <Route path="/authors/:id" element={ <AuthorProfile />} loader={homeLoader}/>
      

    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
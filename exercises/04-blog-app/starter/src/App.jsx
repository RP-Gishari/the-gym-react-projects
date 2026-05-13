
import  MainLayout  from './layouts/MainLayout'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Navbar from './components/Navbar'



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
 
  
  return( 

    

      {/* <Routes>
        <Route element={<MainLayout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/author' element={<Author/>}/>
        </Route>
      </Routes> */}
   
  )
}









// ── Internal helper components ──────────────────────────────────────────────

// function SectionLabel({ children }) {
//   return (
//     <p className="text-xs font-semibold text-muted uppercase tracking-wider">
//       {children}
//     </p>
//   )
// }

// function Row({ label, children }) {
//   return (
//     <div className="flex items-center gap-4 flex-wrap">
//       {label && <span className="text-xs text-muted w-20 shrink-0">{label}</span>}
//       {children}
//     </div>

//   )
// }

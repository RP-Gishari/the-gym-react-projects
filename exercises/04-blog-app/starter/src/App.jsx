// Design System Showcase
//
// This file is a living reference — not part of the app you are building.
// Run `npm run dev` to see all design system components in one place.
// You will create your actual pages in src/pages/ starting from Milestone 2.
//
// Import any component like this:
//   import { Button, Card, Badge } from './components/ui'

// import { BookmarkPlus, Search, ArrowRight } from 'lucide-react'
// import { Avatar, Badge, Button, Card, Input, Textarea } from './components/ui'
// import Navbar from './components/Navbar'
import  MainLayout  from './layouts/MainLayout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Home, ReceiptPoundSterlingIcon } from 'lucide-react'


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
    <>

      <Routes>
        <Route element={<MainLayout/>}>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/author' element={<Author/>}/>
        </Route>
      </Routes>

      
      {/* <div className="min-h-screen bg-subtle"> */}
      
      {/* <header className="bg-paper border-b border-edge px-8 py-4 flex items-center justify-between sticky top-0">
        <span className="text-base font-bold tracking-tight">Blogify</span>
        <span className="text-sm text-muted">Design System — Milestone 1 reference</span>
      </header> */}



        {/* ── Typography ─────────────────────────────────────────── */}
       

        {/* ── Buttons ────────────────────────────────────────────── */}
      

        {/* ── Badge ──────────────────────────────────────────────── */}
        

        {/* ── Avatar ─────────────────────────────────────────────── */}
        

        {/* ── Card ───────────────────────────────────────────────── */}
      

        {/* ── Form Elements ──────────────────────────────────────── */}
        {/* <section className="space-y-4">
          <SectionLabel>Form elements</SectionLabel>
          <Card>
            <div className="space-y-5">
              <Input
                id="email"
                label="Email address"
                type="email"
                placeholder="you@example.com"
              />
              <Input
                id="search"
                type="search"
                placeholder="Search posts..."
              />
              <Input
                id="error-example"
                label="With validation error"
                placeholder="Enter a value"
                error="This field is required"
              />
              <Textarea
                id="bio"
                label="Bio"
                placeholder="Write a short bio..."
                rows={3}
              />
            </div>
          </Card>
        </section> */}

      {/* </main> */}
    {/* </div> */}
    </>
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

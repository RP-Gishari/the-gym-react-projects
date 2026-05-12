import { Outlet } from "react-router-dom"
import Navbar from "../pages/Navbar"

export default function MainLayout(){

    return (
        <>
        <Navbar/>
        <main className="bg-paper min-h-screen">
            <div className="max-w-4xl mx-auto px-4">
                <Outlet/>
            </div>
        </main>
       
        </>
    )
}
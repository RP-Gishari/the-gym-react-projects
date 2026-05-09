import React from "react";
// import { Button, Input } from "./ui";
 import { NavLink } from "react-router-dom";
 import { Search, Bookmark } from "lucide-react";

export default function Navbar(){


    return(
        <>
            <nav className="flex items-center justify-around pl-1 w-auto h-auto">
                <NavLink to='/' className='font-bold text-2xl'>Blogify</NavLink>
                <div className="flex gap-4 text-lg text-neutral-950">
                    <NavLink to='/posts'>Posts</NavLink>
                    <NavLink to='/authors'>Authors</NavLink>
                    <Search/>
                    <Bookmark/><span>0</span>

                </div>
            </nav>
        </>
    )
}
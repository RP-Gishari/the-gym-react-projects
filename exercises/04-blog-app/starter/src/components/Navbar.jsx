import React from "react";
// import { Button, Input } from "./ui";
 import { NavLink } from "react-router-dom";
 import { Search, Bookmark } from "lucide-react";
 import { Button } from "./ui";

export default function Navbar(){


    return(
        <>
            <nav className="flex justify-around pl-1 w-auto h-auto pt-3 gap-70">
                <div className="items-start">
                        <NavLink to='/' className='font-bold text-2xl'>Blogify</NavLink>
                </div>
                <div className="flex gap-4 text-lg text-neutral-950 items-center">
                    <Button>
                        <NavLink to='/posts'>Posts</NavLink>
                    </Button>
                    <Button>
                        <NavLink to='/authors'>Authors</NavLink>
                    </Button>
                    <Search/>
                    <Bookmark/><span>0</span>

                </div>
            </nav>
        </>
    )
}
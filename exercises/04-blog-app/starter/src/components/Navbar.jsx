import React from "react";
// import { Button, Input } from "./ui";
 import { NavLink } from "react-router-dom";

export default function Navbar(){


    return(
        <>
            <nav className="h-20 flex items-center p-2.5">
                <h1 className="font-bold">Blogify</h1>
                <div className="pl-190">
                    <NavLink to='/posts'>Posts</NavLink>
                    <NavLink to='/authors'>Authors</NavLink>
                    <NavLink to='/about'>About</NavLink>
                </div>
            </nav>
        </>
    )
}
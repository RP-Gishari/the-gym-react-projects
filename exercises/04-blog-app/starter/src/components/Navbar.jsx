import React from "react";
// import { Button, Input } from "./ui";
 import { NavLink } from "react-router-dom";

export default function Navbar(){


    return(
        <>
            <nav className="h-20 flex items-center p-2.5">
                <h1 className="font-bold">Blogify</h1>
                <div className="pl-190">
                    <button>Psts</button>
                    <button>Authors</button>
                    <NavLink to='/about'>Linked</NavLink>
                </div>
            </nav>
        </>
    )
}
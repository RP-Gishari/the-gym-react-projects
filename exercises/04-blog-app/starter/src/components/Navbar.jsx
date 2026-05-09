import React from "react";
import { Button, Input } from "./ui";


export default function Navbar(){


    return(
        <>
            <nav className="h-20 flex items-center p-2.5">
                <h1 className="font-bold">Blogify</h1>
                <div className="pl-190">
                    <button>Posts</button>
                    <button>Authors</button>
                </div>
            </nav>
        </>
    )
}
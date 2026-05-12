import React from "react";
import { BookmarkIcon , SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";


export default function Navbar(){

// I chose to design this component like this inorder to ensure clear visual hierarchy and easy to manage component 


     return <div> 
    
        <header className="bg-paper border-b border-edge px-8 py-4 sticky top-0 flex justify-between">
            
        <span className="text-base font-bold tracking-tight">Blogify</span>
        <span className="flex justify-end gap-5">
        <span className="text-sm text-muted"> Posts </span> 
        <span className="text-sm text-muted"> Authors </span>
        <button><span className="text-sm text-muted"> <SearchIcon size={20}/> </span></button>
       <button> <span className="text-sm text-muted flex justify-end"> <BookmarkIcon size={20}/>0</span> </button>
         </span>

      </header>
    
    
    </div>
}
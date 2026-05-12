import { Link } from "react-router-dom"
import { Search,Bookmark } from "lucide-react"
import { useState } from "react"

export default function Navbar(){

    const [count, setCount]= useState(0)

    function handleBookmark(){
        setCount(prev=>prev+1)
    }

    return (
        <>
        <header className="bg-paper border-b border-edge px-8 py-4 flex items-center justify-between sticky top-0">
            <span className="text-base font-bold tracking-tight">Blogify</span>
            <span className="flex gap-2 items-center text-sm text-ink ">
                <button><Search className="w-4 h-4"/></button>
                <Link to="/all-posts">Posts</Link>
                <Link to="/all-authors">Authors</Link>
                <button  className=" flex flex-row gap-1 items-center " onClick={handleBookmark}>
                    <Bookmark className=" w-4 h-4"/>
                    <span>{count}</span>
                    </button>
                </span>
        </header>
        </>
    )
}
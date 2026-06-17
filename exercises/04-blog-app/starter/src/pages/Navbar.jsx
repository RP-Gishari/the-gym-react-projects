import { Link,NavLink } from "react-router-dom"
import { Search,Bookmark } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/ui"
export default function Navbar(){

    const [count, setCount]= useState(0)

    function handleBookmark(){
        setCount(prev=>prev+1)
    }

    return (
        <>
        <header className="bg-paper border-b border-edge px-8 py-4 flex items-center justify-between sticky top-0">
            <Link to="/" className="text-base font-bold tracking-tight">Blogify</Link>
            <span className="flex gap-2 items-center text-sm text-ink ">
                <Button variant="secondary" size="md"><Search className="w-4 h-4"/></Button>
                <NavLink to="/posts" className={({isActive})=>isActive? " hover:underline":""}>Posts</NavLink>
                <NavLink to="/authors"  className={({isActive})=>isActive? " hover:underline":""}>Authors</NavLink>
                <Button size="md" className=" flex flex-row gap-1 items-center " onClick={handleBookmark}>
                    <Bookmark/>
                    <span>{count}</span>
                    </Button>
                </span>
        </header>
        </>
    )
}
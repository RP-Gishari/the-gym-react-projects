import { Link,NavLink } from "react-router-dom"
import { Search,Bookmark } from "lucide-react"
// import { useState } from "react"
import { useSelector } from "react-redux"
import { selectBookmarkIds } from "../store/bookmarks/bookmarksSlice"
import { Button } from "../components/ui"

export default function Navbar(){
    // const [count, setCount]= useState(0)

    // function handleBookmark(){
    //     setCount(prev=>prev+1)
    // }

    const bookmarkCount= useSelector (selectBookmarkIds).length

    return (
        <>
        <header className="bg-paper border-b border-edge px-8 py-4 flex items-center justify-between sticky top-0">
            <Link to="/" className="text-base font-bold tracking-tight">Blogify</Link>
            <span className="flex gap-2 items-center text-sm text-ink ">
                <Button variant="secondary" size="md">
                    <Search className="w-4 h-4"/>
                </Button>
                <NavLink 
                to="/posts" 
                className={({isActive})=>isActive? "font-medium underline":"hover: underline"}
                >Posts</NavLink>
                <NavLink 
                to="/authors"  
                className={({isActive})=>isActive? "font-medium underline" :" hover:underline"}
                >Authors</NavLink>
                <Button 
                size="md" 
                className=" flex flex-row gap-1 items-center " 
                // onClick={handleBookmark}
                >
                    <span>{bookmarkCount}</span>
                    <Bookmark/>
                    </Button>
                </span>
        </header>
        </>
    )
}
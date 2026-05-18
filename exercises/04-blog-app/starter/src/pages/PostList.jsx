import { Card, Button, Badge,Avatar,Input } from "../components/ui"
import {Link, useLoaderData} from "react-router-dom"
import { apiFetch } from "../hooks/useApi"
import { useState,useMemo } from "react"
import PostCard from "./PostCard"

export async function PostListLoader(){

    const [posts, categories]= await apiFetch('/posts', '/categories')
    const allposts=posts.filter(p=> p.status==='published')
    return{posts:allposts, categories}
}

export default function PostList(){
const {posts,categories}= useLoaderData()
const [search, setSearch]= useState('')
const [activeCategory, setActiveCategory]= useState('All')

const filteredPosts= useMemo(()=>{
    return posts.filter(post=>{
        const matchedSearch= post.title.toLowerCase().includes(search.toLowerCase())
        const matchedCategories= activeCategory=== 'All' || post.category=== activeCategory
        return matchedSearch && matchedCategories
    })
},[posts,search,activeCategory])

    return (
        <>
        <div className=" flex flex-col gap-6 px-4 py-10 ">
        <Input id="post-search" placeholder="Search posts..." value={search} onChange={e=>setSearch(e.target.value)} />
        <div className="flex flex-wrap gap-2">
            {['All', ...categories.map(category=>category.name)].map(c=>(
                <Button
                key={c}
                variant={activeCategory=== c? "primary":"secondary"}
                size= "sm"
                onClick={()=>setActiveCategory(c)}
                > {c}</Button>
            ))}
        </div>
        {filteredPosts.length===0?(
            <p className="text-center text-muted py-20 text-sm">No posts found.</p>
        ):(
            <div>
                {filteredPosts.map(post=>(
                    <PostCard key={post.id} post={post}/>
                ))}
            </div>
        )}
        
</div>
        </>
    )
}



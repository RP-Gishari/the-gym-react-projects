import { Card, Button, Badge,Avatar,Input } from "../components/ui"
import {Link, useLoaderData} from "react-router-dom"
import { apiFetch } from "../hooks/useApi"
import { useState,useMemo } from "react"

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
        <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-8">
            <Input id="post-search" placeholder="Search posts..." value={search} onchange={e=>setSearch(e.target.value)} />
        </div>
        </>
    )
}
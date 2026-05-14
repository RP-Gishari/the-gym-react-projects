import { Card, Badge,Avatar, Button } from "../components/ui"
import { useState,useEffect } from "react"
import { useLoaderData,Link } from "react-router-dom"


 export  async function Loader(){
   
        const [posts, categories, authors ] = await Promise.all([

            fetch("http://localhost:3001/posts"),
            fetch("http://localhost:3001/categories"),
            fetch("http://localhost:3001/users")
        ])

        const [allposts, allcategories, allauthors]= await Promise.all([
            posts.json(),
            categories.json(),
            authors.json()
        ])
     
        const recentPosts= allposts. filter(p=>p.status==="published")
                                    .sort((a,b)=>new Date(b.createdAt)- new Date(a.createdAt))
                                    .slice(0,6)
        return {post:recentPosts, category:allcategories, author:allauthors}//destructuring by name is much safer than by positions
       
    }

export default function Home(){
    const {post, category,author}= useLoaderData()//moved in Home since data lives in route component
  
    return (
        <>
        {/*Hero section */}
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {post.map(p=>{
                return <PostCard key={p.id} post={p}/>
               })}
            </div>
        </section>
        </>
    )
}

function PostCard({post}){

    return (
        <Link to={`/posts/${post.slug}`}>
       <Card padding={false} hover className="overflow-hidden">
        <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover"/>
        <div className="p-4 flex flex-col gap-3">
            <Badge variant="outline" className="self-start">
                {post.category}
            </Badge>
            <h2 className="text-lg font-semibold leading-snug">{post.title}</h2>
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    <Avatar src={post.author?.avatar} name={post.author?.name} size="sm"/>
                    <span className="text-sm text-muted">{post.author?.name}</span>
                </div>
                <span className="text-xs text-muted">{post.readTime}minutes read</span>
            </div>
        </div>
       </Card>
</Link>
    )
    

}
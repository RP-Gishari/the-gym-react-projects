import { Card, Badge,Avatar, Button } from "../components/ui"
import { useState,useEffect } from "react"
import { useLoaderData } from "react-router-dom"


 export async function Loader(){
        try{
           const allposts= await fetch("http://localhost:3001/posts")
          if (!allposts.ok){
                throw new Error ("Failed to fetch the posts")
            }
            const result= await allposts.json()
              const recent= result.filter(p=>p.status ==="published")
                                 .sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt))
                                 .slice(0,6)
             return recent
        }catch (error){
            throw new Error("An error occured")
        }
       
    }

export default function Home(){
    const data= useLoaderData()//moved in Home since data lives in route component
    const [posts, setPosts]= useState([])//holds the posts
    const [error, setError] = useState (null)//tracks the errors

 
    return (
        <>
        {/*Hero section */}
        <section>
            <h1>Most recent posts goes here</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {posts.map(p=>{
                return <PostCard key={p.id} post={p}/>
               })}
            </div>
        </section>
        </>
    )
}

function PostCard(){
    return (
   <div className="rounded-xl overflow-hidden ">
        <img src={p.coverImage} alt={p.title} className="w-full h-48 object-cover"/>
        <div className="p-4 flex flex-col gap-3">
            <span className="self-start text-xs py-1 px-2 rounded-full">
                {p.category}
            </span>
            <h2 className="text-lg leading-snug">{p.title}</h2>
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">

                <img src={p.author.avatar}  alt={p.author.name} className="w-8 h-8 rounded-full object-cover"/>
                <span className="text-sm"> {p.author.name}.</span>
            </div>
            <span className="text-xs">{p.readTime} minutes read</span>
            </div>
        </div>
    </div>
    )
    

}
import { Card, Badge,Avatar, Button } from "../components/ui"
import { useLoaderData,Link } from "react-router-dom"
import { apiFetch } from "../customhooks/useApi"
import PostCard from "../components/PostCard"

 export  async function Loader(){
   
   
        const [allposts, allcategories, allauthors]= await apiFetch('/posts','/categories','/users')
     
        const recentPosts= allposts.filter(p=>p.status==="published")
                                    .sort((a,b)=>new Date(b.publishedAt)- new Date(a.publishedAt))
                                    .slice(0,6)
                                    .map(p=>{
                                const catego= allcategories.find(c=>c.id === p.categoryId)
                                const author= allauthors.find(u=> u.id===p.authorId)
                                return {
                                    ...p,
                                    category: catego?.name ?? '',
                                    categorySlug: catego?.slug ?? '',
                                    author: author ?? null
                                }
                              })
        return {post:recentPosts}//destructuring by name is much safer than by positions
       
    }

export default function Home(){
    const {post}= useLoaderData()//moved in Home since data lives in route component
 
    return (
        <>
        {/*Hero section */}
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10 ">
               {post.map(p=>{
                return <PostCard key={p.id} post={p}/>
               })}
            </div>
        </section>
        </>
    )
}


import { Card, Badge,Avatar, Button } from "../components/ui"
import { useState,useEffect } from "react"

export default function Home(){

    const [posts, setPosts]= useState([])
    const [loading, setLoading]= useState(true)
    const [error, setError] = useState (null)

    useEffect(()=>{
        async function fetchPosts(){
            try {
            const allposts= await fetch ("/posts")

            if (!allposts.ok){
                throw new Error ("Failed to fetch the posts")
            }
            const result= await allposts.json()

        }catch (err){
            setError ("Please, wait a moment. An error occured")
        }finally{
            setLoading (false)
        }

    }
    fetchPosts()
    },[])

    return (
        <>
        {/*Hero section */}
        <section>
            <h1>Most recent posts goes here</h1>

            <div className="grid grid-cols-6">
            </div>
        </section>
        </>
    )
}
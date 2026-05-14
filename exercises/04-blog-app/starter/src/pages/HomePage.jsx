import react from "react";
import useApi from '../hooks/useApi'
import {PostCard} from '../components/PostCard'

export   function HomePage(){
        const {data, error, loading } = useApi('http://localhost:3001/posts')

        if(loading){
            return(<h2>loading....</h2>)
        } 
        if(error){
            return <h2>Error occured</h2>
        } 
        if(!data){
            return <h2>No dat found</h2>
        }
     



     const published = data.filter(post=>{
        return post.status === 'published'
     })

     const latest = published.sort((a,b)=> new Date(b.date) - new Date(a.date))
     const topPosts = latest.slice(0,5)



    return(
        <main>
            <section>
                <h1>Welcome to our Blog</h1>
                <p>warm welcome here</p>
            </section>
            <section>
                {topPosts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })}
            </section>
        </main>
    )
}
import react from "react";
import useApi from '../hooks/useApi'
import {PostCard} from '../components/PostCard'

export   function HomePage(){
        const {data: posts, error: postsError, loading: postsLoading } = useApi('http://localhost:3001/posts')
        const {data: users, error: usersError, loading: usersLoading } = useApi('http://localhost:3001/users')
        const {data: categories, error: categoriesError, loading: categoriesLoading } = useApi('http://localhost:3001/categories')

        if(postsLoading || usersLoading || categoriesLoading){
            return <h2>loading....</h2>
        } 
        if(postsError || usersError || categoriesError ){
            return <h2>Error occured</h2>
        } 
        if(!posts || !users || !categories){
            return <h2>No dat found</h2>
        }

    const globalPost = posts.map(post =>{
        
        const author = users.find(user => post.authorId === user.id)
        const category = categories.find(category => post.categoryId === category.id)

        return{
            ...post,
            author,
            category
        }
    })
     



     const published = globalPost.filter(post=>{
        return post.status === 'published'
     })

     const latest = published.sort((a,b)=> new Date(b.date) - new Date(a.date))
     const topPosts = latest.slice(0,6)



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
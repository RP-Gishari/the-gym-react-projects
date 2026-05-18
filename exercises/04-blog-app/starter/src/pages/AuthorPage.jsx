import react from "react";
import { useParams } from "react-router-dom";
import useApi from '../hooks/useApi'
import { Avatar } from "../components/ui/Avatar";
import {PostCard} from '../components/PostCard'



export  function AuthorPage(){
    let params = useParams()
    const id = params.id;

    const {data: users, error: usersError, loading: usersLoading } = useApi('http://localhost:3001/users')
    const {data: posts, error: postsError, loading: postsLoading } = useApi('http://localhost:3001/posts')
    const {data: categories, error: categoriesError, loading: categoriesLoading } = useApi('http://localhost:3001/categories')


    if(postsLoading || usersLoading || categoriesLoading) return <h1>Loading....</h1>
    if(postsError || usersError || categoriesError) return <h1>an error occured</h1>
    if(!posts || !users || ! categories) return <h1>No data found</h1>

    const globalPost = posts.map(post =>{
        const author = users.find(user=> post.authorId === user.id)
        const category = categories.find(category => post.categoryId === category.id)
        return{
            ...post,
            author,
            category
        }
    })

    const currentAuthor = users.find(user=> user.id === id)
    if(!currentAuthor) return <h1>author not found</h1>

    const authorPosts = globalPost.filter(post=>{
        const published = post.status === 'published'
        const matchingAuthor = post.authorId === currentAuthor.id

        return published && matchingAuthor
    })


    return(
        <section>
            <h1>Posts by {currentAuthor.name}</h1>
             <Avatar
             src={currentAuthor.avatar}
             size="xl"
             />
             <h1
             className="font-bold text-xl">{currentAuthor.name}
             </h1>
             <p
             className="font-bold text-xl">{currentAuthor.bio}
             </p>

             <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {authorPosts.map(post => {
                return <PostCard key={post.id} post={post}/>
             })}
             </section>
        </section>
    )
}
import react from "react";
import { useParams } from "react-router-dom";
import {useApi} from '../hooks/useApi'


export   function PostDetailPage(){
    let params = useParams()

    const {data: posts, error: postsError, loading: postsLoading } = useApi('http://localhost:3001/posts')
    const {data: users, error: usersError, loading: usersLoading } = useApi('http://localhost:3001/users')
    const {data: categories, error: categoriesError, loading: categoriesLoading } = useApi('http://localhost:3001/categories')
    
    if(postsLoading || usersLoading || categoriesLoading) return <h1>Loading....</h1>
    if(postsError || usersError || categoriesError) return <h1>an error occured</h1>
    if(!posts || !users || ! categories) return <h1>No data found</h1>

    const postInfo = posts.map(post=>{
        const author = users.find(user=> post.authorId === user.id)
        const category = categories.find(category => post.categoryId === category.id)
        
        return{
            ...post,
            author,
            category
        }
    })

    const published = postInfo.filter(post=> post.status === 'published')
    const singlePost = published.find(post=>{
        return post.slug === params.slug  
    })
    if(!singlePost) return <h1>Post not found</h1>

    
    return(
        <>
        </>
    )
}
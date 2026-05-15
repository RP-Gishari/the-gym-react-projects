import react from "react";
import useApi from '../hooks/useApi'

export   function PostsPage(){
    const {data: posts, error: postsError, loading: postsLoading } = useApi('http://localhost:3001/posts')
    const {data: users, error: usersError, loading: usersLoading } = useApi('http://localhost:3001/users')
    const {data: categories, error: categoriesError, loading: categoriesLoading } = useApi('http://localhost:3001/categories')

    if(postsLoading || usersLoading || categoriesLoading) return <h1>Loading....</h1>
    if(postsError || usersError || categoriesError) return <h1>an error occu</h1>
    if(!posts || !users || ! categories) return <h1>No data found</h1>
    return(
        <h2>PostsPage page goes in this file</h2>
    )
}
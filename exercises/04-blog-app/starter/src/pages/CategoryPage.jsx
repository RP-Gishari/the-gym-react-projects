import react from "react";
import useApi from '../hooks/useApi'
import { useParams } from "react-router-dom";
import {PostCard} from '../components/PostCard'

export   function CategoryPage(){
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

    const matchingCategory = categories.find(category=> category.slug === params.slug)
    if(!matchingCategory) return <h1>Category not found</h1>

    const filteredPosts = postInfo.filter(post=>{
        const published = post.status === 'published'
        const matchedCategory = post.category.slug === matchingCategory.slug
        
        return published && matchedCategory
    })


    return(
        <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {matchingCategory.name}
      </h1>

      {filteredPosts.length === 0 ? (
        <h2>No posts found in this category</h2>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </section>
      )}
    </main>
    )
}
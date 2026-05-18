import react, { useState } from "react";
import useApi from '../hooks/useApi'
import {Input} from '../components/ui/Input'
import {PostCard} from '../components/PostCard'

export   function PostsPage(){
    const {data: posts, error: postsError, loading: postsLoading } = useApi('http://localhost:3001/posts')
    const {data: users, error: usersError, loading: usersLoading } = useApi('http://localhost:3001/users')
    const {data: categories, error: categoriesError, loading: categoriesLoading } = useApi('http://localhost:3001/categories')
     const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')

    if(postsLoading || usersLoading || categoriesLoading) return <h1>Loading....</h1>
    if(postsError || usersError || categoriesError) return <h1>an error occured</h1>
    if(!posts || !users || ! categories) return <h1>No data found</h1>
 
    const globalPost = posts.map(post =>{
        const author = users.find(user=>post.authorId === user.id)
        const category = categories.find(category=> post.categoryId === category.id)
        return{
            ...post,
            author,
            category
        }
    })

    const publishedPosts =  globalPost.filter(post =>post.status === 'published')

    const searchFilteredPosts = publishedPosts.filter(item=>{
        const searched=  item.title.toLowerCase().includes(search.toLowerCase())
        const selected = selectedCategory === 'all' || item.category.slug === selectedCategory
        return searched && selected
    })
    return(
        <>
        <h2>PostsPage page goes in this file</h2>
        <Input 
        value={search}
        onChange={((e)=>setSearch(e.target.value))}
         
        ></Input>

        <section>
            <button onClick={()=> setSelectedCategory('all')}>All</button>
        {categories.map(category=>(
            <button
            key={category.id}
            onClick={()=>setSelectedCategory(category.slug)}
            >{category.name}</button>
        ))}

        </section>
          <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {searchFilteredPosts.map(post=>(
                <PostCard key={post.id} post={post}/>
            ))}
          </section>
        
        </>
    )
}
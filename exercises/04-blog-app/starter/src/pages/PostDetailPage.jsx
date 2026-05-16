import react from "react";
import { useParams } from "react-router-dom";
import useApi from '../hooks/useApi'
import { Badge } from "../components/ui/Badge";
import {Avatar} from '../components/ui/Avatar'
import {Button} from '../components/ui/Button'
import { Link } from "react-router-dom";

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

    const paragraph = singlePost.content.split('\n\n')
    
    return(
       <main className="max-w-180">
        <img src={singlePost.coverImage}/>
        <Link to={`/categories/${singlePost.category.slug}`}>
            <Badge>
                {singlePost.category.name}
            </Badge>
        </Link>
        <article>
            <h1>{singlePost.title}</h1>
            <div className="flex gap-50">
                <div className="flex items-center gap-2">
                    <Avatar
                    src={singlePost.author.avatar}/>
                    <Link to={`/authors/${singlePost.author.id}`}>
                        <h3>{singlePost.author.name}</h3>
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <h3>{singlePost.publishedAt}</h3>
                    <span>🕒</span><h3>{singlePost.readTime}</h3>
                </div>
            </div>

            <section>
                {paragraph.map(para=>{
                    return <p key={para.para}>{para}</p>
                })}
            </section>

            <Link to='/posts'>
                <Button>
                Back to posts
                </Button>
            </Link>
            

        </article>
       </main>
    )
}
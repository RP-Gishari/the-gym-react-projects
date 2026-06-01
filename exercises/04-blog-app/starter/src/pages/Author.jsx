import useApi from "../hooks/useApi"
import { Link, useParams } from "react-router-dom"

export default function Author(){
    const { posts, categories, users } = useApi()
    const params = useParams()
    const author = users.find(user => user.id === params.id)
    const authorsPosts = posts.filter(post => post.authorId === params.id && post.status === "published")

    return(
        <div className="space-y-10">
            <div className="space-y-5">
                <div className="space-y-3">                    
                <h1 className="text-5xl text-muted">{author?.name}</h1>
                <p className="leading-7">{author?.bio}</p>
                </div>
            </div>
            <div className="space-y-8">
                <h2 className="text-3xl font-bold">Published Posts</h2>
                <div className="grid gap-6">
                    {authorsPosts.map(post =>{
                        const category = categories.find(cat => cat.id === post.categoryId)
                        return(
                            <Link key={post.id} to={`/posts/${post.slug}`} className="rounded-full border-b border-edge">                            
                                <h2 className="rounded-full px-3 py-1 text-sm text-muted">{category?.name}</h2>
                                <div className="space-y-3">
                                    <span className="text-2xl font-bold text-ink">{post.title}</span>
                                    <p className="leading-7 text-muted py-2">{post.excerpt}</p>
                                    <p className="text-sm">{post.readTime} read mins</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
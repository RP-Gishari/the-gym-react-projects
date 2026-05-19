import useApi from "../hooks/useApi"
import { Link, useParams } from "react-router-dom"
import { BookmarkPlus } from "lucide-react"

export default function Category(){
    const { posts, categories, users } = useApi()
    const { slug } = useParams()
    const params = useParams()
    const category = categories.find(cat => cat.slug === params.slug)
    const filteredPosts = posts.filter(post => post.categoryId === category?.id && post.status === "published")
    return(
        <div className="space-y-8">
            <div className="">
                <h2 className="text-5xl font-bold pb-6">{category?.name}</h2>
                <p className="text-ink">Posts in this category</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                {filteredPosts.map(post =>{
                    const author = users.find(user => user.id === post.authorId)
                    return(
                        <div key={post.id} className="">
                            <Link to={`/posts/${post.slug}`}>
                            <img src={post.coverImage} alt={post.title} className="rounded-lg" />
                            <div className="space-y-6 py-4">
                                <span className="text-sm bg-subtle px-3 py-1 rounded-full">{category?.name}</span>
                                <h1 className="text-2xl font-bold">{post.title}</h1>
                                <p className="text-muted leading-7">{post.excerpt}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <img src={author?.avatar} alt={author?.name} className="w-10 h-10 rounded-full" />
                                    <span className="text-sm text-ink">{author?.name}</span>
                                </div>
                                <div className="flex items-center gap-5">
                                    <p className="text-muted">{post.readTime} mins</p>
                                    <button className="rounded-md p-2 hover:bg-subtle"><BookmarkPlus size={18} /></button>
                                </div>
                            </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
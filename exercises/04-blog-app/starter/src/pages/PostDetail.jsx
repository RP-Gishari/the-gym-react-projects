import { Link, useParams } from 'react-router-dom'
import useApi from "../hooks/useApi"

export default function PostDetail(){
    const { posts, categories, users } = useApi();
    const { slug } = useParams()
    const post = posts.find(p => p.slug === slug)
    if(!post){
        return <p className="">Loading...</p>
    }
    const paragraphs = post.content.split("\n\n")
    const category = categories.find( c => c.id === post.categoryId)
    const author = users.find(u => u.id === post.authorId)

    return(
        <div className="m-auto max-w-4xl space-y-8">
            <Link to="/posts" className="inline-block text-sm text-muted">Back to posts</Link>
            <img src={post.coverImage} alt={post.title} className="h-400px w-full object-cover rounded-3xl" />
            <div className="space-y-8">
             <span className="rounded-full px-3 py-2 text-sm leading-tight">{category?.name}</span>
             <h1 className="text-5xl font-bold">{post.title}</h1>
            </div>
            <div className="flex items-center justify-between pb-6">
                <Link to={`/authors/${author.id}`} className="flex items-center gap-3">
                <img className="rounded-full w-10 h-10" src={author?.avatar} alt={author?.name} />
                <div className="">
                 <p className="text-ink">{author.name}</p>
                 <p className="text-sm text-muted">{post.publishedAt}</p>
                </div>
                </Link>
                <p className="text-muted">{post.readTime} read mins</p>
            </div>
            <div className="m-auto space-y-6">
                {paragraphs.map((para, index) =>(
                    <p key={index} className="text-lg">{para}</p>
                ))}
            </div>
           
        </div>
    )
}
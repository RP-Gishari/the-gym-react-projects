import { Card,Button, Badge, Avatar } from "../components/ui"
import PostCard from "../components/PostCard"
import { useLoaderData, useNavigate,Link } from "react-router-dom"
import { apiFetch } from "../customhooks/useApi"
import { ArrowLeft } from "lucide-react"


export async function PostDetailLoader({params}){
    const [posts,users]= await apiFetch('/posts','/users')
    
    const post= posts.find(p=>p.slug=== params.slug && p.status=== 'published')
    if(!post){
        throw new Response('Post not found',{status:404})
    }
    const author= users.filter(u=>u.id===post.authorId)
    return {post,author}

}

export default function PostDetail(){

    const {post,author} = useLoaderData()
    const navigate= useNavigate()
    const paragraphs= post.content.split("\n\n")

    return (
        <>
        <div className="max-w-[720px] mx-auto px-4 py-10 flex flex-col gap-8">

      <Button
        onClick={() => navigate('/posts')}
        className="self-start "
      >
        <ArrowLeft/>Posts
      </Button>

      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg"
      />

      <div className="flex flex-col gap-4">
        <Badge variant="outline" className="self-start">{post.category}</Badge>
        <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={author?.avatar} name={author?.name} size="md" />
            <div className="flex flex-col">
              <Link
                to={`/authors/${author?.id}`}
                className="text-sm font-medium text-ink hover:underline"
              >
                {author?.name}
              </Link>
              <span className="text-xs text-muted">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
          <span className="text-sm text-muted">{post.readTime} min read</span>
        </div>
      </div>

      <article className="flex flex-col gap-4">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="text-base leading-relaxed text-ink">
            {paragraph}
          </p>
        ))}
      </article>

    </div>
        </>
    )
}
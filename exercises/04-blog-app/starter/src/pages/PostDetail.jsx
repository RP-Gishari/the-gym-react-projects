import { Card,Button, Badge, Avatar } from "../components/ui"
import PostCard from "../components/PostCard"
import { useLoaderData, useNavigate,Link } from "react-router-dom"
import { apiFetch } from "../customhooks/useApi"
import { ArrowLeft } from "lucide-react"


export async function PostDetailLoader({params}){
    const [posts,users, categories]= await apiFetch('/posts','/users','/categories')
    
    const post= posts.find(p=>p.slug=== params.slug && p.status=== 'published')
    if(!post){
        throw new Response('Post not found',{status:404})
    }
    const author = users.find(u=>u.id === post.authorId)
    // const author= users.filter(u=>u.id===post.authorId)
    const category= categories.find(c=>c.id === post.categoryId)
    return {post,author,category}

}

export default function PostDetail(){

    const {post,author,category} = useLoaderData()
    const navigate= useNavigate()
    const paragraphs= post.content.split("\n\n")

    return (
        <>
        <div className="max-w-180 mx-auto px-4 py-10 flex flex-col gap-8">

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
        {/*category links to /categories/:slug */}
        <Link to={`/categories/${category?.slug}`}>
        <Badge variant="outline" className="self-start">{category?.name}</Badge>
        </Link>

        <h1 className="text-3xl font-bold text-ink leading-tight">{post.title}</h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar 
            src={author?.avatar} 
            name={author?.name} 
            size="md" 
            />
            <div className="flex flex-col">
              <Link
                to={`/authors/${author?.id}`}
                className="text-sm font-medium text-ink hover:underline"
              >
                {author?.name}
              </Link>
              <span className="text-xs text-muted">
                {  post.publishedAt ? 
                new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }):""}
              </span>
            </div>
          </div>
          <span className="text-sm text-muted">{post.readTime} minutes read</span>
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
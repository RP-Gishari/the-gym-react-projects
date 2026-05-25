
import { useLoaderData, Link } from "react-router-dom"
import { Avatar, Badge } from "../components/ui"
import PostCard from "../components/PostCard"
import { apiFetch } from "../customhooks/useApi"


export async function AuthorProfileLoader({params}){
const [users,posts, categories]= await apiFetch('/users', '/posts','/categories')

const author= users.find (u=>u.id === params.id)

if (!author){
    throw new Response ('Author not found',{status: 404})
}

//published post by this author
const enrichedPosts= posts.filter(p=> p.status === 'published' && p.authorId === author.id)
                         .map(p=> ({
                            ...p,
                            category: categories.find(c=> c.id===p.categoryId)?.name ?? '',
                            author :author// attach author object so PostCard can render it
                         }))
return {author, posts:enrichedPosts}

}

export default function AuthorProfile(){
    const {author,posts}= useLoaderData()

    return(
        <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-10">
 {/* Author profile header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Avatar src={author.avatar} name={author.name} size="xl" />
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-ink">{author.name}</h1>
          <p className="text-sm text-muted leading-relaxed max-w-prose">{author.bio}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-edge" />

      {/* Posts section */}
      <div className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold text-ink">
          {posts.length} published {posts.length === 1 ? 'post' : 'posts'}
        </h2>

        {posts.length === 0 ? (
          <p className="text-center text-muted py-20 text-sm">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(p => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </div>
        </div>
    )


}
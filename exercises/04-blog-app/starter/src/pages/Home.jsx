import { Link, useLoaderData } from "react-router-dom"
import { BookmarkPlus } from "lucide-react"
import useApi from "../hooks/useApi"

function Home() {
  const { posts, categories, users } = useApi()

  return (
    <div className="mx-auto grid max-w-5xl gap-8 p-6">
      {posts.map(post => {
        const matchCategory = categories.find(cat => cat.id === post.categoryId)
        const MatchedAuthor = users.find(user => user.id === post.authorId)
        return (
          <div key={post.id} className="overflow-hidden rounded-lg border border-edge bg-paper">
            <Link to={`/posts/${post.slug}`}>
             <img className="h-64 w-full object-cover" src={post.coverImage} alt={post.title} />
              <div className="space-y-5 p-6"> 
              <div><span className="rounded-full bg-subtle px-4 py-1 text-sm text-muted">{matchCategory?.name}</span></div>
              <h1 className="text-3xl font-bold leading-tight text-ink">{post.title}</h1>
              <p className="leading-7 text-muted">{post.excerpt}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img className="h-10 w-10 rounded-full object-cover" src={MatchedAuthor?.avatar} alt={MatchedAuthor?.name} />
                  <span className="text-sm text-ink">{MatchedAuthor?.name}</span>
                </div>

                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted">{post.readTime} mins</p>
                  <button className="rounded-md p-2 transition hover:bg-subtle"><BookmarkPlus size={18} /></button>
                </div>
              </div>
            </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Home;
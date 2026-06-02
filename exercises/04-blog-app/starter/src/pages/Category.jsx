import { useLoaderData,Link } from "react-router-dom"
import PostCard from "../components/PostCard"
import { apiFetch } from "../customhooks/useApi"

export async function CategoryLoader({params}){
    const [categories, posts, users]= await apiFetch('/categories','/posts','/users')
    
    //find category that matches the URL slug
    const category= categories.find(c=> c.slug=== params.slug )

  if (!category){
        throw new Response('Category not found', {status:404})
    }

    //get only published posts that belong to this category,
    //and attach the author object to each post so PostCard can use it.
    const enrichedPosts= posts.filter(p=>p.status==='published' && p.categoryId=== category.id)
                      .map(p=>(
                        {...p, 
                        // category:categories.find(c=> c.id === p.categoryId && c.slug=== params.slug),
                        category:category.name, // attach category name string
                        author: users.find(u=> u.id === p.authorId) //attach full author object
                    }))
                    
  
    // const author= users.filter(u=>u.id===post.authorId)

    return {category,posts:enrichedPosts}
}


export default function Category(){
    const {category, posts}=useLoaderData()
    return (
        <>
         <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-8">

        {/*category heading*/}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold text-ink">{category.name}</h1>
        <p className="text-sm text-muted">{posts.length} published {posts.length === 1 ? 'post' : 'posts'}</p>
      </div>

        {posts.length===0 ? (
            <p className="text-center text-muted py-20 text-sm">No posts found in this category</p>
        ):(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(p => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
        )}
        </div>
        </>
    )
}
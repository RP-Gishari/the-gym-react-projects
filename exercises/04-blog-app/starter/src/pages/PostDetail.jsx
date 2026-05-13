import { Link, useLoaderData, useParams } from 'react-router-dom'

export async function loader({ params }){
    const [ postsData, categoriesData, usersData ] = await Promise.all([
        fetch("http://localhost:3001/posts"),
        fetch("http://localhost:3001/categories"),
        fetch("http://localhost:3001/users"),
    ])

    const posts = await postsData.json();
    const categories = await categoriesData.json();
    const users = await usersData.json();
    const post = posts.find(p => p.slug === params.slug)

    return { post, categories, users }
}

export default function PostDetail(){
    const { post, categories, users } = useLoaderData();
    const category = categories.find( c => c.id === post.categoryId)
    const author = users.find(u => u.id === post.authorId)
    const paragraphs = post.content.split("\n\n")

    return(
        // <h1>Post Detail Page</h1>
        <div className="m-auto max-w-4xl space-y-8">
            <Link to="/posts" className="inline-block text-ink text-sm text-muted">Back to posts</Link>
            <img src={post.coverImage} alt={post.title} className="h-[400px] w-full object-cover rounded-3xl" />
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
        </div>
    )
}
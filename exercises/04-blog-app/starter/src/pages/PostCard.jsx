
import { Link } from "react-router-dom";
import { Card,Badge,Avatar } from "../components/ui";



export default function PostCard({post}){

    return (
        <Link to={`/posts/${post.slug}`}>
       <Card padding={false} hover className="overflow-hidden">
        <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover"/>
        <div className="p-4 flex flex-col gap-3">
            <Badge variant="outline" className="self-start">
                {post.category}
            </Badge>
            <h2 className="text-lg font-semibold leading-snug">{post.title}</h2>
            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    <Avatar src={post.author?.avatar} name={post.author?.name} size="sm"/>
                    <span className="text-sm text-muted">{post.author?.name}</span>
                </div>
                <span className="text-xs text-muted">{post.readTime}minutes read</span>
            </div>
        </div>
       </Card>
</Link>
    )
    

}
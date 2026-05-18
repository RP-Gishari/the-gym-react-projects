import React from "react";
import {Card} from './ui/Card'
import {Badge} from './ui/Badge'
import {Avatar} from './ui/Avatar'
import {Link} from 'react-router-dom'

export function PostCard({post}){
    return(
        <>
            <Card>
                
                <section>
                <Link to={`/posts/${post.slug}`}>
                    <img src={post.coverImage} alt={`cover image for ${post.title}`}></img>
                </Link>
                <Badge>
                    <Link to={`/categories/${post.category.slug}`}>
                    <h1>{post.category.name}</h1>
                </Link> 
                </Badge>
                <Link to={`/posts/${post.slug}`}>
                    <h1>{post.title}</h1>
                </Link>
                <h2>{post.excerpt}</h2>
                
                    <div className="flex gap-7 items-center">
                        <div className="flex gap-1 items-center">
                            <Avatar 
                            src={post.author.avatar}>
                            name={post.author.name}
                            </Avatar>
                        <h3>{post.author.name}</h3>
                        </div>
                        <div className="flex">
                            <span>🕒</span><h3>{post.readTime}</h3>
                        </div>
                    </div>
                </section>
                
            </Card>
        </>

    )
}
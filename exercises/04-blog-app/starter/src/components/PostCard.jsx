import React from "react";
import {Card} from './ui/Card'
import {Link} from 'react-router-dom'

export function PostCard({post}){
    return(
        <>
            <Card>
                
                <section>
                <Link to={`/posts/${post.slug}`}>
                    <img src={post.coverImage} alt="cover-page"></img>
                </Link>
                <button>{post.category.name}</button>
                <Link to={`/posts/${post.title}`}>
                    <h1>{post.title}</h1>
                </Link>
                <h2>{post.excerpt}</h2>
                
                    <div>
                        <img src={post.author.avatar} alt="author avatar"></img>
                        <h3>{post.author.name}</h3>
                    </div>
                </section>
                
            </Card>
        </>

    )
}
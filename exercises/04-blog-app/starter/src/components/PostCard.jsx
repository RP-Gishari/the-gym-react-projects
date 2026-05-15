import React from "react";
import {Card} from './ui/Card'

export function PostCard({post}){
    return(
        <main>
            <section>
                <img src={post.coverImage}></img>
                <button>{post.category.name}</button>
                <h1>{post.title}</h1>
                <h2>{post.excerpt}</h2>
                
                <div>
                    <img src={post.author.avatar}></img>
                    <h3>{post.author.name}</h3>
                </div>
            </section>
            <Card/>
        </main>

    )
}
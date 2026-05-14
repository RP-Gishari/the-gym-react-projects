import React from "react";
import {Card} from './ui/Card'

export function PostCard({post}){
    return(
        <main>
            <section>
                <img src={post.coverImage}></img>
                <button>{post.categoryId}</button>
                <h1>{post.title}</h1>
                <h2>{post.excerpt}</h2>
                
                <div>
                    <img src={post.coverImage}></img>
                    <h3>{post.authorId}</h3>
                </div>
            </section>
            <Card/>
        </main>

    )
}
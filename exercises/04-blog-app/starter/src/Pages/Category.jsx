import React from "react"

import { useLoaderData, useParams, Link } from "react-router-dom"
import { Card, Badge, Avatar } from "../components/ui"

function Category() {

  const { slug } = useParams()
  const { posts, users, categories } = useLoaderData()

  const matchedCategory = categories.find(
    cat => cat.slug === slug
  )

  if (!matchedCategory) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-ink">
          Category not found
        </h1>
      </div>
    )
  }

  const categoryPosts = posts.filter(
    post =>
      post.categoryId === matchedCategory.id &&
      post.status === "published"
  )

  return (

    <div className="max-w-5xl mx-auto p-6 space-y-8">

      {/* Header */}
      <h1 className="text-4xl font-bold text-ink">
        {matchedCategory.name}
      </h1>

      {/* Posts grid */}
      <div className="grid gap-8">

        {categoryPosts.map(post => {

          const matchedAuthor = users.find(
            user => user.id === post.authorId
          )

          return (

            <Card
              key={post.id}
              className="overflow-hidden rounded-3xl border border-edge bg-paper"
            >

              <Link to={`/posts/${post.slug}`}>

                {/* Image */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-64 w-full object-cover"
                />

                <div className="p-6 space-y-4">

                  {/* Badge */}
                  <Badge>
                    {matchedCategory.name}
                  </Badge>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-ink">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted leading-6">
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-edge">

                    <div className="flex items-center gap-3">

                      <Avatar
                        src={matchedAuthor?.avatar}
                        name={matchedAuthor?.name}
                        size="md"
                      />

                      <span className="text-sm text-ink">
                        {matchedAuthor?.name}
                      </span>

                    </div>

                    <span className="text-sm text-muted">
                      {post.readTime} mins
                    </span>

                  </div>

                </div>

              </Link>

            </Card>

          )
        })}

      </div>

    </div>
  )
}

export default Category
import { useParams, useLoaderData, Link } from "react-router-dom";
import { Card, Badge, Avatar, Button } from "../components/ui";

function PostDetails() {

  const { slug } = useParams()

  const { posts, categories, users } = useLoaderData()

  const matchedPost = posts.find(
    post => post.slug === slug
  )

  if (!matchedPost) {
    return <h1>Post not found</h1>
  }

  const matchedCategory = categories.find(
    cat => cat.id === matchedPost.categoryId
  )

  const matchedAuthor = users.find(
    user => user.id === matchedPost.authorId
  )

  const paragraphs = matchedPost.content.split("\n\n")

  return (

    <div className="mx-auto max-w-5xl p-6">

      <Link to="/posts">
        <Button variant="ghost">
          ← Back
        </Button>
      </Link>

      <Card className="mt-6 overflow-hidden rounded-3xl">

        <img
          className="h-420px w-full object-cover"
          src={matchedPost.coverImage}
          alt={matchedPost.title}
        />

        <div className="space-y-6 p-8">

          <Badge>

            <Link to={`/categories/${matchedCategory.slug}`}>
              {matchedCategory.name}
            </Link>

          </Badge>

          <h1 className="text-5xl font-bold leading-tight text-ink">
            {matchedPost.title}
          </h1>

          <div className="flex items-center justify-between border-b border-edge pb-6">

            <div className="flex items-center gap-4">

              <Avatar
                src={matchedAuthor.avatar}
                name={matchedAuthor.name}
                size="lg"
              />

              <div>

                <Link
                  to={`/authors/${matchedAuthor.id}`}
                  className="font-medium text-ink"
                >
                  {matchedAuthor.name}
                </Link>

                <p className="text-sm text-muted">
                  {matchedPost.publishedAt}
                </p>

              </div>

            </div>

            <p className="text-sm text-muted">
              {matchedPost.readTime} mins read
            </p>

          </div>

          <div className="mx-auto max-w-720px space-y-6">

            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="leading-8 text-muted"
              >
                {paragraph}
              </p>
            ))}

          </div>

        </div>

      </Card>

    </div>
  )
}

export default PostDetails
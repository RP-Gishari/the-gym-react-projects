import { useLoaderData, useParams } from "react-router-dom"
import { Card, Avatar } from "../components/ui"

function AuthorProfile() {

  const { posts, users } = useLoaderData()

  const { id } = useParams()

  const matchedAuthorId = users.find(
    user => user.id === id
  )

  if (!matchedAuthorId) {
    return <h1>Author not found</h1>
  }

  const authorPublishedPost = posts.filter(
    post =>
      post.authorId === matchedAuthorId.id &&
      post.status === "published"
  )

  return (

    <div>

      <h1>{matchedAuthorId.name}</h1>

      <h1>{matchedAuthorId.bio}</h1>

      <Avatar 
        src={matchedAuthorId.avatar}
        name={matchedAuthorId.name}
        size="xl"
      />

      <div>

        {authorPublishedPost.map(post => (

          <Card key={post.id}>

            <li>{post.title}</li>

          </Card>

        ))}

      </div>

    </div>
  )
}

export default AuthorProfile
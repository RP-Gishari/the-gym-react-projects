// INSTRUCTOR ONLY — do not distribute until after class debrief.
import { useState } from 'react'

function PostCard({ author, avatarUrl, content, initialLikes }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikes)

  function handleLike() {
    setLiked(!liked)
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
  }

  const btnClass = liked ? 'like-btn liked' : 'like-btn'
  const heartIcon = liked ? '♥' : '♡'

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={avatarUrl} alt={author} className="avatar" />
        <span className="author">{author}</span>
      </div>
      <p className="content">{content}</p>
      <div className="post-actions">
        <button className={btnClass} onClick={handleLike}>
          {heartIcon}
        </button>
        <span className="like-count">{likeCount}</span>
      </div>
    </div>
  )
}

export default PostCard

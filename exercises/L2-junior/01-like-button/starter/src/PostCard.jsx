import { useState } from 'react'

// Each PostCard manages its own like state independently.
// Two PostCards rendered side by side do NOT share state.

function PostCard({ author, avatarUrl, content, initialLikes }) {
  // State is pre-declared — your job starts in handleLike below.
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(initialLikes)

  function handleLike() {
    // TODO: Toggle `liked` between true and false.
    // TODO: When toggling TO liked (true), increment likeCount by 1.
    //       When toggling FROM liked (false), decrement likeCount by 1.
    //       Both state updates must happen in this one function call.
  }

  // TODO: Replace the string 'like-btn' below with an expression that
  //       returns 'like-btn liked' when liked is true, and 'like-btn' when false.
  const btnClass = 'like-btn'

  // TODO: Replace the '♡' below with an expression that
  //       returns '♥' when liked is true, and '♡' when liked is false.
  const heartIcon = '♡'

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

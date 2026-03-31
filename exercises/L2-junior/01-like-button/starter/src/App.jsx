// Do not modify this file.
import PostCard from './PostCard'

const posts = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatarUrl: 'https://i.pravatar.cc/48?img=47',
    content: 'Just deployed my first full-stack app. Three months of late nights finally paid off. 🚀',
    initialLikes: 24,
  },
  {
    id: 2,
    author: 'Marcus Webb',
    avatarUrl: 'https://i.pravatar.cc/48?img=12',
    content: 'Hot take: the best debugging tool is still a rubber duck and a good night\'s sleep.',
    initialLikes: 87,
  },
]

export default function App() {
  return (
    <div className="feed">
      {posts.map(post => (
        <PostCard
          key={post.id}
          author={post.author}
          avatarUrl={post.avatarUrl}
          content={post.content}
          initialLikes={post.initialLikes}
        />
      ))}
    </div>
  )
}

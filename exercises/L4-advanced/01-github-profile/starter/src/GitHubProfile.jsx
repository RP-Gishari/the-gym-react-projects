import useGitHub from './useGitHub'

// This component's render logic is fully written.
// Your only job here is to wire it up to the custom hook.

function GitHubProfile({ username }) {
  // TODO: Replace the three lines below with a single call to useGitHub(username).
  //       Destructure { user, isLoading, error } from what it returns.
  const user = null
  const isLoading = false
  const error = null

  if (isLoading) return <p className="status">Loading {username}...</p>
  if (error) return <p className="status error">Error: {error}</p>
  if (!user) return <p className="status">Enter a username above to search.</p>

  return (
    <div className="profile-card">
      <img src={user.avatar_url} alt={user.login} className="profile-avatar" />
      <div className="profile-info">
        <h2>{user.name || user.login}</h2>
        {user.bio && <p className="bio">{user.bio}</p>}
        <div className="stats">
          <span><strong>{user.public_repos}</strong> repos</span>
          <span><strong>{user.followers}</strong> followers</span>
          <span><strong>{user.following}</strong> following</span>
        </div>
        <a href={user.html_url} target="_blank" rel="noreferrer" className="gh-link">
          View on GitHub →
        </a>
      </div>
    </div>
  )
}

export default GitHubProfile

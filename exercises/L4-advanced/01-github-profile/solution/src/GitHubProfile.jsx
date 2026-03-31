// INSTRUCTOR ONLY — do not distribute until after class debrief.
import useGitHub from './useGitHub'

function GitHubProfile({ username }) {
  const { user, isLoading, error } = useGitHub(username)

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

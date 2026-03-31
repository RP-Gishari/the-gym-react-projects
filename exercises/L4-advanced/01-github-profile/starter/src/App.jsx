// Do not modify this file.
import { useState } from 'react'
import GitHubProfile from './GitHubProfile'

export default function App() {
  const [input, setInput] = useState('')
  const [username, setUsername] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed) setUsername(trimmed)
  }

  return (
    <div className="app">
      <h1>⌥ GitHub Profile Lookup</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter a GitHub username..."
          className="search-input"
        />
        <button type="submit" className="search-btn">Look Up</button>
      </form>
      {username && <GitHubProfile username={username} />}
    </div>
  )
}

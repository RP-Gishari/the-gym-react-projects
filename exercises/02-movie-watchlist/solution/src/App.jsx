// INSTRUCTOR ONLY — do not share until after debrief.
import { useState, useEffect } from 'react'
import { movies } from './data/movies'

// State design decision (left as comment per exercise spec):
// - `search` and `genre` are UI filter state — they live in App because the filter UI and movie list are both rendered here.
// - `watchlist` is an array of movie ids (not full objects) — only the id is needed to check membership and persist to localStorage. Full movie data is always available from the source array.
// - `filtered` is derived from `movies`, `search`, and `genre` — NOT stored in state.

const STORAGE_KEY = 'movie-watchlist'
const ALL_GENRES = ['All', ...new Set(movies.map(m => m.genre)).values()]

export default function App() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [watchlistIds, setWatchlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(watchlistIds))
  }, [watchlistIds])

  const filtered = movies.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) ||
                          m.director.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = genre === 'All' || m.genre === genre
    return matchesSearch && matchesGenre
  })

  const watchlistMovies = watchlistIds.map(id => movies.find(m => m.id === id)).filter(Boolean)
  const totalRuntime = watchlistMovies.reduce((sum, m) => sum + m.runtime, 0)
  const runtimeHours = Math.floor(totalRuntime / 60)
  const runtimeMins = totalRuntime % 60

  function isInWatchlist(id) {
    return watchlistIds.includes(id)
  }

  function addToWatchlist(id) {
    if (!isInWatchlist(id)) setWatchlistIds(prev => [...prev, id])
  }

  function removeFromWatchlist(id) {
    setWatchlistIds(prev => prev.filter(wId => wId !== id))
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">🎬 Watchlist</h1>
        <span className="text-sm text-gray-400">{watchlistIds.length} saved</span>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Catalogue */}
        <div className="lg:col-span-2">
          <div className="flex gap-3 mb-5">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title or director..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-gray-100 placeholder:text-gray-500 outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-2 flex-wrap mb-6">
            {ALL_GENRES.map(g => (
              <button
                key={g}
                onClick={() => setGenre(g)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  genre === g
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-gray-700 text-gray-400 hover:border-gray-500'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No movies match your search.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filtered.map(movie => (
                <div key={movie.id} className="bg-gray-800 rounded-xl overflow-hidden group">
                  <div className="relative">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-48 object-cover"
                    />
                    {isInWatchlist(movie.id) && (
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-0.5 rounded-full">
                        ✓ Saved
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm text-white leading-tight mb-1">{movie.title}</p>
                    <p className="text-xs text-gray-400 mb-1">{movie.year} · {movie.runtime}min</p>
                    <p className="text-xs text-indigo-400 mb-3">{movie.genre}</p>
                    <button
                      onClick={() => isInWatchlist(movie.id) ? removeFromWatchlist(movie.id) : addToWatchlist(movie.id)}
                      className={`w-full text-xs rounded-lg py-1.5 font-medium transition-colors ${
                        isInWatchlist(movie.id)
                          ? 'bg-red-900/40 text-red-400 hover:bg-red-900/60'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {isInWatchlist(movie.id) ? 'Remove' : '+ Add to Watchlist'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Watchlist panel */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 rounded-2xl p-5 sticky top-8">
            <h2 className="font-bold text-white mb-1">My Watchlist</h2>
            {watchlistMovies.length > 0 && (
              <p className="text-xs text-gray-400 mb-4">
                {watchlistMovies.length} movie{watchlistMovies.length !== 1 ? 's' : ''} ·{' '}
                {runtimeHours}h {runtimeMins}m total
              </p>
            )}

            {watchlistMovies.length === 0 ? (
              <p className="text-gray-500 text-sm py-6 text-center">Your watchlist is empty.</p>
            ) : (
              <ul className="space-y-3">
                {watchlistMovies.map(movie => (
                  <li key={movie.id} className="flex items-start gap-3">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-10 h-14 object-cover rounded-md shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white leading-tight truncate">{movie.title}</p>
                      <p className="text-xs text-gray-400">{movie.year}</p>
                      <p className="text-xs text-indigo-400">⭐ {movie.rating}</p>
                    </div>
                    <button
                      onClick={() => removeFromWatchlist(movie.id)}
                      className="text-gray-600 hover:text-red-400 text-sm shrink-0 pt-0.5"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

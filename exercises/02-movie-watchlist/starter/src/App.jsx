import { movies } from './data/movies'
import { useState, useEffect } from 'react'

// The UI below is complete and styled — run npm run dev to see it.
// Your job: make it interactive using React.
// Nothing here is wired up — no state, no handlers, no persistence.
// Do not change the className values. Focus on React.

// hardcoded for display — you will replace these with state
const GENRES = ['All', ...new Set(movies.map(m => m.genre))]

export default function App() {
  // const search = ''
  // const selectedGenre = 'All'
  // const watchlistIds = []

  // display all movies for now — you will filter this with state
  //const visibleMovies = movies
  const [search, setSearch] = useState("") // search input value
  const [selectedGenre, setSelectedGenre] = useState('All') // currently selected genre filter
  const [watchlistIds, setWatchlistIds] = useState([]) // store IDS of movies to watchlist

  // load watchlist from localStorage
  useEffect(() =>{
    const stored = localStorage.getItem('watchlist')
    if(stored) setWatchlistIds(JSON.parse(stored))
  }, [])

  // Runs everytime watchlist change
  useEffect(() =>{
    localStorage.setItem('watchlist', JSON.stringify(watchlistIds))
  }, [watchlistIds])

  // filter movies based on seatch or genre
  const visibleMovies = movies.filter( movie =>{
    const matchesSearch = movie.title.toLowerCase().includes(search.toLowerCase()) || movie.director.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre
    return matchesSearch && matchesGenre
  })

  const watchlistMovies = movies.filter( m =>
    watchlistIds.includes(m.id)
  )

  // to calculate total runtime of watchlist
  const totalRuntime = watchlistMovies.reduce((acc, m) =>
    acc + m.runtime, 0)
// convert runtime to hours + minutes
  const hours = Math.floor(totalRuntime / 60)
  const minutes = totalRuntime % 60

    // add / remove movies (toggle behavior)
  const toggleWatchlist = (id) => {
    setWatchlistIds(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold text-slate-800">Watchlist</h1>
        <span className="text-sm text-slate-400">{watchlistIds.length} saved</span>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 flex gap-8">

        {/* Catalogue — left side */}
        <main className="flex-1 min-w-0">

          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or director..."
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-indigo-400 mb-4"
          />
          {/* Genre filters */}
          <div className="flex gap-2 flex-wrap mb-6">
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  genre === selectedGenre
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-slate-200 text-slate-500 hover:border-slate-400'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Movie grid */}
          {visibleMovies.length ===  0 ? ( <p className="text-center text-slate-400">No result</p>) :
          (<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {visibleMovies.map(movie => {
              const isSaved = watchlistIds.includes(movie.id)

              return(
              <div key={movie.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-3">
                  <p className="font-medium text-sm text-slate-800 leading-tight mb-0.5 truncate">
                    {movie.title}
                  </p>
                  <p className="text-xs text-slate-400 mb-3">
                    {movie.year} · {movie.genre}
                  </p>
                  <button onClick={() => toggleWatchlist(movie.id)} className={`w-full text-xs rounded-lg py-1.5 font-medium transition-colors ${
  isSaved
    ? 'bg-red-500 text-white'
    : 'bg-indigo-600 text-white'
}`}>
                    { isSaved ? 'Remove' : '+ Add'}
                  </button>
                </div>
              </div>
            )})}
          </div>
          )}
        </main>

        {/* Watchlist — right side */}
        <aside className="w-64 shrink-0">
          <div className="bg-white border border-slate-200 rounded-xl p-4 sticky top-8">
            <h2 className="font-semibold text-sm text-slate-800 mb-4">My Watchlist</h2>
            {watchlistMovies.length === 0 ? (<p className="text-xs text-slate-400 text-center py-6">Nothing saved yet.</p>):
            (<>
            <ul className="space-y-2 mb-4">
              {watchlistMovies.map(m => (
                <li key={m.id} className="text-xs flex justify-between items-center">
                  <span>{m.title}</span>
                  <button onClick={() => toggleWatchlist(m.id)} className="text-red-500">X</button>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500">Totla runtime: {hours}h {minutes}m</p>
            </>)}

          </div>
        </aside>

      </div>
    </div>
  )
}
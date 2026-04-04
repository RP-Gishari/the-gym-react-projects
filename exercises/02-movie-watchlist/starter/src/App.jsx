import { useState } from 'react'
import { movies } from './data/movies'

// The UI below is complete and styled — run npm run dev to see it.
// Your job: make it interactive using React.
// Nothing here is wired up — no state, no handlers, no persistence.
// Do not change the className values. Focus on React.

// hardcoded for display — you will replace these with state
const GENRES = ['All', ...new Set(movies.map(m => m.genre))]

export default function App() {
  //added states to manage changes
  const [search, setSearch] = useState(''); 
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [watchlistIds, setWatchlistIds] = useState([])

  // filtering movies depending on user input to search
  const visibleMovies = movies.filter(movie => {
    const titlee = movie.title.toLowerCase();
    const directorr = movie.director.toLowerCase();
    const searchh = search.toLowerCase();

    const matchesSearch = titlee.includes(searchh) || 
      directorr.includes(searchh);
    const matchesGenre = selectedGenre === 'All' || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  })
  //fn to update the user search inputs
  function searcher(e){
    let valueSearched = e.target.value;
    setSearch(valueSearched)
  }
  //genre selector
  function genreSelector(genre){
    setSelectedGenre(genre)
  }

  function toggleWatch(movieId){
    const movieExist = watchlistIds.includes(movieId);
    if(movieExist === true){
     newWatch = watchlistIds.filter(id => id !== movieId)
    } else{
      newWatch = [...watchlistIds, movieId]
    }
    setWatchlistIds(newWatch);
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
            placeholder="Search by title or director..."
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-indigo-400 mb-4"
            onChange={searcher}
          />

          {/* Genre filters */}
          <div className="flex gap-2 flex-wrap mb-6">
            {GENRES.map(genre => (
              <button
                key={genre}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  genre === selectedGenre
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-slate-200 text-slate-500 hover:border-slate-400'
                }`}
                onClick={()=>genreSelector(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Movie grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {visibleMovies.map(movie => (
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
                  <button className="w-full bg-indigo-600 text-white text-xs rounded-lg py-1.5 font-medium hover:bg-indigo-700 transition-colors"
                  onClick={()=> toggleWatch(movie.id)}
                  >
                    + Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Watchlist — right side */}
        <aside className="w-64 shrink-0">
          <div className="bg-white border border-slate-200 rounded-xl p-4 sticky top-8">
            <h2 className="font-semibold text-sm text-slate-800 mb-4">My Watchlist</h2>
            <p className="text-xs text-slate-400 text-center py-6">Nothing saved yet.</p>
          </div>
        </aside>

      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { movies } from './data/movies'

const GENRES = ['All', ...new Set(movies.map(m => m.genre))]

export default function App() {
  const [search, setSearch] = useState('') // deals with the searching bar and searched 
  const [selectedGenre, setSelectedGenre] = useState('All') // store selected genre 
  const [watchlistIds, setWatchlistIds] = useState(()=>{
    const savedItem = localStorage.getItem("watchlist")
    return savedItem ? JSON.parse(savedItem) : [];
  }) // store on browser the save move and if not saved start with empty array

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlistIds))
  }, [watchlistIds]) /* local storage it self is no the side effect but to deal with it is when we say 
                      that the side effect is to deal with local storage and also deal with the browser
                      part because loccal storage is browser storage not react part. 
                     */ 

  // display all movies for now — you will filter this with state
  {/* this shows all movie and also handle search bar according to title or director of movie */}
  const visibleMovies = movies.filter(movie=>
    selectedGenre === "All" || movie.genre === selectedGenre
  ).filter(movie =>{
     const moviesSearched = search.toLocaleLowerCase()

     return(movie.director.toLocaleLowerCase().includes(moviesSearched) ||
     movie.title.toLocaleLowerCase().includes(moviesSearched))
  })

  const movieInWatchlist = movies.filter(movie => 
    watchlistIds.includes(movie.id)
  )


  const timeOfMovie = movieInWatchlist.reduce((sum, movie) => 
    sum + movie.runtime , 0)

  const totalHours = Math.floor(timeOfMovie / 60);
  const totalMinutes = timeOfMovie % 60;

  function handleWatchlist(id){
   setWatchlistIds(exist => {
    if(exist.includes(id)){
      return exist.filter(movieId => movieId !== id)
    }else{
      return [...exist, id]
    }
   })
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
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Genre filters */}
          <div className="flex gap-2 flex-wrap mb-6">
            {GENRES.map(genre => (
              <button

                onClick={() => setSelectedGenre(genre)}
                key={genre}
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
                  <button 
                      onClick={() => handleWatchlist(movie.id)}
                     className="w-full bg-indigo-600 text-white text-xs 
                                rounded-lg py-1.5 font-medium hover:bg-indigo-700 transition-colors">
                    {watchlistIds.includes(movie.id) ? "Remove" : "Add"}
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
            <div>
                  {movieInWatchlist.length === 0 ? (
                   <p className='text-xs text-slate-400 text-center py-6'>Nothing Saved yet</p> 
                    ) : (
              <div>
                {movieInWatchlist.map(movie => (
                 <div className='text-xl text-blue-800 m-2 font-bold'
                 key={movie.id}>
                 {movie.title} ({movie.runtime} min)
              </div>
                   ))}
                <p className='text-3xl text-slate-400 m-2'>
               Total: {totalHours}h {totalMinutes}min
               </p>
            </div>
              )}
            </div>
           
            
          </div>
        </aside>

      </div>
    </div>
  )
}

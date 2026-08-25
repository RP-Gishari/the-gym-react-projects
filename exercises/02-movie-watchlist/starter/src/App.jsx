import {useState, useEffect} from 'react'

import { movies } from './data/movies'

const GENRES = ['All', ...new Set(movies.map(m => m.genre))]

export default function App() {
  const [search, setSearch]= useState('')// handles the search input
  const [selectedGenre, setSelectedGenre]= useState('All')// handle the buttons based on genre
  const [watchlistIds,setWatchlistIds] = useState(()=>{// holds the list of movies on the catalogue
    const listIds= localStorage.getItem('watchlistIds')//localStorage helps to save data on browser in order to not lose it after refreshing the page.
    return listIds? JSON.parse(listIds): []
  })

useEffect(()=>{
  localStorage.setItem('watchlistIds', JSON.stringify(watchlistIds))
}, [watchlistIds])

  //filters the movies by title, director, or by genre
    const filteredMovies= movies.filter(movie=>{
    const  forSearching= movie.title.toLowerCase().includes(search.toLowerCase()) || movie.director.toLowerCase().includes(search.toLowerCase()) 
    const forGenres = selectedGenre=== "All" ||selectedGenre ===  movie.genre
    return forSearching && forGenres;
  }
  )
    const visibleMovies = filteredMovies

  //Adding a runtime (hours and minutes)
     const watchlist=  movies.filter(movie => watchlistIds.includes(movie.id))
     const totalMinutes = watchlist.reduce((sum, movie) => sum + movie.runtime, 0)
     const hours = Math.floor(totalMinutes / 60)
     const mins = totalMinutes % 60

  function handleSearch(e){//handles the event of typing in the search input that is triggered by the user
  setSearch(e.target.value)
  }

  function handleSelectedGenre(genre){//helps to select movies by genre
    setSelectedGenre(genre)
  }

  function handleWatchlist(movie){// helps to handle/add the clicked movie
setWatchlistIds(prev=> [...prev,movie.id])

  }

  function handleRemove(movie){// helps to flip the add button to remove and remove movies from watchlist
setWatchlistIds(prev=> prev.filter(id=>id !== movie.id))
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
            onChange={handleSearch}
            placeholder="Search by title or director..."
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-indigo-400 mb-4"
          />
      
          {/* Genre filters */}
           <div className="flex gap-2 flex-wrap mb-6">
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={()=> handleSelectedGenre(genre)}
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
          {visibleMovies.length !== 0 ?  
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {visibleMovies.map(movie => {
            const movieSaved= watchlistIds.some(id=>id === movie.id)

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
                { movieSaved?  <button 
                  onClick={()=>handleRemove(movie)}
                  className="w-full bg-indigo-600 text-white text-xs rounded-lg py-1.5 font-medium hover:bg-indigo-700 transition-colors">
                    Remove
                  </button> 
                  :
                  <button 
                  onClick= {()=>handleWatchlist(movie)}
                  className="w-full bg-indigo-600 text-white text-xs rounded-lg py-1.5 font-medium hover:bg-indigo-700 transition-colors">
                    + Add
                  </button>}
                </div>
              </div>
            )})}
          </div>
: <div className='flex justify-center font-semibold  text-2xl p-25'>No results</div>}
        </main>
          

        {/* Watchlist — right side */}
        <aside className="w-64 shrink-0">
          <div className="bg-white border border-slate-200 rounded-xl p-4 sticky top-8">
            <h2 className="font-semibold text-sm text-slate-800 mb-4">My Watchlist</h2>
            <p className="text-xs text-slate-400 text-center py-6">{hours} hour(s) {mins} min(s) saved movies</p>
          </div>
        </aside>

      </div>
    </div>
  )
}

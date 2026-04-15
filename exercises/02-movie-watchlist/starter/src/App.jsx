import {useState , useEffect} from 'react'
import { movies } from './data/movies'




const GENRES = ['All', ...new Set(movies.map(m => m.genre))]

export default function App() {

//This search state stores every value that user types in the search input 
const [search, setSearch] = useState('')


//This selectedGenre states store the genre selected by the user 
const [selectedGenre, setSelectedGenre] = useState('All')

//This state stores ids of watchlisted movies 
//It then get ids added in the local storage on first load 
//This helps movies to persist after full page refresh 
const [watchlistIds , setWatchlistIds] = useState(()=> {
const saved = localStorage.getItem('watchLists') 
return saved ? JSON.parse(saved) : []
})



function handleSearch(event){
  const {value} = event.currentTarget
  setSearch(value)
}


useEffect(()=>{
localStorage.setItem('watchLists', JSON.stringify(watchlistIds))
},[watchlistIds])




function handleSelectedGenre(genreSelected){
  setSelectedGenre(genreSelected)
}

  // Filtering movies by genres and then filter by search in order 
  // to get accurate search based on genre that the user has selected
  const visibleMovies = movies.filter(allMovies => {return selectedGenre === 'All' || allMovies.genre === selectedGenre})
   .filter(allMovies =>{ return allMovies.title.toLowerCase().includes(search.toLowerCase()) || 
    allMovies.director.toLowerCase().includes(search.toLowerCase())})


function handleWatchLists(id){
setWatchlistIds(prev => prev.includes(id) ? prev :  [...prev, id])}

let watchlistedMovies = movies.filter(mov => watchlistIds.includes(mov.id))


function handleDeleteWatchList(id){
setWatchlistIds(prev => prev.filter(allIds => allIds !== id))
}


function handleClearWatchList(){
  setWatchlistIds([])
  localStorage.clear()
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
      
           <input type="text"
            value={search}
            placeholder="Search by title or director..."
            className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-sm outline-none focus:border-indigo-400 mb-4"
            onChange={handleSearch} 
                />
          

          

          {/* Genre filters */}
         <div className="flex gap-2 flex-wrap mb-6">
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={()=>handleSelectedGenre(genre)}
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
      
      { visibleMovies.length !== 0 ?<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
              {  watchlistIds.includes(movie.id) ? <button className="w-full bg-red-600 text-white text-xs rounded-lg py-1.5 font-medium hover:bg-red-700 transition-colors"
                  onClick={()=>handleDeleteWatchList(movie.id)}>
                    X remove
                  </button> : 
                  <button className="w-full bg-indigo-600 text-white text-xs rounded-lg py-1.5 font-medium hover:bg-indigo-700 transition-colors"
                  onClick={()=>handleWatchLists(movie.id)}>
                    + Add
                  </button>                 
                  
                  } 
                </div>
              </div>
            ))}


           
          </div> : <div className='text-black-100  ml-100 mt-40 font-bold'> Your search: <span className='text-red-600'>{search}</span> is not available</div>} 
    
        </main>

        {/* Watchlist — right side */}
        <aside className="w-64 shrink-0">

           
          <div className="bg-white border border-slate-200 rounded-xl p-4 sticky top-8">
            <h2 className="font-semibold text-sm text-slate-800 mb-4">My Watchlist</h2>

           { watchlistIds.length <=0 && <p className="text-xs text-slate-400 text-center py-6">Nothing saved yet  </p>}

           <div className="grid  grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
            {watchlistedMovies.map(listed => (
              <div key={listed.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <img
                  src={listed.poster}
                  alt={listed.title}
                  className="w-30 h-20 object-cover"
                />
                <div className="p-3">
                  <p className="font-medium text-sm text-slate-800 leading-tight mb-0.5 truncate">
                    {listed.title}
                  </p>
                  <p className="text-xs text-slate-400 mb-3">
                    {listed.year} · {listed.genre}
                  </p>
                <button className="w-full bg-blue-600 text-white text-xs rounded-lg py-1.5 font-medium hover:bg-red-600 transition-colors"
                  onClick={()=>handleDeleteWatchList(listed.id)}
                  >
                    X remove
                  </button>
                </div>
              </div> 
            ))}


            
          </div> 
    
          </div>
        </aside>

      </div>

{ watchlistIds.length > 0 &&<button  onClick={handleClearWatchList}
 className="w-2xs bg-red-600 text-white text-xs rounded-lg py-1.5 font-medium hover:bg-red-700 transition-colors ml-240" >Clear watchLists</button> }

    </div> 
  )

}
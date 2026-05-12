import { SearchIcon } from "lucide-react"
import Home from './Home'


function Posts() {
  return(
    <div>
      <div className="relative w-full">
         <input className="border-0" type="text"  placeholder="search..."/>
         <SearchIcon size={18}
         /> 
      </div>
      <div>
      <button>Technology</button>
      <button>Design</button>
      <button>Career</button>
      <button>Science</button>
      <button>Culture</button>
      </div> 
         <Home />

    </div>  
    
  )
}

export default Posts
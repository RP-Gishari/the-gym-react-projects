import { useLoaderData } from "react-router-dom"

export async function AuthorLoader(){
  const res = await fetch('http://localhost:3001/users')
  return res.json()
}

function Authors() {

  const authors = useLoaderData()
  return(
    <div>
       {
         authors.map(author => (
         <h1>{author.name}</h1>        
      )
        
      )
    }
      </div>
    
  )
}

export default Authors
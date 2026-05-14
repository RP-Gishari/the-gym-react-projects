import { SearchIcon } from "lucide-react"
import Home from './Home'
import { Button, Card, Badge, Input, Textarea, Avatar } from '../components/ui'
import { Link,useLoaderData } from "react-router-dom"
import { useState } from "react"



function Posts() {
   const{posts, categories, users} = useLoaderData()

   const [selectedCategory, setSelectedCategory] = useState()
    const [searchedTerm, setSearchedTerm] = useState('');

    // const filteredCategory = selectedCategory ?
    //  posts.filter(post => post.categoryId === selectedCategory) : posts

    const filteredPost = posts.filter(post => {
      const matchedCategory = selectedCategory ? 
      post.categoryId === selectedCategory : true

    const matchedSearch = post.title
                          .toLowerCase()
                          .includes(searchedTerm.toLowerCase())  

        return matchedCategory && matchedSearch
    })

   

    const handleSearchedTerm = (e) => {
      const value = e.target.value
      setSearchedTerm(value)
    }

    


  return(
    <div >
         <div className=" grid grid-cols-2 p-10 ">
         <div className="flex items-center ml-5  ">
         <Input placeholder="search..."
               className="w-15 relative ml-15"
               value={searchedTerm}
                onChange={handleSearchedTerm}
               />
         <SearchIcon size={18}
         /> 
         </div>
         <div className="flex gap-2 mr-30">
             <Button onClick={()=> setSelectedCategory(null)}>All</Button>
              {categories.map(cat => (
           <div>
            
              <Button 
                  key={cat.id}
                   onClick={() => setSelectedCategory(cat.id)}
           >
            {cat.name}
           </Button>
           </div>
           
           ))}
      </div> 
    </div> 
    
    <div className="mx-auto grid max-w-5xl gap-8 p-6">
        {filteredPost.map(post => {

           const matchCategory = categories.find(
          cat => cat.id === post.categoryId
        )
         const MatchedAuthor = users.find(
          user => user.id === post.authorId
        )
        
        return(
            <Card key={post.id} className="overflow-hidden rounded-3xl border border-edge bg-paper">
                <Link to={`/posts/${post.slug}`}>
            <img
              className="h-64 w-full object-cover"
              src={post.coverImage}
              alt={post.title}
            />
           <div className="space-y-5 p-6">

              <div>
                <span className="rounded-full bg-subtle px-4 py-1 text-sm text-muted">
                  {matchCategory.name}
                </span>
              </div>

              <h1 className="text-3xl font-bold leading-tight text-ink">
                {post.title}
              </h1>

              <p className="leading-7 text-muted">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={MatchedAuthor.avatar}
                    alt={MatchedAuthor.name}
                  />

                  <span className="text-sm text-ink">
                    {MatchedAuthor.name}
                  </span>
                </div>

                <div className="flex items-center gap-4">

                  <p className="text-sm text-muted">
                    {post.readTime} mins
                  </p>
                </div>
              </div>
            </div>
              </Link>
          </Card>
      )
         })}
         </div>
         
         </div>
    
      )
     }

   export default Posts
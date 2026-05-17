import { useEffect, useState } from 'react'

export default function useApi(){
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])
    const [error, setError] = useState(null)
    const [search, setSearch] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")

useEffect( () =>{
    async function fetchData(){
        try {
            const [postsRes, categoriesRes, usersRes] = await Promise.all([
            fetch("http://localhost:3001/posts"),
            fetch("http://localhost:3001/categories"),
            fetch("http://localhost:3001/users")
        ])
        const postsData = await postsRes.json();
        const categoriesData = await categoriesRes.json();
        const usersData = await usersRes.json();

        setPosts(postsData);
        setCategories(categoriesData);
        setUsers(usersData)
        } catch (error) {
           setError("Failed to fetch a data")
        }  
    }
    fetchData()
}, [])

const filteredPosts = posts.filter(post =>{
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "all" ? true : post.categoryId === selectedCategory
    return matchesSearch && matchesCategory
})
return {posts, categories, users, error, search, setSearch, selectedCategory, setSelectedCategory, filteredPosts}
}
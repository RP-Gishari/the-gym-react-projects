import { useState, useEffect } from "react";

const urls= await Promise.all([
    fetch("http://localhost:3001/posts"),
    fetch("http://localhost:3001/categories"),
    fetch("http://localhost:3001/users")
])


export default function useApi(urls){
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
     
    })
}

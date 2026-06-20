import { useEffect, useState } from "react";
  

export default function useApi(url){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        setData(null);
        setError(null);
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result)
                
            } catch (err) {
                setError(err.message)
            } finally{
                setLoading(false)
                
            }
        }

        fetchData()
    }, [url]);
    
    return {data, loading, error}
}

import { useLoaderData } from "react-router-dom";

export async function apiFetch(...endpoints){
    const responses= await Promise.all(endpoints.map(url=>fetch('http://localhost:3001${url}'))
)
return Promise.all (responses.map(r=>r.json()))
}

export function useApi(){
    return useLoaderData();
}
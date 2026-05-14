import react from "react";
import useApi from '../hooks/useApi'

export   function PostsPage(){
    const {data, loading} = useApi('http://localhost:3001/posts')

    return(
        <h2>PostsPage page goes in this file</h2>
    )
}
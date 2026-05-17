import react from "react";
import { useParams } from "react-router-dom";
import useApi from '../hooks/useApi'



export  function AuthorPage(){
    let params = useParams()
    const id = params.id;

    const {data: users, error: usersError, loading: usersLoading } = useApi('http://localhost:3001/users')


    return(
        <h2>author page goes in this file</h2>
    )
}
import react from "react";
import { useParams } from "react-router-dom";
import useApi from '../hooks/useApi'
import { Avatar } from "../components/ui/Avatar";



export  function AuthorPage(){
    let params = useParams()
    const id = params.id;

    const {data: users, error: usersError, loading: usersLoading } = useApi('http://localhost:3001/users')

    if(usersLoading) return <h1>User loading ....</h1>
    if(!users) return <h1>No user found</h1>
    if(usersError) return <h1>an error occured</h1>

    const currentAuthor = users.find(user=> user.id === id)
    if(!currentAuthor) return <h1>author not found</h1>


    return(
        <section>
            
             <Avatar
             src={currentAuthor.avatar}
             size="xl"
             />
        </section>
    )
}
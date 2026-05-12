import Navbar from "./components/NavBar";
import { Outlet } from "react-router-dom";


function Layouts(){
    return(
        <>
         <Navbar />
         <main>
            <Outlet />
         </main>
        </>
    )

}
export default Layouts;
import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";

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

export default Layouts
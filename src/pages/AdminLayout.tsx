import { Outlet } from "react-router-dom"
import NavPar from "../components/NavPar"
import Sidebar from "../Dashboard/Sidebar"


const AdminLayout = () => {

    return(
        <>
           

           <NavPar/>
            <main className="flex">
                <Sidebar />
                <Outlet />
           </main>
    
        </>
    )
}

export default AdminLayout
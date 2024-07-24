import { Outlet } from "react-router-dom"
import NavPar from "../components/NavPar"
import Sidebar from "../Dashboard/Sidebar"


const AdminLayout = () => {

    return(
        <>
           

           <NavPar/>
      <Sidebar />
      <main className="flex-grow  p-4">
        <Outlet />
      </main>
    
        </>
    )
}

export default AdminLayout
import { Outlet } from "react-router-dom"
import NavPar from "../components/NavPar"
import Sidebar from "../Dashboard/Sidebar"
import ScrollAnimatedComponent from "@/components/ScrollAnimatedComponent"


const AdminLayout = () => {

    return(
        <>
           

           <NavPar/>
            <main className="flex">
            <ScrollAnimatedComponent direction="left">
                <Sidebar />
            </ScrollAnimatedComponent>
                <Outlet />
           </main>
    
        </>
    )
}

export default AdminLayout
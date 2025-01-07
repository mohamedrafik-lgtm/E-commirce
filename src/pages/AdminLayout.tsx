import { Outlet } from "react-router-dom"
import NavPar from "../components/NavPar"
import Sidebar from "../Dashboard/Sidebar"
import ScrollAnimatedComponent from "@/components/ScrollAnimatedComponent"
import { Suspense } from "react"

 
const AdminLayout = () => {

    return(
        <>
           
            <Suspense fallback={<h3>Loding...</h3>}>
              <NavPar/>
            </Suspense>
            <main className="flex">
            <ScrollAnimatedComponent direction="left">
                <Suspense fallback={<h3>Loding...</h3>}>
                  <Sidebar />
                </Suspense>
            </ScrollAnimatedComponent>
            <Suspense fallback={<h3>Loding...</h3>}>
                <Outlet />
            </Suspense>
           </main>
    
        </>
    )
}

export default AdminLayout
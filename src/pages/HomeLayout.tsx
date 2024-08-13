import { Outlet } from "react-router-dom"
import NavPar from "../components/NavPar"
import AsideHome from "../components/AsideHome"


const HomeLayout = () => {

    return(
        <>
           

           <NavPar/>
           <div >

            <main className="flex ">
                <div className="static">
                <AsideHome />
                </div>
                <Outlet />
           </main>
           </div>
    
        </>
    )
}

export default HomeLayout
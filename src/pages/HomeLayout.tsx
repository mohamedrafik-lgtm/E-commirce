import { Outlet } from "react-router-dom"
import NavPar from "../components/NavPar"
import AsideHome from "../components/AsideHome"


const HomeLayout = () => {

    return(
        <>
           

           <NavPar/>
           <div >

            <main>
                <div  className="absolute top-24 h-fit bg-white z-50">
                <AsideHome />
                </div>
                <Outlet />
           </main>
           </div>
    
        </>
    )
}

export default HomeLayout
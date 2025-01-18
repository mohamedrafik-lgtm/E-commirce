import { Outlet } from "react-router-dom"
import NavPar from "../components/NavPar"
import AsideHome from "../components/AsideHome"
import ScrollAnimatedComponent from "@/components/ScrollAnimatedComponent"
import Footer from "@/components/Footer"


const HomeLayout = () => {

    return(
        <>
           
           
           <NavPar/>
           <div >
            <main>
                <div  className="absolute top-24 h-fit bg-white z-50">
                <ScrollAnimatedComponent direction="left">
                <AsideHome />
                </ScrollAnimatedComponent>
                </div>
                <Outlet />
           </main>
              <Footer/>
           </div>
    
        </>
    )
}

export default HomeLayout
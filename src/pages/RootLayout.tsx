import { Outlet } from "react-router-dom"
import NavPar from "../components/NavPar"
// import Sidebar from "../Dashboard/Sidebar"


const RootLayout = () =>{

    return (
        <>
           <NavPar/>
           <Outlet/>
        </>
    )
}

export default RootLayout
import { Outlet } from "react-router-dom"
import NavPar from "../components/NavPar"


const RootLayout = () =>{

    return (
        <>
           <NavPar/>
           <Outlet/>
        </>
    )
}

export default RootLayout
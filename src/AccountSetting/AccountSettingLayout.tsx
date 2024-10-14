import { Outlet } from "react-router-dom"
import NavPar from "../components/NavPar"
import ScrollAnimatedComponent from "@/components/ScrollAnimatedComponent"
import AsideAccountSetting from "./AsideAccountSetting"

 
const AccountSettingLayout = () => {

    return(
        <>
           
 
            <NavPar/>
            <main className="flex h-screen space-x-2">
            <ScrollAnimatedComponent direction="left">
                <AsideAccountSetting />
            </ScrollAnimatedComponent>
                <Outlet />
           </main>
    
        </>
    )
}

export default AccountSettingLayout
import useAuthenticatedQuery from "@/hook/useAuthenticatedQuery"
import { ShippingMethodTableDataProps } from "@/interface"
import { memo, useEffect, useState } from "react"
import ShippingMethodTableData from "./ShippingMethodTableData"


const ShippingMethods = () =>{
    
    const [ShippingMethodData,setShippingMethodData] =useState<ShippingMethodTableDataProps[]>()
    const ShippingMethod = useAuthenticatedQuery({
        queryKey:['shippingMethods'],
        url:'/api/ShippingMethods',
    })
    
    useEffect(()=>{

       setShippingMethodData(ShippingMethod.data)

    }, [ShippingMethod,])
    
    console.log(ShippingMethodData)
    return (
        <div className="w-full p-5">
            <ShippingMethodTableData ShippingMethod={ShippingMethodData}/>
        </div>
    )
}

export default memo(ShippingMethods)
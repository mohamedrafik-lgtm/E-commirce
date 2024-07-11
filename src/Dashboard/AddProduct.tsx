import { ChangeEvent, useState } from "react"
import { IProductInformations } from "../interface"
import InputComponent from "../components/ui/InputComponent"
export const ProductInformation = () => {
   
     const [ProductInformation,setProductInformation] = useState<IProductInformations>({
        productName:'',
        Discription:'',
        SKU: '',
        unitInStock:0
     })
     console.log(ProductInformation)
     const handelChange = (event:ChangeEvent<HTMLInputElement>) =>{
        const {value,name} = event.target
        setProductInformation({
            ...ProductInformation,
            [name]:value
        })
     }
    return (
        <div className="border rounded-md shadow-md">
            <div className="flex p-5 border-b  content-center">
                <h4 className="font-bold">Product information</h4>
                <br />
            </div>
            <div className="p-5 space-y-6">
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="product-name">product Name</label>
                  <InputComponent value={ProductInformation.productName} onChange={handelChange} className="border rounded-md   w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="product name....." type="text" id="productName" name="productName"/>
               </div>
               <div className="grid grid-cols-2 gap-8">
               <div className="flex flex-col space-y-2">
                  <label htmlFor="SKU">SKU</label>
                  <InputComponent value={ProductInformation.SKU} onChange={handelChange} className="border rounded-md   h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="SKU....." type="text" id="SKU" name="SKU"/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="unit-in-stock">unit in stock</label>
                  <InputComponent value={ProductInformation.unitInStock} onChange={handelChange} className="border rounded-md  h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="unit in stock....." type="number" id="unitInStock" name="unitInStock"/>
               </div>
               </div>

               <div className="space-y-2 mb-5">
               <label htmlFor="discription">Discription</label>
               
               <InputComponent value={ProductInformation.Discription} onChange={handelChange} className=" border rounded-md  w-full h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="Type your discription....." type="text" id="Discription" name="Discription"/>
               </div>
            </div>
        </div>
    )
}
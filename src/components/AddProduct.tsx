import InputComponent from "./ui/InputComponent"

export const ProductInformation = () => {

    return (
        <div className="border rounded-md shadow-md">
            <div className="flex p-5 border-b  content-center">
                <h4 className="font-bold">Product information</h4>
                <br />
            </div>
            <div className="p-5 space-y-3">
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="product-name">product Name:</label>
                  <InputComponent className="border rounded-md   w-full p-2 h-11  transition focus:shadow-xl focus:outline-double focus:outline-none " placeholder="product name....." type="text" id="product-name" name="product-name"/>
               </div>
               <div className="grid grid-cols-2 gap-8">
               <div className="flex flex-col space-y-2">
                  <label htmlFor="SKU">SKU:</label>
                  <InputComponent className="border rounded-md   h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="SKU....." type="text" id="SKU" name="SKU"/>
               </div>
               <div className="flex flex-col space-y-2 ">
                  <label htmlFor="unit-in-stock">unit in stock:</label>
                  <InputComponent className="border rounded-md  h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="unit in stock....." type="number" id="unit-in-stock" name="unit-in-stock"/>
               </div>
               </div>

               <div className="space-y-2 mb-5">
               <label htmlFor="discription">discription</label>
               <InputComponent className=" border rounded-md  w-full h-11 p-2 transition focus:shadow-xl focus:outline-double focus:outline-none" placeholder="Type your discription....." type="text" id="unit-in-stock" name="unit-in-stock"/>
               </div>
            </div>
        </div>
    )
}
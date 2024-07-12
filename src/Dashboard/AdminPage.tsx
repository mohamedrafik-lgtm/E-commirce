import    { ProductInformation } from "./AddProduct"
import SelectFile from "./SelectFile"
import { Pricing } from "./Pricing"
import Organization from "./Organization"
import DynamicPropertiesInput from "./DynamicPropertiesInput"
import AddProductForm from "./postData"


const AdminPage = () => {





   // handlers 
   const onSubmitHandlear = () => {

   }

   
   return (
      <div>
         <div className="grid grid-cols-3 gap-6 p-5">
            <div className="col-span-2 space-y-3">
              <ProductInformation/>
              <SelectFile/>
              <DynamicPropertiesInput maxProperties={5} propertyOptions={["color","size","modil"]}/>
            </div>
            <div className="space-y-5">
              <Pricing/>
              <Organization/>
            </div>
         </div>
         <AddProductForm loading={false} onSubmit={onSubmitHandlear}/>
      </div>
   )
}

export default AdminPage
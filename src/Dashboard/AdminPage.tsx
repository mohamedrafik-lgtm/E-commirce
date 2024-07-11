import { ProductInformation } from "./AddProduct"
import SelectFile from "../components/ui/SelectFile"
import { Pricing } from "./Pricing"
import Organization from "./Organization"


const AdminPage = () => {

   return (
      <div className="grid grid-cols-3 gap-6 p-5">
         <div className="col-span-2 space-y-3">
           <ProductInformation/>
           <SelectFile/>
         </div>
         <div className="space-y-5">
           <Pricing/>
           <Organization/>
         </div>
      </div>
   )
}

export default AdminPage
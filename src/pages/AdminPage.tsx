import { ProductInformation } from "../components/AddProduct"
import Organization from "../components/Organization"
import { Pricing } from "../components/Pricing"


const AdminPage = () => {

   return (
      <div className="grid grid-cols-3 gap-6 p-5">
         <div className="col-span-2">
           <ProductInformation/>
           <input type="file"/>
         </div>
         <div className="space-y-5">
           <Pricing/>
           <Organization/>
         </div>
      </div>
   )
}

export default AdminPage
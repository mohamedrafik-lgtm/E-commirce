import { ProductInformation } from "../components/AddProduct"
import { Pricing } from "../components/Pricing"


const AdminPage = () => {

   return (
      <div className="grid grid-cols-3 gap-6 p-5">
         <div className="col-span-2">
           <ProductInformation/>
         </div>
         <div>
         <Pricing/>
         </div>
      </div>
   )
}

export default AdminPage
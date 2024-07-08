import { ProductInformation } from "../components/AddProduct"


const AdminPage = () => {

   return (
      <div className="grid grid-cols-3 p-5">
         <div className="col-span-2">
           <ProductInformation/>
         </div>
      </div>
   )
}

export default AdminPage
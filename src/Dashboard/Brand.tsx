import AddBrandModel from "@/components/AddBrandModel";
import BrandItem from "@/components/BrandItem";


const Brand = ()=>{

    return (
        <div className="p-2 flex space-x-3">
            <BrandItem/>  
            
            <AddBrandModel/>
              
        </div>
    )
}

export default Brand;
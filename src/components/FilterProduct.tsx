
import { useSelector } from "react-redux";
import ProductCard from "./ui/ProductCard"
import { RootState } from "../App/Store";
import { v4 as uuid } from 'uuid';
export const FilterProduct = ()=>{
    const searchValue = useSelector((state:RootState) => state.filterSlice)
 const rinderFilterProduct = searchValue.map((product,idx) => <div className={`transition-all hover:scale-105 ${idx == 0 ? "mt-4":""}`}>
<ProductCard  key={idx} id={product.productId as number} discount={product.discount} imageUrl={product.imageUrl} rate={4} unitPrice={product.unitPrice}
    isLoading={false} productId={product.productId as number} productName={product.productName}/>
 </div>)
    return (
        <div key={uuid()}  className="flex ml-20 space-y-4 flex-wrap">
            {
                rinderFilterProduct
            }
        </div>
        
    )
}

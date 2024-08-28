import { IResearch } from "../App/features"
import ProductCard from "./ui/ProductCard"

const FilterProduct = (Product:IResearch[])=>{

 const rinderFilterProduct = Product.map(product => <ProductCard key={product.productId} id={product.productId as number} discount={product.discount} imageUrl={product.imageUrl} rate={product.rate} unitPrice={product.unitPrice}
    isLoading={false} productId={product.productId as number} productName={product.productName}/>)
    return (
        {
            rinderFilterProduct
        }
    )
}

export default FilterProduct;
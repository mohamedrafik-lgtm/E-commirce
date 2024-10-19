import { useSelector } from "react-redux";

import { RootState } from "../App/Store";
import { v4 as uuid } from 'uuid';
import ProductCard from "@/components/ui/ProductCard";
import { useEffect, useState } from "react";
import axiosInstance from "@/config/axios.config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';


interface ProductCardProps {
    id: number;
    productId: number;
    productName: string;
    unitPrice: number;
    discount: number;
    rate: number;
    imageUrl: string ;
    isLoading: boolean;
  }
export const SerachCategory = ()=>{
    const [productByCategory,setProductByCategory] = useState<ProductCardProps[]>([])
    const categoryId = useSelector((state:RootState) => state.category)
    console.log(categoryId)
    useEffect(() => {
        const fetch = async()=>{
            try {
                const response =await  axiosInstance.get(`/api/Product/category/${categoryId.categoryId}`);
                setProductByCategory(response.data);
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetch()
    }, [categoryId])
   

    const rinderFilterProduct = productByCategory.map((product,idx) => <div key={uuid()} className={`transition-all hover:scale-105 ${idx == 0 ? "mt-4":""}`}>
        <ProductCard   id={product.productId as number} discount={product.discount} imageUrl={product.imageUrl} rate={4} unitPrice={product.unitPrice}
        isLoading={false} productId={product.productId as number} productName={product.productName}/>
    </div>)
    return (
              <div className={`flex  space-y-4 flex-wrap ${productByCategory.length ? '': `justify-center`}`}>
            {
                rinderFilterProduct.length ? rinderFilterProduct : <div className="flex flex-col items-center justify-center h-screen text-center">
                <FontAwesomeIcon 
                    icon={faFrown} 
                    size="3x" 
                    className="text-red-500 mb-4" 
                />
                <h2 className="text-2xl font-semibold">No Products Found</h2>
                <p className="text-lg">There are no products available in this category.</p>
            </div>
            }
        </div>
        
    )
}
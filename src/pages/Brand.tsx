

import { useSelector } from "react-redux";

import { RootState } from "../App/Store";
import { v4 as uuid } from 'uuid';
import ProductCard from "@/components/ui/ProductCard";
import { useEffect, useState } from "react";
import axiosInstance from "@/config/axios.config";



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
export const SearchCategory = ()=>{
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
   

    const renderFilterProduct = productByCategory.map((product,idx) => <div key={uuid()} className={`transition-all hover:scale-105 ${idx == 0 ? "mt-4":""}`}>
        <ProductCard   id={product.productId as number} discount={product.discount} imageUrl={product.imageUrl} rate={4} unitPrice={product.unitPrice}
        isLoading={false} productId={product.productId as number} productName={product.productName}/>
    </div>)
    return (

              <div className={`flex  space-y-4 flex-wrap ${productByCategory.length ? '': `justify-center`}`}>
            {
                renderFilterProduct.length ? renderFilterProduct : <div className="flex flex-col items-center justify-center h-screen text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
</svg>

                <h2 className="text-2xl font-semibold">No Products Found</h2>
                <p className="text-lg">There are no products available in this category.</p>
            </div>
            }
        </div>
        
    )
}
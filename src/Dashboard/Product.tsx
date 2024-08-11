import {useEffect, useState } from "react";
import PaginationControlled from "../components/ui/Paginator";
import axiosInstance from "../config/axios.config";
import { IProduct } from "../interface";



const ProductPage = () =>{
    const [Products,setProducts] = useState<IProduct[]>([])
    const [loadingProduct, setLoadingProduct] = useState<number | null>(null); 

    const url:string = "/api/Product"
    useEffect(()=>{
        try {
             axiosInstance.get(url).then(res => setProducts(res.data))
            
        } catch (error) {
            console.log(error)
        }
     
    },[])
    


    const deleteProduct = async (productId: number) => {
        setLoadingProduct(productId);
        try {
            await axiosInstance.delete(`/api/Product/${productId}`);
            setProducts(Products.filter(product => product.productId !== productId));
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingProduct(null); 
        }
    };

    const renderProducts = Products.map((product) => (
        <div key={product.productId} className="w-full h-min p-2 flex justify-between">
            <div>{product.productId}</div>
            <div>{product.productName}</div>
            <div>{product.category}</div>
            <div>{product.brand}</div>
            <div>{product.supplier}</div>
            <div>{product.unitPrice}</div>
            <div>{product.unitsInStock}</div>
            <button 
                onClick={() => deleteProduct(product.productId)} 
                className={`p-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${loadingProduct === product.productId ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loadingProduct === product.productId}
            >
                {loadingProduct === product.productId ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    ));

   
    return (
        <div className="w-full h-min m-5 border rounded-md flex flex-col">
            <ul className="w-full h-min p-2 flex justify-between bg-slate-200">
                <li>product id</li>
                <li>product name</li>
                <li>category</li>
                <li>brand</li>
                <li>supplier</li>
                <li>unitprice</li>
                <li>units in stock</li>
                <li>delete</li>
            </ul>
            <div className="border-b">
            {renderProducts}
            </div>
            <div className="p-2 flex items-center justify-center">
                <PaginationControlled/>
            </div>
        </div>
    )
}

export default ProductPage;
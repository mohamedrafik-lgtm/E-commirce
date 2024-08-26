import {  useEffect, useState } from "react";
import ProductPage from "./ProductPage";
import { useSelector } from "react-redux";
import { RootState } from "../App/Store";
// import axiosInstance from "../config/axios.config";



interface ProductData {
    productId: number;
    productName: string;
    unitPrice: number;
    description: string | null;
    brand: string;
    category: string;
    unitsInStock: number;
    reorderLevel: number;
    discontinued: boolean;
    productCode: string;
    companyName: string;
    contactName: string;
    isArchived: boolean;
    tags: string[];
    productAttributes: string[];
    productAttributesValues: string[];
    imageUrls: string[];
  }
const ContactPage = () => {
    const [productData, setProductData] = useState<ProductData | null>(null);
    const productId =useSelector((state: RootState) => state.productID);
    console.log(productId.productId)
    
      useEffect(() =>{
      fetch(`http://localhost:5190/api/Product/${productId.productId}`)
        .then(response => response.json())
        .then(data => setProductData(data))
        .catch(error => console.error("Error fetching product data:", error));

      // const fetch =async ()=>{
      //   const {data} =await axiosInstance.get(`http://localhost:5190/api/Product/${productId.productId}`)
      //   console.log(data)
      // setProductData(data)
      // }
      // fetch()
      },[productId.productId])
    
    console.log(productData)
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            {productData ? (
        <ProductPage {...productData} />
      ) : (
        <p>Loading product data...</p>
      )}
        </div>
    )
}


export default ContactPage;
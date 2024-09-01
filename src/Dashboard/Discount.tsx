import axiosInstance from '@/config/axios.config';
import { IDiscount } from '@/interface';
import { AxiosError } from 'axios';
import React, { useState, useEffect } from 'react';



const Discount: React.FC = () => {
    const [product, setProduct] = useState<IDiscount[] | null>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchProductData = async () => {
          try {
            const response = await axiosInstance.get('/api/Discount');
            setProduct(response.data);
            console.log(product)
          } catch (err: unknown) {
            if (err instanceof AxiosError) {
              
              setError(err.message);
            } else if (err instanceof Error) {
              // Handle other errors
              setError(err.message);
            } else {
              // Handle unknown errors
              setError('An unknown error occurred');
            }
          } finally {
            setLoading(false);
          }
        };
    
        fetchProductData();
      }, [product]);
  
    if (loading) {
      return <div className="text-center mt-10">Loading...</div>;
    }
  
    if (error) {
      return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
    }
  
    if (!product) {
      return <div className="text-center mt-10">No product data available</div>;
    }

  return (
    <div style={{
        borderRadius:'15px'
    }} className="w-full mx-7 mt-10 p-5 border">
        <table className="w-full bg-white border border-gray-200">
        <thead>
              <tr className="bg-gray-200 border-b">
                <th className="py-2 px-4 border-b border-gray-200">Product ID</th>
                <th className="py-2 px-4 border-b border-gray-200">start Date</th>
                <th className="py-2 px-4 border-b border-gray-200">end Date</th>
                <th className="py-2 px-4 border-b border-gray-200">discount Amount</th>
                <th className="py-2 px-4 border-b border-gray-200">discountId</th> 
              </tr>
            </thead>
      { product.map((product)=>{
        return (
            <tbody>
              <tr className="hover:bg-gray-100 border-b">
                <td className="py-2 px-4 border-b border-gray-200 text-center">{product.productId}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{product.startDate}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{product.endDate}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{product.discountAmount}</td>
                <td className="py-2 px-4 border-b border-gray-200 text-center">{product.discountId}</td>
              </tr>
            </tbody>
        )
    })}
    </table>
    </div>
  );
};

export default Discount;

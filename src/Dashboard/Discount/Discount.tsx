import React, { useState } from 'react';
import { useQuery } from 'react-query';

import DiscountMenu from '@/components/ui/DiscountMenu';
import AddDiscountModel from '@/components/ui/AddDiscountModel';
import ScrollAnimatedComponent from '@/components/ScrollAnimatedComponent';
import axiosInstance from '@/config/axios.config';
import { IDiscount } from '@/interface';


const fetchProducts = async () => {
  const { data } = await axiosInstance.get('/api/Discount');
  return data;
};


const DiscountPage = () => {
  document.title = 'Discounts';
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  

  const { data: Discounts = [], error, isLoading } = useQuery('products', fetchProducts, {
    cacheTime: 5 * 60 * 1000, 
    staleTime: 2 * 60 * 1000, 
  });

  const totalPages = Math.ceil(Discounts.length / itemsPerPage);

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const Discount = Discounts.slice(startIndex, startIndex + itemsPerPage);

  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); 
  };

  


  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Error loading products</div>;

 
  return (
    <div className="w-full h-min m-5 p-4 border rounded-md flex flex-col bg-white shadow-lg">
         
        <ScrollAnimatedComponent direction="top">
        <div className='mb-5 flex justify-between'>
             <div>
                <div className="relative w-full max-w-md">
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 bg-white rounded-full py-2 pl-10 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    placeholder="Discound Search ..."
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m1.4-5.65A7 7 0 1110 3a7 7 0 018.05 7.75 7.75 0 013.55 0z" />
                      </svg>
                  </div>
                </div>
           </div>
          <AddDiscountModel/>
        </div>

      <table className="min-w-full border-collapse bg-gray-50">
        <thead>
          <tr className="bg-gray-200 border-b">
            <th className="p-3 text-center text-gray-600">Product ID</th>
            <th className="p-3 text-center text-gray-600">discount Amount</th>
            <th className="p-3 text-center text-gray-600">start Date</th>
            <th className="p-3 text-center text-gray-600">end Date</th>
            <th className="p-3 text-center text-gray-600">product Id</th>
            <th className="p-3 text-center text-gray-600">Options</th>
          </tr>
        </thead>
        <tbody>
          {Discount.map((product:IDiscount) => (
           
            <tr key={product.productId} className="hover:bg-gray-100 border-b">
              <td className="p-3 text-center">{product.discountId}</td>
              <td className="p-3 text-center">{product.discountAmount}</td>
              <td className="p-3 text-center">{product.startDate}</td>
              <td className="p-3 text-center">{product.endDate}</td>
              <td className="p-3 text-center">{product.productId}</td>
              <td className="p-3 text-center"><DiscountMenu discountId={product.discountId}/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col items-center mt-4 space-y-4">
        <div className="flex items-center space-x-4">
          <label htmlFor="items-per-page" className="text-gray-600">Items per page:</label>
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            &laquo; First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            &lsaquo; Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next &rsaquo;
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Last &raquo;
          </button>
        </div>
      </div>
        </ScrollAnimatedComponent>
    </div>
  );
};

export default DiscountPage;







import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../config/axios.config';
import{IShipper} from "../interface/index";
import ScrollAnimatedComponent from '@/components/ScrollAnimatedComponent';
import { Skeleton } from 'antd';
import AddShipperModel from '@/components/ui/AddShipperModel';
const fetchShipper = async () => {
  const { data } = await axiosInstance.get('/api/Shipper');
  return data;
};
const Shipper = ()=>{
  
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    
  
    const { data: Shipper = [], error, isLoading } = useQuery('Shipper', fetchShipper, {
      cacheTime: 5 * 60 * 1000, 
      staleTime: 2 * 60 * 1000, 
    });
  
    
  
  
    const totalPages = Math.ceil(Shipper.length / itemsPerPage);
  
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = Shipper.slice(startIndex, startIndex + itemsPerPage);
  
    
    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
  
    
    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setItemsPerPage(Number(event.target.value));
      setCurrentPage(1); 
    };
  
   
  
  
    
    if (error) return <div className="text-center py-4 text-red-600">Error loading Shipper</div>;
  
    return (
      
      <div className="w-full h-min m-5 p-4 border rounded-md flex flex-col bg-white shadow-lg">
        <ScrollAnimatedComponent direction="top">
        <div className='mb-3 flex justify-between'>
             <h3 className='text-xl'>Shippers</h3>
             <div>
                <AddShipperModel/>
             </div>
        </div>
  
        <table className="min-w-full border-collapse bg-gray-50">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-3 text-center text-gray-600">Shipper ID</th>
              <th className="p-3 text-center text-gray-600">Shipper Name</th>
              <th className="p-3 text-center text-gray-600">isDefault</th>
              <th className="p-3 text-center text-gray-600">phone</th>
              <th className="p-3 text-center text-gray-600">address</th>
              <th className="p-3 text-center text-gray-600">More options</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((Shipper:IShipper) => (
             
              <tr onClick={()=> console.log(Shipper.id)} key={Shipper.id} className="hover:bg-gray-100 border-b">
                {isLoading ? 
                  <Skeleton  active paragraph={{ rows: 2 }}/>
                  :
                <>
                <td className="p-3 text-center">{Shipper.id}</td>
                <td className="p-3 text-center">{Shipper.name}</td>
                <td className="p-3 text-center">{Shipper.isDefault}</td>
                <td className="p-3 text-center">{Shipper.phone}</td>
                <td className="p-3 text-center">{Shipper.address}</td>
                <td className="p-3 text-center">Options</td>
                </>}
              </tr>
            ))}
          </tbody>
        </table>
        </ScrollAnimatedComponent>
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
      </div>
    );
  };

export default Shipper;
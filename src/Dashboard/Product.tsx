import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axiosInstance from '../config/axios.config';
import{IProduct} from "../interface/index";

const fetchProducts = async () => {
  const { data } = await axiosInstance.get('/api/Product');
  return data;
};

const ProductPage = () => {
  const [loadingProduct, setLoadingProduct] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const queryClient = useQueryClient();

  const { data: products = [], error, isLoading } = useQuery('products', fetchProducts, {
    cacheTime: 5 * 60 * 1000, 
    staleTime: 2 * 60 * 1000, 
  });

  const deleteProduct = async (productId: number) => {
    setLoadingProduct(productId);
    try {
      await axiosInstance.delete(`/api/Product/${productId}`);
      queryClient.invalidateQueries('products');
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoadingProduct(null);
    }
  };


  const totalPages = Math.ceil(products.length / itemsPerPage);

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  
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
      <table className="min-w-full border-collapse bg-gray-50">
        <thead>
          <tr className="bg-gray-200 border-b">
            <th className="p-3 text-left text-gray-600">Product ID</th>
            <th className="p-3 text-left text-gray-600">Product Name</th>
            <th className="p-3 text-left text-gray-600">Category</th>
            <th className="p-3 text-left text-gray-600">Brand</th>
            <th className="p-3 text-left text-gray-600">Supplier</th>
            <th className="p-3 text-left text-gray-600">Unit Price</th>
            <th className="p-3 text-left text-gray-600">Units in Stock</th>
            <th className="p-3 text-left text-gray-600">Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product:IProduct) => (
           
            <tr onClick={()=> console.log(product.productId)} key={product.productId} className="hover:bg-gray-100 border-b">
              <td className="p-3 text-center">{product.productId}</td>
              <td className="p-3 text-center">{product.productName}</td>
              <td className="p-3 text-center">{product.category}</td>
              <td className="p-3 text-center">{product.brand}</td>
              <td className="p-3 text-center">{product.supplier}</td>
              <td className="p-3 text-center">{product.unitPrice}</td>
              <td className="p-3 text-center">{product.unitsInStock}</td>
              <td className="p-3 text-center">
                <button
                  onClick={() => deleteProduct(product.productId)}
                  className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${loadingProduct === product.productId ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loadingProduct === product.productId}
                >
                  {loadingProduct === product.productId ? 'Deleting...' : 'Delete'}
                </button>
              </td>
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
    </div>
  );
};

export default ProductPage;

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axiosInstance from '../../config/axios.config';
import Checkbox from '@mui/material/Checkbox';
import AddShipperModel from '@/components/ui/AddShipperModel';
import { Skeleton } from 'antd';
import ScrollAnimatedComponent from '@/components/ScrollAnimatedComponent';
import { useQueryClient } from 'react-query';

interface IShipper {
  id: number;
  name: string;
  isDefault: boolean;
  phone: string;
  address: string;
}

const fetchShipper = async () => {
  const { data } = await axiosInstance.get('/api/Shipper');
  return data;
};

const Shipper = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});
  const [selectAll, setSelectAll] = useState(false);
  const [shipperToDelete, setShipperToDelete] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { data: shippers = [], isLoading, error } = useQuery('shippers', fetchShipper);

  const totalPages = Math.ceil(shippers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = shippers.slice(startIndex, startIndex + itemsPerPage);

  // Handle "Select All" checkbox
  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);

    const updatedCheckedItems: { [key: number]: boolean } = {};
    currentProducts.forEach((item: IShipper) => {
      updatedCheckedItems[item.id] = isChecked;
    });
    setCheckedItems((prev) => ({ ...prev, ...updatedCheckedItems }));
  };

  // Handle individual checkbox
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const isChecked = event.target.checked;
    setCheckedItems((prev) => {
      const updatedCheckedItems = { ...prev, [id]: isChecked };

      // Update "Select All" state
      const allChecked = currentProducts.every((item: IShipper) => updatedCheckedItems[item.id]);
      setSelectAll(allChecked);

      return updatedCheckedItems;
    });
  };

  // Get the number of selected items
  const selectedItemsCount = Object.values(checkedItems).filter(Boolean).length;

  if (error) return <div className="text-center py-4 text-red-600">Error loading shippers</div>;


  const deleteShipper = async (id: number) => {
    setShipperToDelete(id);
    if (!id) return;
  
    try {
      await axiosInstance.delete(`/api/Shipper/${id}`);
  

      queryClient.invalidateQueries('shippers');
    } catch (error) {
      console.log(error);
    } finally {
      setShipperToDelete(null);
      setCheckedItems({});
      setSelectAll(false);
    }
  };

  return (
    <div className="w-full h-min m-5 p-4 border rounded-md flex flex-col bg-white shadow-lg">
      <ScrollAnimatedComponent direction="top">
        <div className="mb-3 flex justify-between">
          <h3 className="text-xl">Shippers</h3>
          <AddShipperModel />
        </div>

        <table className="min-w-full border-collapse bg-gray-50">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-3 text-center">
                <Checkbox
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  inputProps={{ 'aria-label': 'select all' }}
                />
              </th>
              <th className="p-3 text-center text-gray-600">Shipper ID</th>
              <th className="p-3 text-center text-gray-600">Shipper Name</th>
              <th className="p-3 text-center text-gray-600">Is Default</th>
              <th className="p-3 text-center text-gray-600">Phone</th>
              <th className="p-3 text-center text-gray-600">Address</th>
              <th className="p-3 text-center text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="p-3 text-center">
                  <Skeleton active paragraph={{ rows: 3 }} />
                </td>
              </tr>
            ) : (
              currentProducts.map((shipper: IShipper) => (
                <tr key={shipper.id} className="hover:bg-gray-100 border-b">
                  <td className="p-3 text-center">
                    <Checkbox
                      checked={!!checkedItems[shipper.id]}
                      onChange={(e) => handleCheckboxChange(e, shipper.id)}
                      inputProps={{ 'aria-label': `select-${shipper.id}` }}
                    />
                  </td>
                  <td className="p-3 text-center">{shipper.id}</td>
                  <td className="p-3 text-center">{shipper.name}</td>
                  <td className="p-3 text-center">{shipper.isDefault ? 'Yes' : 'No'}</td>
                  <td className="p-3 text-center">{shipper.phone}</td>
                  <td className="p-3 text-center">{shipper.address}</td>
                  <td className="p-3 text-center">
                    {checkedItems[shipper.id] ? (
                      <button
                        className={`${
                          shipperToDelete === shipper.id ? 'opacity-50 cursor-not-allowed text-white' : 'text-black'
                        } text-black border font-semibold border-black px-5 py-1.5 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300`}
                        style={{ borderRadius: '5px' }}
                        type='submit'
                        disabled={shipperToDelete === shipper.id}
                        onClick={() => deleteShipper(shipper.id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        className="border mx-auto border-black font-semibold px-5 py-1.5 hover:bg-black hover:text-white transition-all duration-300 ml-auto"
                        style={{ borderRadius: '5px' }}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>

          {/* Show tfoot only if at least one item is selected */}
          {selectedItemsCount > 1 && (
            <tfoot className="bg-gray-100">
              <tr>
                <td  className="p-2 text-center flex justify-center">
                  <button
                    className="text-black border font-semibold flex space-x-2 border-black px-5 py-1.5 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
                    style={{ borderRadius: '5px' }}
                  >
                    Delete
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                  </button>
                </td>
                <th className="p-3 text-center text-gray-600">Shipper ID</th>
              <th className="p-3 text-center text-gray-600">Shipper Name</th>
              <th className="p-3 text-center text-gray-600">Is Default</th>
              <th className="p-3 text-center text-gray-600">Phone</th>
              <th className="p-3 text-center text-gray-600">Address</th>
              <th className="p-3 text-center text-gray-600">Actions</th>
              </tr>
            </tfoot>
          )}
        </table>

        <div className="flex justify-between mt-4">
          <div>
            <label htmlFor="items-per-page" className="text-gray-600">
              Items per page:
            </label>
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="ml-2 p-2 border border-gray-300 rounded-md"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 mr-2 ${
                currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'
              } rounded-md`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 ${
                currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white hover:bg-blue-600'
              } rounded-md`}
            >
              Next
            </button>
          </div>
        </div>
      </ScrollAnimatedComponent>
    </div>
  );
};

export default Shipper;

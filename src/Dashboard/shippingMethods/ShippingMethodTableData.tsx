import { ShippingMethodTableDataProps } from "@/interface";
import Checkbox from "@mui/material/Checkbox";
import { Suspense, useEffect, useState } from "react";
import AddShippingMethodModel from "./AddShippingMethodMolde";
import axiosInstance from "@/config/axios.config";
import toast from "react-hot-toast";
import UpdateShippingMethodModel from "./UpdateShippingMethodModel";

const ShippingMethodTableData = ({
  shippingMethodData = [],
  refetchData,
  updateLocalData,
}: {
  shippingMethodData?: ShippingMethodTableDataProps[];
  refetchData: () => void;
  updateLocalData: (updatedMethod: ShippingMethodTableDataProps) => void;
}) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
    setCheckedItems({ ...checkedItems, [id]: event.target.checked });
  };

  const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);

    const updatedCheckedItems: { [key: string]: boolean } = {};
    shippingMethodData.forEach((item) => {
      updatedCheckedItems[item.id] = isChecked;
    });
    setCheckedItems(updatedCheckedItems);
  };

  useEffect(() => {
    const selectedItems = Object.keys(checkedItems).filter((key) => checkedItems[key]);
    setSelectedItems(selectedItems);
  }, [checkedItems]);

  const deleteItem = async () => {
    try {
      await axiosInstance.delete(`/api/ShippingMethods/${selectedItems[0]}`);
      toast.success("Shipping Method Deleted Successfully.", {
        position: "top-right",
        duration: 5000,
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(20px)",
          color: "green",
          width: "fit-content",
        },
      });
      refetchData();
    } catch (error) {
      toast.error("Something went wrong...", {
        position: "top-right",
        duration: 5000,
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(20px)",
          color: "red",
          width: "fit-content",
        },
      });
    } finally {
      setSelectedItems([]);
      setCheckedItems({});
    }
  };

  const renderShippingMethod = shippingMethodData.map((shippingMethod, index) => {
    const isChecked = checkedItems[shippingMethod.id] || false;
    return (
      <tr key={index}>
        <td className="p-2 text-center">
          <Suspense fallback={<h3>Loading...</h3>}>
            <Checkbox
              checked={isChecked}
              onChange={(e) => handleCheckboxChange(e, shippingMethod.id)}
              inputProps={{ "aria-label": `controlled-${shippingMethod.id}` }}
            />
          </Suspense>
        </td>
        <td className="p-2 text-center flex justify-center">{shippingMethod.id}</td>
        <td className="p-2 text-center">{shippingMethod.method}</td>
        <td className="p-2 text-center">
          {shippingMethod.description.length > 100
            ? `${shippingMethod.description.substring(0, 100)}...`
            : shippingMethod.description}
        </td>
        <td className="p-2 text-center">{shippingMethod.cost}</td>
        <td className="p-2 text-center flex justify-center">
          {+selectedItems[0] === shippingMethod.id && selectedItems.length < 2 ? (
            <button
              onClick={deleteItem}
              className="text-black flex space-x-1 border font-semibold border-black px-5 py-1.5 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
              style={{ borderRadius: "5px" }}
            >
              Delete
            </button>
          ) : (
            <Suspense fallback={<h3>Loading...</h3>}>
              <UpdateShippingMethodModel
                cost={shippingMethod.cost}
                description={shippingMethod.description}
                method={shippingMethod.method}
                id={shippingMethod.id}
                updateLocalData={updateLocalData}
              />
            </Suspense>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold">Shipping Methods</h1>
      <div className="flex justify-between items-center mb-2">
        <Suspense fallback={<h3>Loading...</h3>}>
          <AddShippingMethodModel />
        </Suspense>
      </div>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-center">
              <Checkbox
                checked={selectAll}
                onChange={handleSelectAllChange}
                inputProps={{ "aria-label": "select all" }}
              />
            </th>
            <th className="p-2 text-center">ID</th>
            <th className="p-2 text-center">Method</th>
            <th className="p-2 text-center">Description</th>
            <th className="p-2 text-center">Cost</th>
            <th className="p-2 text-center">Options</th>
          </tr>
        </thead>
        <tbody>{renderShippingMethod}</tbody>
        {selectAll || selectedItems.length >= 2 ? 
        <tfoot className="bg-gray-100">
{/* +selectedItems[0] */}
            <tr>
                <td  className="p-2 text-center flex justify-center">
                    
                    <button className="text-black flex space-x-1 border font-semibold border-black px-5 py-1.5 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300" style={{borderRadius:"5px"}}>
                        Delete 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                   </button>
                </td>
                <th className="p-2 text-center">ID</th>
            <th className="p-2 text-center">Method</th>
            <th className="p-2 text-center">Description</th>
            <th className="p-2 text-center">Cost</th>
            <th className="p-2 text-center">Options</th>
            </tr>
        </tfoot>
        :null}
      </table>
    </div>
  );
};

export default ShippingMethodTableData;
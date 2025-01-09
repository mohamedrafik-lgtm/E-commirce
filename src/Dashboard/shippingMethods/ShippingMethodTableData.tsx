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
      </table>
    </div>
  );
};

export default ShippingMethodTableData;
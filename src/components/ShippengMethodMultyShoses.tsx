import axiosInstance from "@/config/axios.config";
import React, { useEffect, useState } from "react";

interface ShippingMethod {
  id: number;
  method: string;
  description: string;
  cost: number;
}

interface ShippingOptionsProps {
  onShippingSelect: (method: ShippingMethod) => void;
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({ onShippingSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<number | null>(null);
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);

  useEffect(() => {
    const fetchShippingMethods = async () => {
      try {
        const { data } = await axiosInstance.get("/api/ShippingMethods");
        setShippingMethods(data);
      } catch (error) {
        console.error("Error fetching shipping methods:", error);
      }
    };

    fetchShippingMethods();
  }, []);

  const handleSelect = (method: ShippingMethod) => {
    setSelectedMethod(method.id);
    onShippingSelect(method); 
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-lg ">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Shipping Methods</h2>
      {/* Set max height and scrollable overflow */}
      <ul className="space-y-3 max-h-72 overflow-y-auto">
        {shippingMethods.map((method) => (
          <li
            style={{ borderRadius: "10px" }}
            key={method.id}
            className={`flex flex-col items-start p-4 border cursor-pointer transition ${
              selectedMethod === method.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-white hover:border-blue-500 hover:bg-blue-50"
            }`}
            onClick={() => handleSelect(method)}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={`shipping-${method.id}`}
                  name="shippingMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => handleSelect(method)}
                  className={`w-5 h-5 cursor-pointer appearance-none border-2 rounded-full border-gray-300 checked:border-blue-500 checked:bg-blue-500`}
                />
                <label
                  htmlFor={`shipping-${method.id}`}
                  className="text-md font-medium text-gray-800 cursor-pointer"
                >
                  {method.method}
                </label>
              </div>
              <span className="text-gray-600 text-sm font-medium">${method.cost}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">{method.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingOptions;

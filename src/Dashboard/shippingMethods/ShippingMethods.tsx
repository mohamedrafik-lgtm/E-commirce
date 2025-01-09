import useAuthenticatedQuery from "@/hook/useAuthenticatedQuery";
import { ShippingMethodTableDataProps } from "@/interface";
import { memo, useEffect, useState, useCallback } from "react";
import ShippingMethodTableData from "./ShippingMethodTableData";

const ShippingMethods = () => {
  const [shippingMethodData, setShippingMethodData] = useState<ShippingMethodTableDataProps[]>([]);
  const shippingMethodQuery = useAuthenticatedQuery({
    queryKey: ["shippingMethods"],
    url: "/api/ShippingMethods",
  });

  useEffect(() => {
    if (shippingMethodQuery.data) {
      setShippingMethodData(shippingMethodQuery.data);
    }
  }, [shippingMethodQuery.data]);

  const updateLocalData = useCallback((updatedMethod: ShippingMethodTableDataProps) => {
    setShippingMethodData((prevData) =>
      prevData.map((method) =>
        method.id === updatedMethod.id ? { ...method, ...updatedMethod } : method
      )
    );
  }, []);

  return (
    <div className="w-full p-5">
      <ShippingMethodTableData
        shippingMethodData={shippingMethodData}
        refetchData={shippingMethodQuery.refetch}
        updateLocalData={updateLocalData}
      />
    </div>
  );
};

export default memo(ShippingMethods);
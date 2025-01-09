import axiosInstance from "@/config/axios.config";
import { FormShippingMethod } from "@/data";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";

// interface IShippingMethod {
//   id?: number;
//   method: string;
//   description: string;
//   cost: number;
//   updateLocalData: (updatedMethod: IShippingMethod) => void;
//   [key: string]: string | number | undefined | ((updatedMethod: IShippingMethod) => void);
// }

interface IShippingMethod {

  id: number;

  method: string;

  description: string;

  cost: number;

  updateLocalData: (updatedMethod: IShippingMethod) => void;

  [key: string]: string | number | ((updatedMethod: IShippingMethod) => void);

}


export default function UpdateShippingMethodModel({
  cost,
  description,
  method,
  id,
  updateLocalData,
}: IShippingMethod) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const [values, setValues] = useState<IShippingMethod>({
    id: 0,
    method: "",
    description: "",
    cost: 0,
    updateLocalData: () => {},
  });
  useEffect(() => {
    setValues({ method, description, cost, id, updateLocalData });
  }, [method, description, cost, id, updateLocalData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const renderShippingMethod = useCallback(() => {
    return FormShippingMethod.map((shippingMethod, index) => (
      <div key={index}>
        <label className="">{shippingMethod.label}</label>
        <input
          value={typeof values[shippingMethod.name] === 'function' ? '' : values[shippingMethod.name] as string | number | readonly string[] | undefined}
          type={shippingMethod.type}
          onChange={handleChange}
          name={shippingMethod.name}
          className="w-full bg-white/10 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-black/20"
          style={{ borderRadius: "5px" }}
        />
      </div>
    ));
  }, [handleChange, values]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/api/ShippingMethods/${id}`, values);
      toast.success("Shipping Method Updated Successfully", {
        position: "top-right",
        duration: 5000,
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(20px)",
          color: "green",
          width: "fit-content",
        },
      });
      updateLocalData(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Update Shipping Method");
    } finally {
      close();
    }
  };

  return (
    <>
      <Button
        onClick={open}
        className="border-2 mx-auto border-black font-semibold px-5 py-1.5 hover:bg-black hover:text-white transition-all duration-300 ml-auto"
        style={{ borderRadius: "5px" }}
      >
        Update
      </Button>

      <Dialog
        open={isOpen}
        as="form"
        className="relative z-10 focus:outline-none"
        onClose={close}
        onSubmit={submitHandler}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md bg-black/5 rounded-xl p-6 backdrop-blur-md duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium ">
                Update Shipping Method
              </DialogTitle>

              <div className="mt-4 space-y-2">
                {renderShippingMethod()}
              </div>
              <div className="mt-4 space-x-3">
                <Button
                  className="inline-flex items-center gap-2 border border-black rounded-md py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-black hover:text-white data-[focus]:outline-1 data-[focus]:outline-black data-[open]:bg-gray-700"
                  type="submit"
                  style={{ borderRadius: "5px" }}
                >
                  Update Method
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md text-gray-600 border border-gray-300 py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-gray-700 data-[open]:bg-gray-700"
                  onClick={close}
                  style={{ borderRadius: "5px" }}
                >
                  Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
import axiosInstance from '@/config/axios.config';
import { FormShipper } from '@/data'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';
import CircularProgress from '@mui/material/CircularProgress';
import { jwtDecode } from "jwt-decode";


interface IUser{
  sub: string;
  uid: string;
}

interface IShipper {
  name: string;
  address: string;
  phone: string;
  isDefault: boolean ;
}
export default function AddShipperModel() {
  const [isOpen, setIsOpen] = useState(false)
  const [shipperValues, setShipperValues] = useState<IShipper>({
    name: "",
    address: "",
    phone: "",
    isDefault: false,
  });
  const [isLoading,setIsLoading] = useState(false)
  console.log(shipperValues)
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }
  const storageKey = "loginData";
const userDataString = localStorage.getItem(storageKey);
let userID = null;

if (userDataString) {
  try {
    const userData = JSON.parse(userDataString);

    if (userData?.token) {
      const decodedToken:IUser = jwtDecode(userData.token);
      userID =  decodedToken.uid;
    } else {
      console.error("Token is missing in userData.");
    }
  } catch (error) {
    console.error("Failed to parse userData or decode token:", error);
  }
} else {
  console.warn("No login data found in localStorage.");
}

console.log( userID);
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setShipperValues({ 
      ...shipperValues,
       [name]:value   })
  if (name === "isDefault") {
    setShipperValues({
      ...shipperValues,
      [name]: e.target.checked,
    });
  }
}


 

   const renderInput = FormShipper.map((Shipper) => {
    return <div key={Shipper.id}>
      <label htmlFor={Shipper.id} className="block text-sm font-medium text-gray-700">
        {Shipper.label}
      </label>
      <div className="mt-1">
        <input
          type={Shipper.type}
          id={Shipper.id}
          name={Shipper.name}
          style={{borderRadius: "10px"}}
          onChange={handleChange}
          className={`block
            ${Shipper.name === "isDefault" ? "w-fit" : "w-full"}
             shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300
             p-2
            `}
        />
      </div>
   </div>

   })

const handelSubmit =async (e:FormEvent<HTMLFormElement>)=>{
    setIsLoading(true);
    e.preventDefault();
    try {
      await axiosInstance.post('/api/Shipper',shipperValues);
      toast.success('Shipper Added Successfully');
    } catch (error) {
      console.log(error)
      toast.error('Failed to Add Shipper');
    }finally{
      
      setIsLoading(false);
      close();
      setShipperValues({
        name: "",
        address: "",
        phone: "",
        isDefault: false,
      });
    }
}

  return (
    <>
      <Button
        onClick={open}
        className="px-3 py-2 border hover:text-white hover:bg-black transition duration-300"
      >
        Add Shipper
      </Button>

      <Dialog open={isOpen} as="form" className="relative z-10 focus:outline-none" onClose={close} __demoMode onSubmit={handelSubmit}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium ">
                Add Shipper
              
              </DialogTitle>
              
              <div className="mt-4 space-y-4">
                { 
                renderInput
                }
                  </div>
              <div className="mt-4 space-x-3">
               <Button
                  className={`inline-flex space-x-1 items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none border border-black transition-all duration-300 data-[hover]:bg-black hover:text-white data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 ${isLoading ? 'cursor-not-allowed opacity-90' : ''}`}disabled={isLoading}
                  type='submit'
                  style={{borderRadius:"5px"}}
                  
                >
                 Add Shipper
                 {
                  isLoading ? <CircularProgress color='inherit' size="25px" /> : null
                 }
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 border border-red-600 text-red-500 focus:outline-none data-[hover]:bg-red-600 hover:text-white data-[focus]:outline-1 data-[focus]:outline-white"
                  onClick={close}
                  type='button'
                  style={{borderRadius:"5px"}}
                >
                 Close
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}


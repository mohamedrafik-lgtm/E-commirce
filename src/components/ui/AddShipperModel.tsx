import { FormShipper } from '@/data'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
// import { jwtDecode } from "jwt-decode";


// interface IUser{
//   sub: string;
//   uid: string;
// }
export default function AddShipperModel() {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }
//   const storageKey = "loginData";
// const userDataString = localStorage.getItem(storageKey);
// let userID = null;

// if (userDataString) {
//   try {
//     const userData = JSON.parse(userDataString);

//     if (userData?.token) {
//       const decodedToken:IUser = jwtDecode(userData.token);
//       userID =  decodedToken.uid;
//     } else {
//       console.error("Token is missing in userData.");
//     }
//   } catch (error) {
//     console.error("Failed to parse userData or decode token:", error);
//   }
// } else {
//   console.warn("No login data found in localStorage.");
// }

// console.log( userID);

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
          onChange={(e) => {
            console.log(e.target.value)
          }}
          className={`block
            ${Shipper.name === "isDefault" ? "w-fit" : "w-full"}
             shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300
             p-2
            `}
        />
      </div>
   </div>

   })

  return (
    <>
      <Button
        onClick={open}
        className="px-3 py-2 border hover:text-white hover:bg-black transition duration-300"
      >
        Add Shipper
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium ">
                Add Shipper
              
              </DialogTitle>
              
              <form className="mt-4 space-y-4">
                { 
                renderInput
                }
                  </form>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                 Add Shipper
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}


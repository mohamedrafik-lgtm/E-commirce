// import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
// import { useState } from 'react'
// import Model from './Model'
// import { useQueryClient } from 'react-query';
// import axiosInstance from '../config/axios.config';



// interface IProp{
//     productId: number;
// }
// export default function OptionsModel({productId}:IProp) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [loadingProduct, setLoadingProduct] = useState<number | null>(null);
//   const queryClient = useQueryClient();
//   function open() {
//     setIsOpen(true)
//   }

//   function close() {
//     setIsOpen(false)
//   }

//   const deleteProduct = async (productId: number) => {
//     setLoadingProduct(productId);
//     try {
//       await axiosInstance.delete(`/api/Product/${productId}`);
//       queryClient.invalidateQueries('products');
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     } finally {
//       setLoadingProduct(null);
//     }
//   };

//   return (
//     <>
//       <Button
//         onClick={open}
//         className="rounded-md bg-blue-500 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white"
//       >
//         More choices..
//       </Button>

//       <Dialog open={isOpen} as="div" className="relative z-10  focus:outline-none" onClose={close}>
//         <div className="fixed inset-0 z-10  w-screen overflow-y-auto">
//           <div className="flex min-h-full items-center  justify-center p-4">
//             <DialogPanel
//               transition
//               className="w-full max-w-md rounded-xl border bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
//             >
//               <DialogTitle as="h3" className="text-base/7 mb-3 font-medium ">
//               Options
//               </DialogTitle>


//                <div className='flex justify-around'>
//                     <Model productId={productId}/>

//                     <button
//                        onClick={() => deleteProduct(productId)}
//                        className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${loadingProduct === productId ? 'opacity-50 cursor-not-allowed' : ''}`}
//                        disabled={loadingProduct === productId}
//                     >
//                        {loadingProduct === productId? 'Deleting...' : 'Delete'}
//                     </button>
//                </div>
//               <div className="mt-4 items-center">
//                 <Button
//                   className="inline-flex items-center w-full justify-center  gap-2 rounded-md bg-blue-500 p-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
//                   onClick={close}
//                 >
//                   Close Model
//                 </Button>
//               </div>
//             </DialogPanel>
//           </div>
//         </div>
//       </Dialog>
//     </>
//   )
// }

import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Model from './Model';
import { useState } from 'react';
import axiosInstance from '@/config/axios.config';
import { useQueryClient } from 'react-query';
import toast from 'react-hot-toast';


interface IProp{
    productId: number;
}
export default function OptionsModel({productId}:IProp) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [loadingProduct, setLoadingProduct] = useState<number | null>(null);
  const open = Boolean(anchorEl);
    const queryClient = useQueryClient();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

    const Archive =async (productId:number)=>{
      setLoadingProduct(productId);
        try {
          await axiosInstance.post(`/api/Product/archive/${productId}`);
          toast.success("The product has been added to the archive.", {
            position: "top-right",
            duration: 1500,
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(20px)',
              color: "green",
              width: "fit-content",
            },
          });
        } catch (error) {
          console.error('Error archiving product:', error);
        } finally {
          setLoadingProduct(null);
        }
    }

    const unArchive = async (productId:number)=>{

      setLoadingProduct(productId);
        try {
          await axiosInstance.post(`/api/Product/unarchive/${productId}`);
          toast.success("The product has been restored.", {
            position: "top-right",
            duration: 1500,
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(20px)',
              color: "green",
              width: "fit-content",
            },
          });
        } catch (error) {
          console.error('Error unarchiving product:', error);
        } finally {
          setLoadingProduct(null);
        }
    }

  return (
    <div>
      <Button
        id="basic-button"
        style={{
          color:'white',
          backgroundColor:'#3B82F6',
        }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        options..
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><Model productId={productId}/></MenuItem>

        <MenuItem onClick={handleClose}>
                    <button
                     onClick={()=>Archive(productId)}
                     className="rounded-md border px-2 text-base font-medium py-3 w-full focus:outline-none"
                     style={{
                      borderRadius: '10px'
                     }}>
                       Archive Product
                    </button>
                    </MenuItem>

                    <MenuItem onClick={handleClose}>
                    <button
                     onClick={()=>unArchive(productId)}
                     className="rounded-md border px-2 text-base font-medium py-3 w-full focus:outline-none"
                     style={{
                      borderRadius: '10px'
                     }}>
                       Un Archive
                    </button>
                    </MenuItem>



        <MenuItem onClick={handleClose}><button
                       onClick={() => deleteProduct(productId)}
                       style={{
                        borderRadius: '10px'
                       }}
                       className={`px-4 py-2 bg-red-600 text-white hover:bg-red-700 w-full ${loadingProduct === productId ? 'opacity-50 cursor-not-allowed' : ''}`}
                       disabled={loadingProduct === productId}
                    >
                       {loadingProduct === productId? 'Deleting...' : 'Delete'}
                    </button></MenuItem>
                    
      </Menu>
    </div>
  );
}

import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import Model from './Model'
import { useQueryClient } from 'react-query';
import axiosInstance from '../config/axios.config';



interface IProp{
    productId: number;
}
export default function OptionsModel({productId}:IProp) {
  const [isOpen, setIsOpen] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState<number | null>(null);
  const queryClient = useQueryClient();
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

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

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-blue-500 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        More choices..
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10  focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10  w-screen overflow-y-auto">
          <div className="flex min-h-full items-center  justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl border bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 mb-3 font-medium ">
              Options
              </DialogTitle>


               <div className='flex justify-around'>
                    <Model productId={productId}/>

                    <button
                       onClick={() => deleteProduct(productId)}
                       className={`px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 ${loadingProduct === productId ? 'opacity-50 cursor-not-allowed' : ''}`}
                       disabled={loadingProduct === productId}
                    >
                       {loadingProduct === productId? 'Deleting...' : 'Delete'}
                    </button>
               </div>
              <div className="mt-4 items-center">
                <Button
                  className="inline-flex items-center w-full justify-center  gap-2 rounded-md bg-blue-500 p-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Close Model
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}
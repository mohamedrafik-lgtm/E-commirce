import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import InputComponent from './ui/InputComponent'
import axiosInstance from '@/config/axios.config'
import toast from 'react-hot-toast'


interface ICart{
    cartId:number,
    productId:number
}
export default function UpdateCartModel({productId}:ICart) {

    const storageKey = "loginData"
    const userDataString = localStorage.getItem(storageKey)
    const userData =userDataString ? JSON.parse(userDataString) : null;
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [quantity, setQuantity] = useState('')
    console.log(Number(quantity))
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const updateCartItems = (productId:number)=>{
    try {
         axiosInstance.put(`/api/CartItem/update`,{
            productId: productId,
            quantity: Number(quantity)
         },{
             headers: {
                 'Authorization': `Bearer ${userData?.token}`
             }
            //  Item updated successfully!
         }).then((response)=> response.data).then(() => {
            toast.success(`Item updated successfully!`, {
                position: "top-right",
                duration: 1000,
                style: {
                    backgroundColor: "white",
                    color: "green",
                  width: "fit-content",
                },
              });
         })
     } catch (error) {
         console.log(error)
         toast.error(`There was an error updating the card.`, {
            position: "top-right",
            duration: 1000,
            style: {
              backgroundColor: "red",
              color: "white",
              width: "fit-content",
            },
          });
     }finally{
        close()
        setQuantity('')
     }
 }


  return (
    <>
      <Button
        onClick={open}
        style={{
            borderRadius: '10px'
        }}
        className="px-4 py-2 w-fit bg-blue-500 text-white hover:bg-blue-600 mx-auto transition-all duration-300"
      >
        options
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 border p-6 backdrop-blur-md duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium ">
                Update cart item
              </DialogTitle>

              <div className='flex flex-col space-y-2 text-lg'>
              <label htmlFor="quantity">quantity</label>
              <InputComponent value={quantity} onChange={e => setQuantity(e.target.value)} type='number' name='quantity' id='quantity' placeholder='inter quantity' className='py-2 px-2 focus:outline-none border-b focus:border-blue-500 bg-white/5 backdrop-blur-md '/>
              </div>
              <div className="mt-6 flex justify-between">
                <Button
                style={{
                    borderRadius: '10px' 
                }}
                  className="inline-flex items-center  gap-2 bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Close Model
                </Button>

                <button 
                    onClick={()=> updateCartItems(productId)}
                    style={{ borderRadius: "10px" }} 
                    className="px-4 py-2 w-fit bg-orange-500 text-white hover:bg-orange-600 transition-all duration-300">Update</button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

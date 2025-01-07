import axiosInstance from '@/config/axios.config'
import { FormShippingMethod } from '@/data'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function AddShippingMethodModel() {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const [values, setValues] = useState({
    method: "",
    description: "",
    cost: "",
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    setValues({ ...values,
       [name]:value   })
  }
console.log(values)
  const renderShippingMethod  =FormShippingMethod.map((shippingMethod, index) => {
    return (
      <div key={index}>
        <label className="">{shippingMethod.label}</label>
        <input type={shippingMethod.type} onChange={handleChange} name={shippingMethod.name} className="w-full bg-white/10  p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border"style={{borderRadius:"5px"}}/>
      </div>
    );
  })

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

     try {
        await axiosInstance.post(`/api/ShippingMethods`,values)
        toast.success('Shipping Method Added Successfully')
     } catch (error) {
        toast.error('Failed to Add Shipping Method')
     }finally{
      close()
      setValues({
        method: "",
        description: "",
        cost: "",
      })
     }
    
}

  return (
    <>
      <Button
        onClick={open}
        className="text-white bg-blue-500 px-5 py-1.5 hover:bg-blue-600 transition-all duration-300 ml-auto" style={{borderRadius:"5px"}}>Add Shipping Method
      </Button>

      <Dialog open={isOpen} as="form" className="relative z-10 focus:outline-none" onClose={close} __demoMode onSubmit={handleSubmit}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium ">
                Add Shipping Method
              </DialogTitle>
                
                <div className="mt-4 space-y-2">
                  {/* <label className="">Method</label>
                  <input type="text" name='' className="w-full bg-white/10  p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border"style={{borderRadius:"5px"}}/> */}
                  {renderShippingMethod}
                </div>
              <div className="mt-4 space-x-3">
              <Button
                  className="inline-flex items-center gap-2 rounded-md bg-blue-500 py-1.5 px-3 text-sm/6 text-white font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  type='submit'
                  style={{borderRadius:"5px"}}
                >
                  Add Method
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md text-gray-600 border border-gray-300 py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-gray-700 data-[open]:bg-gray-700"
                  onClick={close}style={{borderRadius:"5px"}}
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

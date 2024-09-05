import axiosInstance from '@/config/axios.config'
import { AddDiscountInput } from '@/data'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export default function AddDiscountModel() {
  const [isOpen, setIsOpen] = useState(false)
  
  interface IDiscountValue{
    discountAmount: number ,
    startDate: string ,
    endDate: string ,
    productId: number ,
  }
  const [discountValue, setDiscountValue] = useState<IDiscountValue>({
    discountAmount:0,
    startDate: '',
    endDate: '',
    productId: 0
  })
  console.log(discountValue)
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  const getDiscountValue = (name:string)=>{
   if(name === "discountAmount"){
    return discountValue.discountAmount
   }
   if(name === "startDate"){
    return discountValue.startDate
   }
   if(name === "endDate"){
    return discountValue.endDate
   }
   if(name === "productId"){
    return discountValue.productId
   }
   return '';
  }
  // handlers

  const handelChange = (event: ChangeEvent<HTMLInputElement>)=>{
    const { value, name } = event.target;
    setDiscountValue({
      ...discountValue,
    [name]: value
    })
  }

//   render 

    const renderAddDiscountInputs = AddDiscountInput.map((data) => {
        return (
          <div key={data.id} className="flex flex-wrap gap-2 mb-4">
            <label htmlFor={data.id}>{data.name}</label>
            <input
              style={{
                borderRadius: '5px'
              }}
              type={data.type}
              id={data.id}
              name={data.name}
              value={getDiscountValue(data.name)}
              onChange={handelChange}
              className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300  focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )
  
    })

    // submit
    
    const onSubmit =async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        try {
            const data = await axiosInstance.post('/api/Discount',{
                params:{
                    ...discountValue
                }
            })
                toast.success(`Discount has been added to this product.`, {
                    position: "top-right",
                    duration: 5000,
                    style: {
                      backgroundColor: "#90ee90",
                      color: "#000000",
                      width: "fit-content",
                    },
                  });
                console.log(data)
            
            setIsOpen(false)
        } catch (error) {
            console.log(error)
            toast.error(`${error}`, {
                position: "top-right",
                duration: 5000,
                style: {
                  backgroundColor: "red",
                  color: "white",
                  width: "fit-content",
                },
              });
            
        }
    }

  return (
    <>
      <Button
        onClick={open}
        style={{
            borderRadius:'10px',
            marginRight: '20px',
        }}
        className="bg-blue-500 py-2 px-4 text-sm font-medium transition-all text-white focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Add Discount
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl border bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium">
              Add a discount to a product
              </DialogTitle>
                <form onSubmit={onSubmit} className="mt-4">
                     <div className='grid grid-cols-2 gap-3'>
                        {renderAddDiscountInputs}
                     </div>
                    <div className='flex justify-between'>
                <button 
                  style={{
                    borderRadius:'10px'
                  }}
                  type='button'
                  className="inline-flex transition-all items-center gap-2 bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}>
                  Close Model
                </button>

                <Button
                style={{
                    borderRadius:'10px',
                }}
                  type='submit'
                  className="inline-flex items-center transition-all gap-2 rounded-md bg-blue-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-blue-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}>
                  Add Discount
                </Button>
                    </div>
                </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}



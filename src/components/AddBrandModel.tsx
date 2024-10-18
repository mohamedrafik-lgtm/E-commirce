
import InputComponent from '@/components/ui/InputComponent';
import axiosInstance from '@/config/axios.config'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'



interface IBrand{
    BrandName: string;
    ImageFile:string;
}

export default function AddBrandModel() {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }



  const [brand, setBrand] = useState<IBrand>({
    BrandName: '',
    ImageFile:''
})
console.log(brand)
  // handlers
  const handelChange = (e:ChangeEvent<HTMLInputElement>)=>{
      const { value, name } = e.target;
      setBrand({
         ...brand,
      [name]: value
      })
  }

  
    const handelSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
            const formData = new FormData
            formData.append("Name",brand.BrandName)
            formData.append("ImageFile",brand.ImageFile)
             try {
                await axiosInstance.post("/api/Brand",formData);
                toast.success('Brand has been added successfully.', {
                    position: "top-right",
                    duration: 5000,
                    style: {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                      backdropFilter: 'blur(20px)',
                      color: "green",
                      width: "fit-content",
                    },
                });
                setBrand({
                    BrandName: '',
                    ImageFile:''
                })
                close()
             } catch (error) {
                console.log(error)
             }
          
          
           }
  
  return (
    <>
      <Button
        onClick={open}
        className="flex bg-black rounded-full w-32 h-32 justify-center items-center text-9xl text-white hover:bg-opacity-80 transition-all duration-300 mx-auto mt-10"
      >
        <p className='mb-6'>+</p>
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full space-y-3 max-w-md rounded-xl bg-white/20 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
                <div className='flex justify-between'>
                    <DialogTitle as="h3" className="text-2xl font-medium ">
                      Add Brand
                    </DialogTitle>
                    <Button
                  className="mt-"
                  onClick={close}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-11  hover:text-red-600 rounded-full transition-all duration-300">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>

                </Button>
                </div>
                <div>
                    <form onSubmit={handelSubmit} className="space-y-4">
                        <div>
                           <label htmlFor="CategoryName">Brand Name</label>
                           <InputComponent onChange={handelChange} value={brand.BrandName} id="brandName" type="text" name="BrandName"  placeholder="Enter brand Name" className="custom-input mb-1 w-full p-2 rounded-md"/>
                        </div>
                        <div className="w-full">
                           <label htmlFor="ImageFile" className="cursor-pointer border  py-2 px-4 rounded-md hover:bg-black hover:text-white transition duration-200">
                              Upload Image
                           </label>
                           <InputComponent onChange={handelChange} value={brand.ImageFile} type="file" id="ImageFile" name="ImageFile" className="hidden" />
                        </div>
                        <button className='w-full text-lg bg-black text-white py-2 rounded-md hover:black/20 hover:text-white hover:border transition-all'style={{borderRadius:"15px"}} type="submit">Add Category</button>
                    </form>
                </div>
              
                
              
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

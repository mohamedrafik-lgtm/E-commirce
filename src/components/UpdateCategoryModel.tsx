import axiosInstance from '@/config/axios.config';
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChangeEvent, useEffect, useState } from 'react'

interface IcategoryData{
    Id : number;
    Name : string;
    Description : string;
    ImageUrl : string;
}


export default function UbdateCategory({Description,Id,ImageUrl,Name}:IcategoryData) {
  const [isOpen, setIsOpen] = useState(false)
  const [updateCategory,setUpdateCategory] = useState<IcategoryData>({
    Id:0,
    Name:'',
    Description:'',
    ImageUrl:'',
  })
  
  console.log(updateCategory)
  useEffect(() => {
    setUpdateCategory({
      Id,
      Name,
      Description,
      ImageUrl,
    })
  }, [Id, Name, Description, ImageUrl])

  const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
   const { value, name } = e.target;
   setUpdateCategory({
     ...updateCategory,
     [name]: value,
   })
  }
  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }


  const handelSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formData = new FormData
    formData.append('Id',updateCategory.Id.toString());
    formData.append('Name',updateCategory.Name);
    formData.append('Description',updateCategory.Description);
    formData.append('ImageUrl',updateCategory.ImageUrl);
    try {
       await axiosInstance.put("/api/Category",formData)  
       close()
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
      <Button
        onClick={open}
        className="w-full py-2 border hover:text-white hover:bg-black transition-all duration-300"
      >
        Update Category
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle as="h3" className="text-base/7 font-medium">
                Ubdate product : {Id}
              </DialogTitle>

              <form className='space-y-3' onSubmit={handelSubmit}>
                <div>
                  <label htmlFor='Name' className='block text-sm/6 font-medium text-gray-700'>Name</label>
                  <input onChange={handleChange} value={updateCategory.Name} style={{
                    borderRadius:'5px'
                  }} type='text' name='Name' id='Name' className='w-full px-3 py-2 text-sm/6 placeholder-gray-500 border-gray-200 rounded-md focus:outline-none focus:border-blue-300 shadow-md'/>
                </div>
                <div>
                  <label htmlFor='Description' className='block text-sm/6 font-medium text-gray-700'>Description</label>
                  <input onChange={handleChange} value={updateCategory.Description} style={{
                    borderRadius:'5px'
                  }} type='text' name='Description' id='Description' className='w-full px-3 py-2 text-sm/6 placeholder-gray-500 border-gray-200 rounded-md focus:outline-none focus:border-blue-300 shadow-md'/>
                </div>
                <div className='mt-2'>
                <label htmlFor="ImageUrl" className="cursor-pointer border  py-2 px-4 rounded-md hover:bg-black hover:text-white transition duration-200">ImageUrl</label>
                  <input onChange={handleChange}  style={{
                    borderRadius:'5px'
                  }} type='file' id='ImageUrl' name='ImageUrl' className='hidden'/>
                </div>
                 
                <div className='mt-3'>
                <button
                type='submit'
                style={{
                    borderRadius:'5px'
                  }} className='w-full py-2 border hover:bg-black hover:text-white transition-all duration-300'>Ubdate</button>
              </div>
              </form>
                
              <div className="absolute top-2 right-2">
                <Button
                  className="text-red-500 hover:text-red-600"
                  type='button'
                  onClick={close}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </Button>
              </div>
              
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

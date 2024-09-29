import InputComponent from '@/components/ui/InputComponent';
import axiosInstance from '@/config/axios.config'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ChangeEvent, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'



interface ICategory{
    CategoryName: string;
    CategoryDescription:string
}

export default function AddCategoryModel() {
  const [isOpen, setIsOpen] = useState(false)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }



  const [CategoryValue, setCategoryValue] = useState<ICategory>({
    CategoryName: '',
    CategoryDescription: ''
})
  // handlers
  const handelChange = (e:ChangeEvent<HTMLInputElement>)=>{
      const { value, name } = e.target;
      setCategoryValue({
         ...CategoryValue,
      [name]: value
      })
  }

  
    const handelSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
    
           try {
             const {status}= await axiosInstance.post('/Add',{
               Name:CategoryValue.CategoryName,
               CategoryDescription:CategoryValue.CategoryDescription,
             })
             if(status===200){
                 toast.success(`Add Category successfully`, {
                   position: "top-right",
                   duration: 1500,
                   style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    backdropFilter: 'blur(20px)',
                    color: "green",
                    width: "fit-content",
                  },
                 });
    
             }
           } catch (error) {
               toast.error(`${error}`, {
                   position: "top-right",
                   duration: 1500,
                   style: {
                     backgroundColor: "red",
                     color: "white",
                     width: "fit-content",
                   },
                 });
           }finally{
               setCategoryValue({
                   CategoryName: '',
                   CategoryDescription: ''
               })
           }
          
           }
  
  return (
    <>
      <Button
        onClick={open}
        className="flex bg-black rounded-full w-32 h-32 justify-center items-center text-9xl text-white hover:bg-opacity-80 transition-all duration-300 mx-auto"
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
                      Add Categoru
                    </DialogTitle>
                    <Button
                  className=""
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
                           <label htmlFor="CategoryName">Category Name</label>
                           <InputComponent onChange={handelChange} value={CategoryValue.CategoryName} id="CategoryName" type="text" name="CategoryName"  placeholder="Enter Category Name" className="custom-input mb-1 w-full p-2 rounded-md"/>
                        </div>

                        <div className="w-full">
                           <label htmlFor="CategoryDescription">Category Description</label>
                           <InputComponent onChange={handelChange} value={CategoryValue.CategoryDescription} type="text" id="CategoryDescription" name="CategoryDescription" placeholder="Enter Category description" className="custom-input mb-1 w-full p-2 rounded-md" />
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

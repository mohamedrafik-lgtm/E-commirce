import axiosInstance from '@/config/axios.config'
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FormEvent, useEffect, useState } from 'react'


interface IProp{
    NameOfTheContentToBeModified: string,
    token:string,
}
export default function EditProfileDataModel({NameOfTheContentToBeModified,token}:IProp) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
console.log(inputValue)

  useEffect(() => {
    setInputValue(NameOfTheContentToBeModified)
  }, [NameOfTheContentToBeModified])
  function open() {
    setIsOpen(true)
  }


  function close() {
    setIsOpen(false)
  }
  

  const updateProfile = async (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const formData = new FormData
    formData.append("Country",inputValue)
    try {
     const res= await axiosInstance.patch("/api/UserProfiles/Update",{
      formData
      },{
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }

  }

  return (
    <>
      <Button
        onClick={open}
        
      >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                  </svg>
      </Button>

      <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close} __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/20 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 border"
            >
              <DialogTitle as="h3" className="text-xl font-medium mb-3">
                Edit The Role
              </DialogTitle>
               <form onSubmit={updateProfile} className='flex flex-col'>
                 <label className='ml-1' htmlFor="role">Role:</label>
                 <input value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" id="role" name="role" placeholder="Enter role" className="py-2 px-2 focus:outline-none border-b focus:border-blue-500 bg-white/5 backdrop-blur-md " />
                 <div className="mt-4 flex justify-between">
                <Button
                style={{
                    borderRadius:"5px",
                }}
                  type='button'
                  className="inline-flex items-center gap-2 bg-red-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-red-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Close
                </Button>
                <Button
                style={{
                    borderRadius:"5px",
                }}
                  type='submit'
                  className="inline-flex items-center gap-2 bg-green-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-green-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={close}
                >
                  Update
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

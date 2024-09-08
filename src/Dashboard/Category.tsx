import InputComponent from "@/components/ui/InputComponent";
import axiosInstance from "@/config/axios.config";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";


interface ICategory{
    CategoryName: string;
    CategoryDescription:string
}
const Category = ()=>{
    const [CategoryValue, setCategoryValue] = useState<ICategory>({
        CategoryName: '',
        CategoryDescription: ''
    })

    console.log(CategoryValue)
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
                  backgroundColor: "#90ee90",
                  color: "#000000",
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
        <div className="flex w-full h-fit justify-around">
            <div className="p-5 border mt-5" style={{borderRadius:"15px"}}>
                <div className="text-2xl space-y-3 mb-3">
                  <h3>Add Category</h3>
                  <hr />
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
                        <button className='w-full text-lg bg-blue-500 text-white py-2 rounded-md hover:bg-white hover:text-blue-500 hover:border transition-all'style={{borderRadius:"15px"}} type="submit">Add Category</button>
                    </form>
                </div>
            </div>
    
        </div>
    )
}

export default Category;
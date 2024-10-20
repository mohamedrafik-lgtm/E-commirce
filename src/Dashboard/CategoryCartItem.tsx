import UbdateCategory from "@/components/UpdateCategoryModel"
import axiosInstance from "@/config/axios.config"
import toast from "react-hot-toast"

interface IProps{
  name: string,
  imageUrl:string,
  id:number,
  description:string,
}

const CategoryCartItem = ({imageUrl,name,id,description = "no description yet"}:IProps)=>{
     


    const DeleteCategory = async (id:number)=>{
    
        try {
            await axiosInstance.delete(`/api/Category/${id}`)
            toast.success(`Category deleted`)
        } catch (error) {
            console.log(error)
        }
    }
    // const discription:string = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore ducimus quia, reiciendis quaerat velit fugit magni ipsam amet esse itaque!"
    return (
        <div style={{
            borderRadius: 15,
        }} className="space-y-3 p-3 !border mx-auto mt-10 relative">
            <div className="absolute inset-0 flex flex-col opacity-0 h-72 hover:opacity-100 transition-opacity duration-500 ease-in-out items-end mr-3 mt-1">
                <button onClick={()=> DeleteCategory(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-red-600 hover:text-red-700">
                         <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>
            <div className="w-64 h-full overflow-hidden mx-auto">
                <img 
             src={imageUrl}
             className="w-full h-64 object-top mx-auto" 
          style={{
            objectFit: "cover", 
            borderRadius: 15,
          }}/>
            </div>
            <div>
                <h3 className="mb-2 text-xl mt-2">{name}</h3>
                <p>{description && description.length > 50 ? `${description.slice(0, 50)}...` : description || "no description yet"}</p>
            </div>
            <div>

                <UbdateCategory ImageUrl={imageUrl} Id={id} Name={name} Description={description}/>
            </div>
        </div>
    )
}

export default CategoryCartItem;
import axiosInstance from "@/config/axios.config";
import { useState } from "react";
import { toast } from 'react-hot-toast';

interface BrandItemProps {
  id: number;
  imgURL: string;
  BrandName: string;

}
const BrandItem = ({imgURL,BrandName,id }:BrandItemProps)=>{
  const [isLoading,setIsLoading] = useState(false)

     const handleDelete =async () => {
      setIsLoading(true)
      try {
        await axiosInstance.delete(`/api/Brand/${id}`);
      toast.success(`Brand ${BrandName} deleted successfully`, {
        position: "top-right",
        duration: 1000,
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          backdropFilter: 'blur(20px)',
          width: "fit-content",
        },
      });
      } catch (error) {
        console.log(error)
      }finally{
        setIsLoading(false)
      }

     }
    return (
        <div 
      className="relative border  rounded-lg justify-center overflow-hidden cursor-pointer !w-64 !h-64" 
      style={{
        borderRadius: "20px",
      }}
    >
      <div 
        className="w-full h-full overflow-hidden" >
        <img 
          src={imgURL}
          alt="brand"
          className="w-full h-full object-top" 
          style={{
            objectFit: "cover", 
          }}
        />
      </div>
      <div 
        className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out"
        style={{
          padding: "20px",
        }}
      >
        {/* <div className="absolute top-2 right-2 space-x-1">
            
        </div> */}
        <h2 className="text-2xl font-semibold mb-2 text-white">{BrandName}</h2>

        <div className="space-x-2">
        <button style={{
                borderRadius:"5px"
            }} className={`text-red-500 border border-red-500 px-2 py-1 ${isLoading ? "cursor-not-allowed" : ""}`}
            
            onClick={handleDelete} >
                 {isLoading ? "Deleting..." : "delete"}
                
             </button>


            <button style={{
                borderRadius:"5px"
            }} className="text-blue-500 border border-blue-500 px-2 py-1"> 
                update
            </button>
        </div>
        
      </div>
    </div>
    )
}

export default BrandItem;
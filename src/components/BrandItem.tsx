import axiosInstance from "@/config/axios.config";
import { toast } from 'react-hot-toast';

interface BrandItemProps {
  id: number;
  imgURL: string;
  BrandName: string;
}
const BrandItem = ({imgURL,BrandName,id}:BrandItemProps)=>{

     const handleDelete =async () => {
     
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
        <div className="absolute top-2 right-2 space-x-1">
            <button style={{
                borderRadius:"5px"
            }} className="text-white"
            onClick={handleDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-red-500 hover:text-red-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
             </button>
            <button style={{
                borderRadius:"5px"
            }} className="text-white"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white-500 hover:text-gray-200">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </button>
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-white">{BrandName}</h2>
        
      </div>
    </div>
    )
}

export default BrandItem;
import { setCategoryId } from "@/App/features/categoryId";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  description: string;
  imgUrl: string;
  id:number
}

const CategoryCard = ({ name, description,imgUrl = "/IMG/e89299e60ad5ab5352de01f1536856df.jpg" , id}: CategoryCardProps) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  // const  DefineCtegoryImage = ({name}:IProps): string | null =>{
  //   if(name === "phone"){
  //     return "/IMG/e89299e60ad5ab5352de01f1536856df.jpg";
  //   }else if(name === "labtop"){
  //     return '/IMG/d84c891b4df125a86bf883bc3dea39b2.jpg'
  //   }else if(name === "Ipad"){
  //     return '/IMG/73cef35823138a24acd86ba674fd7cef.jpg'
  //   }else if(name === "smartWatch"){
  //      return "/IMG/8ce49fdb6a97356de8aa3c63a1c364d9.jpg"
  //   }else if(name === "headphones"){
  //     return "/IMG/17481a2423d5b5cfcf115578aa2b6025.jpg"
  //   }else if (name === "speakers"){
  //     return "/IMG/da9a8b046146a124707d5cb523200e88.jpg"
  //   }
  //   return null
  // }
  
    const handleNavigate = (id:number)=>{
      dispatch(setCategoryId(id))
      navigate(`/categoryItems`)
    }

  console.log(id)
  return (
    <div 
      className="relative bg-gray-900 rounded-lg justify-center overflow-hidden cursor-pointer !w-64 !h-64" 
      onClick={()=> handleNavigate(id)}
      style={{
        borderRadius: "20px",
      }}
    >
      <div 
        className="w-full h-full overflow-hidden" >
        <img 
          src={imgUrl}
          alt={name} 
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
        <h2 className="text-2xl font-semibold mb-2 text-white">{name} </h2>
        <p className="text-sm text-gray-300 text-center">
          {description.length > 50 ? `${description.slice(0, 50)}...` : description}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;

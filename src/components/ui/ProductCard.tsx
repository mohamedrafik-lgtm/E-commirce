import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Rating } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { setProductId } from '../../App/features/productId';

import toast from 'react-hot-toast';



interface ProductCardProps {
  id: number;
  productId: number;
  productName: string;
  unitPrice: number;
  discount: number;
  rate: number;
  imageUrl: string | undefined;
  isLoading: boolean;
}


const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
  unitPrice,
  discount,
  rate,
  imageUrl,
  isLoading,
  
}) => {
  
  const dispatch = useDispatch() 

const navigate = useNavigate()

const HandelNavigate = ()=>{
  dispatch(setProductId(productId))
  toast.success(`You will navigate to the product ${productId}`, {
    position: "top-right",
    duration: 1000,
    style: {
      backgroundColor: "green",
      color: "white",
      width: "fit-content",
    },
  });
  setTimeout(()=>{

    navigate('/home/productPage')
  },2000)
}
  const addToCart = ()=>{
    
  }

  if (isLoading) {
    return (
      <div  className="flex justify-center items-center h-full">
        <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
      </div>
    );
  }
  
  return (
    <div  className="bg-white border rounded-lg shadow-md overflow-hidden ml-5">
      {isLoading ?

      <div>
      <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack> 
      </div>
    
    : null}
    
      
      

      <div  onClick={()=> HandelNavigate()} className="p-4 cursor-pointer">
        {imageUrl ? (
          <img src={imageUrl} alt={productName} className="w-full h-48 object-contain" />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600">No Image</span>
          </div>
        )}
        <h3 className="text-xl font-semibold mt-2">{productName}</h3>
        <p className="text-lg text-gray-700">${unitPrice.toFixed(2)}</p>
        {discount > 0 && (
          <p className="text-red-500">Discount: {discount}%</p>
        )}
        <Rating name="size-medium" defaultValue={rate}/>
        <button onClick={addToCart} className="block p-2 rounded-md bg-blue-600 text-white">Add to cart</button>
      
    </div>
      </div>
  );
};

export default ProductCard;
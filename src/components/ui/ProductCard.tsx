import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Rating } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProductId } from '../../App/features/productId';
import toast from 'react-hot-toast';
import axiosInstance from '@/config/axios.config';

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

interface WishlistItem {
  productId: number;
  productName: string;
  productImage: string;
  brand: string;
  category: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ productId, productName, unitPrice, discount, rate, imageUrl, isLoading }) => {
  const storageKey = "loginData";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (!userData) return;

      try {
        const response = await axiosInstance.get('/api/WishlistItem', {
          headers: {
            'Authorization': `Bearer ${userData?.token}`
          }
        });

        const data: WishlistItem[] = response.data;
       


        const foundInWishlist = data.some(item => item.productId === productId);
        setIsInWishlist(foundInWishlist);
        console.log(data);
      } catch (error) {
        console.error('Error fetching wishlist items:', error);
        toast.error('Failed to load wishlist.');
      }
    };

    fetchWishlistItems();
  }, [productId, userData]);

  const HandelNavigate = () => {
    dispatch(setProductId(productId));
    localStorage.setItem('selectedProductId', productId.toString());
    toast.success(`You will navigate to the product ${productId}`, {
      position: "top-right",
      duration: 1000,
      style: {
        backgroundColor: "green",
        color: "white",
        width: "fit-content",
      },
    });
    setTimeout(() => {
      navigate('/home/productPage');
    }, 2000);
  };

  const addToCart = async() => {
    try {
     await axiosInstance.post('/api/CartItem/addOrUpdate', {
        productId: productId,
        quantity: 1,
      }, {
        headers: {
          'Authorization': `Bearer ${userData?.token}`,
        }
      }).then((response) => {
        if (response.status === 200) {
          toast.success(`Product added to cart successfully`, {
            position: "top-right",
            duration: 1000,
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(20px)',
              color: "green",
              width: "fit-content",
            },
          });
        }
      })
      .catch((error) => console.error(error));

    } catch (error) {
      console.log(error);
    }
  };

  const addToWishlist = (productId: number) => {
    try {
      axiosInstance.post('/api/WishlistItem', {
        productId,
      }, {
        headers: {
          'Authorization': `Bearer ${userData?.token}`,
        }
      }).then((response) => {
        if (response.status === 200) {
          toast.success(`Product added to wishlist successfully`, {
            position: "top-right",
            duration: 1000,
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(20px)',
              color: "green",
              width: "fit-content",
            },
          });
          setIsInWishlist(true);
        }
      })
      .catch((error) => console.error(error));

    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Stack spacing={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
      </div>
    );
  }

  return (
    <div
      style={{ borderRadius: '15px', position: 'relative' }}
      className="bg-white border shadow-md overflow-hidden ml-5 transition-transform duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 cursor-pointer">
        <div className="flex justify-end">
          <button
            className={`absolute top-3 right-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            onClick={() => addToWishlist(productId)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill={isInWishlist ? 'red' : 'none'} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={`size-8 ${isInWishlist ? 'text-white' : 'text-black'}`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
        </div>
        {imageUrl ? (
          <img src={imageUrl} alt={productName} className="w-full h-48 object-contain" onClick={HandelNavigate}  loading="lazy"/>
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
        <Rating name="size-medium" defaultValue={rate} />
        <button onClick={addToCart} className="block p-2 rounded-md bg-blue-600 text-white">Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

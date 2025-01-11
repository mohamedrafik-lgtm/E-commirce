import ProductCartInCartPage from "@/components/ProductCartInCartPage"
import PreviousPage from "@/components/shared/PerviousPage"
import ShippingOptions from "@/components/ShippengMethodMultyShoses"
import InputComponent from "@/components/ui/InputComponent"
import axiosInstance from "@/config/axios.config"
import { FormBillingDetails } from "@/data"
import { ICheckOutDetails } from "@/interface"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { jwtDecode } from 'jwt-decode';
import toast from "react-hot-toast"
import CircularProgress from '@mui/material/CircularProgress';
import { yupResolver } from "@hookform/resolvers/yup"
import { checkOutSchema } from "@/validations"
import InputErrorMsg from "@/components/ui/InputErrorMsg"
interface IProps {
    productId: number,
    productName: string,
    productImage: string,
    brand: string,
    category: string,
    price: number,
    quantity: number,
}
interface IUser{
    sub: string;
    uid: string;
  }

const CheckOut = () => {
    document.title = "Check Out";


    const storageKey = "loginData";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

   let userID = null;
   
   if (userDataString) {
     try {
       const userData = JSON.parse(userDataString);
   
       if (userData?.token) {
         const decodedToken:IUser = jwtDecode(userData.token);
         userID =  decodedToken.uid;
       } else {
         console.error("Token is missing in userData.");
       }
     } catch (error) {
       console.error("Failed to parse userData or decode token:", error);
     }
   } else {
     console.warn("No login data found in localStorage.");
   }

    const [cartItems, setCartItems] = useState<IProps[]>([]);
    const [total, setTotal] = useState(0);
    const [shippingMethod, setShippingMethod] = useState<number | null>(null);
    const [isLoading,setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm<ICheckOutDetails>({
        resolver: yupResolver(checkOutSchema),
      });
    useEffect(() => {
        if (!userData?.token) return;


        axiosInstance.get('/api/CartItem/all', {
            headers: {
                'Authorization': `Bearer ${userData?.token}`
            }
        })
        .then((response) => {
            setCartItems(response.data);
        })
        .catch((error) => {
            console.error("Error fetching cart items:", error);
        });
    }, [userData?.token]);


    useEffect(() => {
        const newTotal = cartItems.reduce((acc, cart) => acc + (cart.price * cart.quantity), 0);
        setTotal(newTotal);
    }, [cartItems]);

    const renderCartItems = cartItems.map(item =>
        <div key={item.productId}>
            <ProductCartInCartPage imgUrl={item.productImage} productPrice={item.price} productName={item.productName} />
        </div>
    );

    const renderInput = FormBillingDetails.map((data) => {
        const { name, id, label, placeholder, type } = data;
        return (
            <div key={data.id} className="flex flex-col space-y-1">
                <label className="opacity-85 text-gray-400 text-sm" htmlFor={name}>{label}</label>
                <InputComponent style={{ borderRadius: '5px' }} type={type} id={id} className="w-full bg-gray-100 p-2" {...register(name as keyof ICheckOutDetails)} placeholder={placeholder} />
                {errors[name as keyof ICheckOutDetails] && <InputErrorMsg msg={errors[name as keyof ICheckOutDetails]?.message}/>}
            </div>
        );
    });

    const handleShippingSelect = (method: { id: number; method: string; description: string; cost: number }) => {
        setShippingMethod(method.id);
    };

    const onSubmit: SubmitHandler<ICheckOutDetails> = async (data) => {
        setIsLoading(true)
        try {

            await axiosInstance.post('/api/Checkout', data, {
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                }
            });


          if (userID !== null) {
            const res = await axiosInstance.post('/api/Order', {
                userId: +userID,
                shippingMethodId: shippingMethod
            });
            toast.success("You will be redirected to the payment gateway now.", {
                position: "top-right",
                duration: 2000,
                style: {
                  backgroundColor: "green",
                  color: "white",
                  width: "fit-content",
                },
              });
              setTimeout(()=>{
                  window.location.href = res.data.checkoutUrl;
              },1000)
          } else {
            console.error("User ID is null. Cannot proceed with the order.");
          }
           
        } catch (error) {
            console.error("Error submitting the checkout or order:", error);
        }finally{
            setIsLoading(false)
        }
    };

    return (
        <div className="w-full h-screen">
            <div className="w-10/12 mx-auto grid grid-cols-2 gap-28 mt-14">
                <div className="px-28 space-y-5">
                    <div className="flex items-center space-x-3">
                        <PreviousPage />
                        <h2 className="text-2xl font-bold">Billing Details</h2>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        {renderInput}
                        <div className="flex flex-col space-y-1">
                            <button className={`${isLoading ? 'cursor-not-allowed opacity-80' : ''}border py-2 hover:bg-black hover:text-white text-black hover:border-white transition-all duration-300 font-medium mt-3`} style={{
                                borderRadius: '5px'
                            }}>
                                {isLoading ? <CircularProgress color="inherit" /> : "Check Out"}
                                
                            </button>
                        </div>
                    </form>

                </div>
                <div className="pt-20 px-7 space-y-4">
                    <div className="space-y-2">
                        {renderCartItems}
                    </div>
                    <div className='space-y-3'>
                        <div className="flex justify-between border-b border-black pb-2">
                            <p>Subtotal:</p>
                            <span>${total}</span>
                        </div>
                        <div className="flex justify-between border-b border-black pb-2">
                            <p>Shipping:</p>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between pb-2">
                            <p>Total:</p>
                            <span>${total}</span>
                        </div>
                    </div>
                    <ShippingOptions onShippingSelect={handleShippingSelect} />
                </div>
            </div>
        </div>
    );
};

export default CheckOut;

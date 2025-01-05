import ProductCartInCartPage from "@/components/ProductCartInCartPage"
import InputComponent from "@/components/ui/InputComponent"
import axiosInstance from "@/config/axios.config"
import { FormBillingDetails } from "@/data"
import { ICheckOutDetails } from "@/interface"
import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"



interface IProps{
    productId:number,
    productName:string,
    productImage:string,
    brand:string,
    category:string,
    price:number,
    quantity:number,
}
const CheckOut = ()=>{
  
    const storageKey = "loginData";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const [cartItems, setCartItems] = useState<IProps[]>([]);
    const [total, setTotal] = useState(0);

    const { register, handleSubmit } = useForm<ICheckOutDetails>()
    
    useEffect(() => {
        try {
            axiosInstance.get('/api/CartItem/all', {
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                }
            }).then((response) => response.data).then(data => setCartItems(data));
        } catch (error) {
            console.log(error);
        }
    }, [userData?.token]);

    useEffect(() => {
        const newTotal = cartItems.reduce((acc, cart) => acc + (cart.price * cart.quantity), 0);
        setTotal(newTotal);
    }, [cartItems]);
    const renderCartItems = cartItems.map(item =><div>
        <ProductCartInCartPage imgUrl={item.productImage} productPrice={4000} productName={item.productName}/>
      </div>)

      
    const renderInput = FormBillingDetails.map((data) =>{
        const {name,id,label,placeholder,type} =  data
        return <div className="flex flex-col space-y-1">
            <label className="opacity-85 text-gray-400 text-sm" htmlFor={name}>{label}</label>
            <InputComponent style={{
                borderRadius:'5px'
            }} type={type} id={id} className="w-full bg-gray-100 p-2"  {...register(name as keyof ICheckOutDetails)} placeholder={placeholder}/>
        </div>
    })


    

    const onSubmit: SubmitHandler<ICheckOutDetails> =async (data) =>{ 
        try {
           const res= await axiosInstance.post('/api/Checkout', data, {
            headers: {
                'Authorization': `Bearer ${userData?.token}`
            }
        })
        console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className="w-full h-screen">
          <div className="w-10/12 mx-auto grid grid-cols-2 gap-28 mt-14">
             <div className="px-28 space-y-5">
                <div>
                    <h2 className="text-2xl font-bold">Billing Details</h2>
                </div>

                {/* Form for Billing Details */}

                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                  {renderInput}
                  <div className="flex flex-col space-y-1">
                    <button className="border py-2 hover:bg-black hover:text-white text-black hover:border-white transition-all duration-300 font-medium mt-3" style={{
                    borderRadius:'5px'}}>
                        Check Out
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
               <button style={{borderRadius:'5px'}} className="px-12 py-2 transition-all duration-300 bg-red-500 hover:bg-red-600 text-white text-lg">order now</button>
            </div>
          </div>
            
        </div>
    )
}

export default CheckOut
import axiosInstance from "@/config/axios.config";
import { ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid'

interface IProps{
    productId:number,
    productName:string,
    productImage:string,
    brand:string,
    category:string,
    price:number,
}
const Wishlist = ()=>{
    const storageKey = "loginData"
    const userDataString = localStorage.getItem(storageKey)
    const userData =userDataString ? JSON.parse(userDataString) : null;
    const navigate = useNavigate()
    const [WishlistItem, setWishlistItem] = useState<IProps[]>([])
   
   
    useEffect(()=>{
     
        try {
            axiosInstance.get('/api/WishlistItem',{
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                }
            }).then((response)=> response.data).then(data => setWishlistItem(data))
        } catch (error) {
            console.log(error)
        }
    },[userData?.token])

    const handleDeleteCartItem = (id:number) => {

        try {
            axiosInstance.delete(`/api/CartItem/delete/${id}`,{
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                }
            }).then((response)=> response.data).then(() => {
                setWishlistItem(WishlistItem.filter((item) => item.productId !== id))
            })
        } catch (error) {
            console.log(error)
        }
    }


    const renderCartItems = WishlistItem.map((cart): ReactNode => {
        const maxLength = 12;
        const productName = cart.productName.length > maxLength 
            ? cart.productName.substring(0, maxLength) + '...' 
            : cart.productName;

        return (
            <ul key={uuid()} className="cart grid grid-cols-5 text-center items-center bg-white px-5 py-3 !rounded-xl text-lg">
                <li className="flex items-center space-x-4">
                    <img style={{ borderRadius: "5px" }} className="w-20 object-contain" src={`${cart.productImage}`} />
                    <p>{productName}</p>
                </li>
                <li>{cart.brand}</li>
                <li>{cart.category}</li>
                <li>${cart.price}</li>
                <button 
                    onClick={()=> handleDeleteCartItem(cart.productId)}
                    style={{ borderRadius: "10px" }} 
                    className="px-4 py-2 w-fit bg-red-600 text-white hover:bg-red-700 mx-auto transition-all duration-300">Delete</button>
            </ul>
        );
    });

    const HandelNavigate = ()=>{
        toast.success(`navigate to home page after 1.5 secound`, {
            position: "top-right",
            duration: 1000,
            style: {
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(20px)',
              color: "black",
              width: "fit-content",
            },
          });
        setTimeout(()=>{
            navigate('/home')
        },1500)
    }
  
    return (
        <div className=" pt-10 pb-10 overflow-hidden">
            
              <div>
              <h3 className=" ml-60 text-3xl">Wish list</h3>
              </div>
            
          <div className="space-y-4 mt-10">
            <div className="w-9/12 mx-auto">
                <ul style={{borderRadius:"15px"}} className="cart grid grid-cols-5 text-center bg-white px-5 py-4 text-2xl">
                    <li>Product</li>
                    <li>Brand</li>
                    <li>Category</li>
                    <li>Price</li>
                    <li>Dlete</li>
                </ul>
            </div>
            <div className={`w-9/12 mx-auto space-y-5  h-72 ${WishlistItem.length ? `overflow-scroll overflow-x-hidden` : ``} px-4 py-4`}>
                 {WishlistItem.length ? renderCartItems :<div className="flex justify-center items-center w-full h-96 text-3xl" > 
              <h2>You do not have any favorite products.</h2>
            </div>}
            </div>
            <div className="w-9/12 mx-auto mt-5">
                    <button onClick={()=> HandelNavigate()} style={{
                        borderRadius:"5px"
                    }} className="ml-2 border border-black py-2 px-7 hover:bg-black hover:text-white transition-all duration-300">Return To Shop</button>
            </div>
          </div>

          <div className="flex justify-end w-8/12 mx-auto">
           
          </div>
        </div>
    )
}
export default Wishlist
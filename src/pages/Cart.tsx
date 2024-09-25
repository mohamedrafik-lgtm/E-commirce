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
    quantity:number,
}

const Cart = ()=>{
    const storageKey = "loginData"
    const userDataString = localStorage.getItem(storageKey)
    const userData =userDataString ? JSON.parse(userDataString) : null;
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState<IProps[]>([])
    const [total,setTotal] = useState(0)
   
    useEffect(()=>{
     
        try {
            axiosInstance.get('/api/CartItem/all',{
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                }
            }).then((response)=> response.data).then(data => setCartItems(data))
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
                setCartItems(cartItems.filter((item) => item.productId !== id))
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const newTotal = cartItems.reduce((acc, cart) => acc + cart.price, 0);
        setTotal(newTotal);
    }, [cartItems]);

    const renderCartItems = cartItems.map((cart): ReactNode => {
        const maxLength = 12;
        const productName = cart.productName.length > maxLength 
            ? cart.productName.substring(0, maxLength) + '...' 
            : cart.productName;

        return (
            <ul key={uuid()} className="cart grid grid-cols-6 text-center items-center bg-white px-3 py-3 !rounded-xl text-lg">
                <li className="flex items-center space-x-4">
                    <img style={{ borderRadius: "5px" }} className="w-20 object-contain" src={`${cart.productImage}`} />
                    <p>{productName}</p>
                </li>
                <li>{cart.brand}</li>
                <li>{cart.quantity}</li>
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
              <h3 className=" ml-80 text-3xl">Crat Items</h3>
              </div>
            
          <div className="space-y-4 mt-10">
            <div className="w-9/12 mx-auto">
                <ul style={{borderRadius:"15px"}} className="cart grid grid-cols-6 text-center bg-white px-5 py-4 text-2xl">
                    <li>Product</li>
                    <li>Brand</li>
                    <li>quantity</li>
                    <li>Category</li>
                    <li>Price</li>
                    <li>Dlete</li>
                </ul>
            </div>
            <div className="w-9/12 mx-auto space-y-5  h-72 overflow-scroll overflow-x-hidden px-4 py-4">
                {/* <ul className="cart grid grid-cols-6 text-center items-center bg-white px-3 py-1 !rounded-xl text-lg">
                    <li className="flex items-center space-x-4">
                        <img style={{borderRadius:"5px"}} className="w-10 object-center" src="/IMG/26be56634ad9773c9d8f6315cac2cba7.jpg"/>
                        <p>iphone 15 pro</p>
                    </li>
                    <li>Apple</li>
                    <li>1</li>
                    <li>phone</li>
                    <li>$100</li>
                    <button style={{borderRadius:"10px"}} className="px-4 py-2 w-fit bg-red-600 text-white hover:bg-red-700 mx-auto transition-all duration-300">Delete</button>
                </ul>
                 */}

                 {renderCartItems}
            </div>
            <div className="w-8/12 mx-auto mt-5">
                    <button onClick={()=> HandelNavigate()} style={{
                        borderRadius:"5px"
                    }} className="ml-2 border border-black py-2 px-7 hover:bg-black hover:text-white transition-all duration-300">Return To Shop</button>
            </div>
          </div>

          <div className="flex justify-end w-8/12 mx-auto">
            <div style={{
                borderRadius:"5px",
            }} className="px-3 py-5 w-80 border border-black">
                <div className="mb-3">
                    <h2 className="text-xl">Cart Total</h2>
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
            </div>
          </div>
        </div>
    )

}

export default Cart;
import axiosInstance from "@/config/axios.config";
import { ChangeEvent, ReactNode, useEffect, useState } from "react";
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

const Cart = () => {
    const storageKey = "loginData";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState<IProps[]>([]);
    const [total, setTotal] = useState(0);

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

    const handleDeleteCartItem = (id: number) => {
        try {
            axiosInstance.delete(`/api/CartItem/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                }
            }).then((response) => response.data).then(() => {
                setCartItems(cartItems.filter((item) => item.productId !== id));
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuantityChange = async (id: number, newQuantity: number) => {
        try {
            await axiosInstance.put(`/api/CartItem/update`, {
                productId:id,
                quantity: newQuantity,
            }, {
                headers: {
                    'Authorization': `Bearer ${userData?.token}`
                }
            });

            setCartItems(prevItems => prevItems.map(item => 
                item.productId === id ? { ...item, quantity: newQuantity } : item
            ));

            toast.success("Quantity updated successfully!");

        } catch (error) {
            console.error("Failed to update quantity", error);
            toast.error("Failed to update quantity");
        }
    };

    useEffect(() => {
        const newTotal = cartItems.reduce((acc, cart) => acc + (cart.price * cart.quantity), 0);
        setTotal(newTotal);
    }, [cartItems]);

    const renderCartItems = cartItems.map((cart): ReactNode => {
        const maxLength = 12;
        const productName = cart.productName.length > maxLength 
            ? cart.productName.substring(0, maxLength) + '...' 
            : cart.productName;

        return (
            <ul key={uuid()} className="cart grid grid-cols-6 text-center items-center bg-white px-5 py-3 !rounded-xl text-lg">
                <li className="flex items-center space-x-4">
                    <img style={{ borderRadius: "5px" }} className="w-20 object-contain" src={`${cart.productImage}`} />
                    <p>{productName}</p>
                </li>
                <li>{cart.brand}</li>
                <div >
                <input 
                    value={cart.quantity} 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleQuantityChange(cart.productId, parseInt(e.target.value))}
                    type="number" 
                    className="w-9 focus:outline-none"
                />
                </div>
                <li>{cart.category}</li>
                <li>${cart.price}</li>
                
                <button 
                    onClick={() => handleDeleteCartItem(cart.productId)}
                    style={{ borderRadius: "10px" }} 
                    className="px-4 py-2 w-fit bg-red-600 text-white hover:bg-red-700 mx-auto transition-all duration-300">Delete</button>
            </ul>
        );
    });

    const handleNavigate = () => {
        toast.success(`navigate to home page after 1.5 second`, {
            position: "top-right",
            duration: 1000,
            style: {
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(20px)',
                color: "black",
                width: "fit-content",
            },
        });
        setTimeout(() => {
            navigate('/home');
        }, 1500);
    };

    return (
        <div className=" pt-10 pb-10 overflow-hidden">
            
            <div>
                <h3 className=" ml-80 text-3xl">Cart Items</h3>
            </div>
            
            <div className="space-y-4 mt-10">
                <div className="w-10/12 mx-auto">
                    <ul style={{borderRadius:"15px"}} className="cart grid grid-cols-6 text-center bg-white px-5 py-4 text-2xl">
                        <li>Product</li>
                        <li>Brand</li>
                        <li>Quantity</li>
                        <li>Category</li>
                        <li>Price</li>
                        <li>Delete</li>
                    </ul>
                </div>
                <div className={`w-10/12 mx-auto space-y-5  h-72 ${cartItems.length ? `overflow-scroll overflow-x-hidden` : ``} px-4 py-4`}>
                    {cartItems.length ? renderCartItems : <div className="flex justify-center items-center w-full h-96 text-3xl" > 
                        <h2>There are no products in the cart.</h2>
                    </div>}
                </div>
                <div className="w-10/12 mx-auto mt-5">
                    <button onClick={() => handleNavigate()} style={{
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
    );
};

export default Cart;

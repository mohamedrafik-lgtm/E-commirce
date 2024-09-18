import { useNavigate } from "react-router-dom";


const Cart = ()=>{
    const navigate = useNavigate()
    return (
        <div className="bg-gray-100 pt-10 pb-10 overflow-hidden">
            
              <div>
              <h3 className="bg-gray-100 ml-80 text-3xl">Crat Items</h3>
              </div>
            
          <div className="space-y-4 mt-10">
            <div className="w-8/12 mx-auto">
                <ul style={{borderRadius:"15px"}} className="grid grid-cols-6 text-center bg-white px-5 py-4 text-2xl">
                    <li>Product</li>
                    <li>Brand</li>
                    <li>quantity</li>
                    <li>Category</li>
                    <li>Price</li>
                    <li>Dlete</li>
                </ul>
            </div>
            <div className="w-8/12 mx-auto space-y-5  h-80 overflow-scroll overflow-x-hidden">
                <ul style={{borderRadius:"15px"}} className="grid grid-cols-6 text-center items-center bg-white px-3 py-1 text-lg shadow-md">
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
                <ul style={{borderRadius:"15px"}} className="grid grid-cols-6 text-center items-center bg-white px-3 py-1 text-lg shadow-md">
                    <li className="flex items-center space-x-4">
                        <img style={{borderRadius:"5px"}} className="w-10 object-center" src="/IMG/26be56634ad9773c9d8f6315cac2cba7.jpg"/>
                        <p>iphone 15 pro</p>
                    </li>
                    <li>Apple</li>
                    <li>1</li>
                    <li>phone</li>
                    <li>$100</li>
                    <button style={{borderRadius:"10px"}} className="px-4 py-2 w-fit bg-red-600 text-white hover:bg-red-700 mx-auto transition-all duration-300">Delete</button>
                </ul><ul style={{borderRadius:"15px"}} className="grid grid-cols-6 text-center items-center bg-white px-3 py-1 text-lg shadow-md">
                    <li className="flex items-center space-x-4">
                        <img style={{borderRadius:"5px"}} className="w-10 object-center" src="/IMG/26be56634ad9773c9d8f6315cac2cba7.jpg"/>
                        <p>iphone 15 pro</p>
                    </li>
                    <li>Apple</li>
                    <li>1</li>
                    <li>phone</li>
                    <li>$100</li>
                    <button style={{borderRadius:"10px"}} className="px-4 py-2 w-fit bg-red-600 text-white hover:bg-red-700 mx-auto transition-all duration-300">Delete</button>
                </ul><ul style={{borderRadius:"15px"}} className="grid grid-cols-6 text-center items-center bg-white px-3 py-1 text-lg shadow-md">
                    <li className="flex items-center space-x-4">
                        <img style={{borderRadius:"5px"}} className="w-10 object-center" src="/IMG/26be56634ad9773c9d8f6315cac2cba7.jpg"/>
                        <p>iphone 15 pro</p>
                    </li>
                    <li>Apple</li>
                    <li>1</li>
                    <li>phone</li>
                    <li>$100</li>
                    <button style={{borderRadius:"10px"}} className="px-4 py-2 w-fit bg-red-600 text-white hover:bg-red-700 mx-auto transition-all duration-300">Delete</button>
                </ul><ul style={{borderRadius:"15px"}} className="grid grid-cols-6 text-center items-center bg-white px-3 py-1 text-lg shadow-md">
                    <li className="flex items-center space-x-4">
                        <img style={{borderRadius:"5px"}} className="w-10 object-center" src="/IMG/26be56634ad9773c9d8f6315cac2cba7.jpg"/>
                        <p>iphone 15 pro</p>
                    </li>
                    <li>Apple</li>
                    <li>1</li>
                    <li>phone</li>
                    <li>$100</li>
                    <button style={{borderRadius:"10px"}} className="px-4 py-2 w-fit bg-red-600 text-white hover:bg-red-700 mx-auto transition-all duration-300">Delete</button>
                </ul><ul style={{borderRadius:"15px"}} className="grid grid-cols-6 text-center items-center bg-white px-3 py-1 text-lg shadow-md">
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
            </div>
            <div className="w-8/12 mx-auto mt-5">
                    <button onClick={()=> navigate('/home')} style={{
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
                        <span>$1750</span>
                    </div>
                    <div className="flex justify-between border-b border-black pb-2">
                        <p>Shipping:</p>
                        <span>Free</span>
                    </div>
                    <div className="flex justify-between pb-2">
                        <p>Total:</p>
                        <span>$1750</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
    )

}

export default Cart;
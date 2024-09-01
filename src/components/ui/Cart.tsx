// src/components/Cart.tsx
import React from 'react';
import  {Product}  from '../../interface';


interface CartProps {
  cartItems: Product[];
  onRemoveFromCart: (productId: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemoveFromCart }) => {
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {cartItems.map((item) => (
            <li key={item.id} className="py-4 flex justify-between items-center">
              <img className="w-16 h-16 object-cover mr-4" src={item.image} alt={item.name} />
              <div className="flex-grow">
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <p className="text-gray-600">${item.price} x {item.quantity}</p>
              </div>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                onClick={() => onRemoveFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h3 className="text-xl font-semibold mt-6">Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;

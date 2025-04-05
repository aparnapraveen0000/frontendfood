import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import Cookies from 'js-cookie';
import { Trash2 } from 'lucide-react'; // Dustbin icon

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axiosInstance.get("/cart/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.items || []);
      setTotalPrice(response.data.totalPrice || 0);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    }
  };

  const handleDelete = async (foodId) => {
    try {
      const token = Cookies.get("token");
      await axiosInstance.put("/cart/remove", { foodId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">🛒 Your Cart</h2>

      {cartItems.length > 0 ? (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.foodId._id}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body flex-row justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{item.foodId.name}</h3>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} x {item.quantity} = <span className="font-medium text-black">₹{item.price * item.quantity}</span>
                  </p>
                </div>
                <button
                  className="btn btn-sm btn-error btn-outline"
                  onClick={() => handleDelete(item.foodId._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <p className="text-lg font-semibold">Total: ₹{totalPrice}</p>
          </div>
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-lg text-gray-500">🧺 Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default Cart;

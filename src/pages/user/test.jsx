import React, { useState, useEffect } from 'react';
import { axiosInstance } from "../../config/axiosInstance";
import Cookies from 'js-cookie';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
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
    fetchCartItems();
  }, []);

  return (
    <div>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <div key={item.foodId}>
              <p>{item.foodId.name} - {item.quantity} x ₹{item.price}</p>
            </div>
          ))}
          <p>Total: ₹{totalPrice}</p>
        </>
      ) : (
        <p>{cartItems.message || "Cart is empty"}</p>
      )}
    </div>
  );
};

export default Cart;
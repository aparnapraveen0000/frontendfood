import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await axiosInstance.get("/cart/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCartItems(response.data.cartItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []); // ✅ Only one useEffect, correctly placed

  const handleRemoveItem = async (itemId) => {
    try {
      await axiosInstance.delete(`/cart/remove/${itemId}`);
      setCartItems(cartItems.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/payment"); // Redirect to payment page
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error: {error}</p>;
  if (cartItems.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cartItems.map((item) => (
          <div key={item._id} className="card bg-white shadow-lg p-4 rounded-lg">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-bold mt-2">{item.name}</h3>
            <p className="text-gray-600">${item.price} x {item.quantity}</p>
            <button className="btn btn-error mt-2" onClick={() => handleRemoveItem(item._id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <button className="btn btn-success mt-4" onClick={handleCheckout}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;

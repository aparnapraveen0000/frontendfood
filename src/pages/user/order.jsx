import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance.js";
import Cookies from 'js-cookie';

const ReviewForm = ({ itemId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/review/add", { itemId, rating, comment });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (submitted) return <p className="text-green-600">Review submitted!</p>;

  return (
    <form onSubmit={handleSubmit} className="bg-base-200 p-3 mt-2 rounded-lg shadow-sm">
      <label className="block mb-2 text-sm text-green-600">
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="ml-2 input input-bordered input-sm w-12 text-black dark:text-white bg-white dark:bg-gray-800"
        />
      </label>
      <textarea
        rows="2"
        className="textarea textarea-bordered input-sm text-sm resize-none text-black dark:text-white bg-white dark:bg-gray-800"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        type="submit"
        className="btn bg-orange-500 hover:bg-orange-600 text-white btn-sm mt-2"
      >
        Submit Review
      </button>
    </form>
  );
};

const Order = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          console.error("No token found, user not authenticated");
          setCartItems([]);
          return;
        }

        const response = await axiosInstance.get("/cart/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched Cart Items:", response.data);
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]); // Fallback to empty array
      }
    };

    fetchCartItems();
  }, []);

  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-yellow-500">My Orders</h2>
      {cartItems.length === 0 ? (
        <div className="alert alert-info shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="text-yellow-500">Your cart is empty.</span>
        </div>
      ) : (
        <div className="card bg-base-200 shadow-xl p-4">
          <h3 className="text-xl font-semibold mb-2 text-yellow-500">My Order List</h3>
          <div className="mt-4">
            <h4 className="font-medium text-yellow-500">My Orders</h4>
            {cartItems.map((item, i) => (
              <div key={i} className="mt-2 p-2 bg-base-100 border rounded-lg">
                <p className="text-yellow-500 font-medium">
                  Food Name: {item.foodId?.name}
                </p>
                <p className="text-yellow-500">
                  Quantity: {item.quantity} — Price: ₹{item.price} each
                </p>
                <p className="text-yellow-500">
                  Subtotal: ₹{item.price * item.quantity}
                </p>
                {item.foodId?._id && <ReviewForm itemId={item.foodId._id} />}
              </div>
            ))}
            <div className="mt-4 pt-2 border-t border-gray-600">
              <p className="text-lg font-bold text-yellow-500">
                Total Price: ₹{totalPrice}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
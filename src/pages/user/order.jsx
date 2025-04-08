import React, { useEffect, useState } from "react";
import {axiosInstance} from "../../config/axiosInstance.js";

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
    <form onSubmit={handleSubmit} className="bg-gray-100 p-3 mt-2 rounded shadow-sm">
      <label className="block mb-2 text-sm">
        Rating:
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="ml-2 border rounded px-1 w-12"
        />
      </label>
      <textarea
        rows="2"
        className="input-sm border rounded p-1 mb-2 text-sm resize-none"
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
        Submit Review
      </button>
    </form>
  );
};

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/order/get");
        console.log("Fetched Orders:", res.data);
        setOrders(res.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]); // fallback to empty array
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Order #{order._id}</h3>
            <p>Status: {order.orderStatus}</p>
            <p>Payment Status: {order.paymentStatus}</p>
            <p>Discount: ₹{order.discount}</p>
            <p>Total Paid: ₹{order.totalPrice}</p>

            <div className="mt-4">
              <h4 className="font-medium">Items:</h4>
              {order.orderItems.map((item, i) => (
                <div key={i} className="mt-2 p-2 bg-white border rounded">
                  <p>{item.itemNameId?.name} — Qty: {item.quantity}</p>
                  <p>₹{item.price} each</p>

                  {/* Add Review */}
                  <ReviewForm itemId={item.itemNameId?._id} />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Order;

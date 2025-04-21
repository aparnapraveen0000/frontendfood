import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance"; // Path to your axios instance

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders when the page loads
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/order/user/items"); // Ensure this endpoint matches your backend
        setOrders(res.data || []); // Store orders in state
        setLoading(false); // Loading finished
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
        setLoading(false); // Loading finished
      }
    };

    fetchOrders();
  }, []);

  // If loading, display a loading message
  if (loading) return <p>Loading orders...</p>;

  // If there’s an error, show the error message
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {/* Display each order */}
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="mb-4 p-4 border border-gray-300 rounded-lg shadow-md">
            <div>
              <strong>Order ID:</strong> {order._id}
            </div>
            <div>
              <strong>Status:</strong> {order.orderStatus || "Pending"}
            </div>
            <div>
              <strong>Payment Status:</strong> {order.paymentStatus || "Unpaid"}
            </div>
            <div>
              <strong>Total Price:</strong> ₹{order.totalPrice}
            </div>
            <div>
              <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
            </div>

            {/* List all items in the order */}
            <div className="mt-4">
              <h3 className="font-bold">Items:</h3>
              {order.orderItems.map((item, index) => (
                <div key={index} className="ml-4 mt-2">
                  <div>
                    <strong>{item.itemNameId?.name || "Item Name"}</strong>
                  </div>
                  <div>Quantity: {item.quantity}</div>
                  <div>Price: ₹{item.price}</div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderPage;



import React, { useEffect, useState } from "react";
import moment from "moment";
import { axiosInstance } from "../../config/axiosInstance.js";
import Cookies from "js-cookie";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        setError("Authentication token not found.");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.get("/order/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.data || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Orders
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg shadow-md p-5 bg-white hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
                <h3 className="text-lg font-semibold break-all">
                  Order ID: {order._id}
                </h3>
                <span className="text-sm text-gray-500">
                  {moment(order.createdAt).format("MMMM Do YYYY, h:mm A")}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm">
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="capitalize">{order.orderStatus}</span>
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentStatus}
                </p>
              </div>

              <ul className="mt-4 list-disc pl-6 text-gray-800 text-sm">
                {order.orderItems.map((item, index) => (
                  <li key={index}>
                    {item.itemNameId?.name || "Item"} × {item.quantity} — ₹{item.price}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-between text-gray-900 font-medium text-sm md:text-base">
                <span>Discount: ₹{order.discount}</span>
                <span>Total: ₹{order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;

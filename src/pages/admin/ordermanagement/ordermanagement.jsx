import React, { useEffect, useState } from 'react';
import {axiosInstance} from '../../../config/axiosInstance.js';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updateData, setUpdateData] = useState({ orderStatus: '', paymentStatus: '' });

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get('/order/admin/get');
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching admin orders:", error);
      toast.error("Failed to load orders");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/order/delete/${id}`);
      toast.success("Order deleted successfully");
      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete order");
    }
  };

  const handleUpdateOrder = async () => {
    try {
        const res = await axiosInstance.put(`/order/update/${selectedOrder._id}`, {
            userId: selectedOrder.userId,
            orderItems: selectedOrder.orderItems,
            discount: selectedOrder.discount,
            paymentStatus: updateData.paymentStatus,
            orderStatus: updateData.orderStatus
        });

        if (res.data.data) {
            // Update state with the newly updated order
            setOrders(orders.map(order => order._id === selectedOrder._id ? res.data.data : order));
        }

        toast.success("Order updated successfully");
        setSelectedOrder(null);  // Close the modal after updating
    } catch (error) {
        console.error("Error updating order:", error);
        toast.error("Failed to update order");
    }
};


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.userId}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.orderStatus}</td>
                <td>{order.paymentStatus}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600"
                    onClick={() => {
                      setSelectedOrder(order);
                      setUpdateData({
                        orderStatus: order.orderStatus,
                        paymentStatus: order.paymentStatus
                      });
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      {selectedOrder && (
        <dialog id="update_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Update Order</h3>

            <div className="form-control mb-3">
              <label className="label">Order Status</label>
              <select
                className="select select-bordered"
                value={updateData.orderStatus}
                onChange={(e) =>
                  setUpdateData({ ...updateData, orderStatus: e.target.value })
                }
              >
                <option value="">-- Select --</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="form-control mb-3">
              <label className="label">Payment Status</label>
              <select
                className="select select-bordered"
                value={updateData.paymentStatus}
                onChange={(e) =>
                  setUpdateData({ ...updateData, paymentStatus: e.target.value })
                }
              >
                <option value="">-- Select --</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>

            <div className="modal-action">
              <button
                className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600"
                onClick={handleUpdateOrder}
              >
                Save
              </button>
              <button className="btn btn-sm" onClick={() => setSelectedOrder(null)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default OrdersPage;

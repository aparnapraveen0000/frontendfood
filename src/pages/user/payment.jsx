// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosInstance from '../../config/axiosInstance.js';

//  export const Payment = () => {
//   const [order, setOrder] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axiosInstance.get("/order/get/all");
//         if (response.data.orders.length > 0) {
//           setOrder(response.data.orders[0]);
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const initiatePayment = async () => {
//     if (!order) return;
//     setLoading(true);
    
//     try {
//       const response = await axiosInstance.post(`/payment/create/${order._id}`);
//       if (!response.data || !response.data.razorpayOrder) {
//         console.error("Payment initiation failed");
//         setLoading(false);
//         return;
//       }

//       const paymentData = response.data.razorpayOrder;
      
//       const rzp = new window.Razorpay({
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: paymentData.amount,
//         currency: paymentData.currency,
//         name: order.restaurant.name,
//         description: `Order #${order._id}`,
//         order_id: paymentData.id,
//         handler: async (paymentResponse) => {
//           try {
//             const verification = await axiosInstance.post("/payment/verify", paymentResponse);
//             alert(verification.data.message);
//             navigate("/");
//           } catch (err) {
//             console.error("Payment verification error:", err);
//             alert("Payment verification failed.");
//           }
//         },
//         prefill: {
//           name: order.user.name,
//           email: order.user.email,
//           contact: order.user.phone,
//         },
//       });

//       rzp.open();
//     } catch (error) {
//       console.error("Payment error:", error);
//       alert("Error processing payment. Try again.");
//     }

//     setLoading(false);
//   };

//   if (!order) {
//     return <p>Loading order details...</p>;
//   }

//   return (
//     <div>
//       <h1>Payment Page</h1>
//       <h2>Order Summary</h2>
//       <p>Restaurant: {order.restaurant.name}</p>
//       <p>Order ID: {order._id}</p>
//       <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//       <h3>Items</h3>
//       <ul>
//         {order.cartId.items.map((item) => (
//           <li key={item._id}>{item.quantity} × {item.foodName} - ₹{item.totalItemPrice.toFixed(2)}</li>
//         ))}
//       </ul>
//       <h3>Total Amount: ₹{order.finalPrice.toFixed(2)}</h3>
//       <button onClick={initiatePayment} disabled={loading}>
//         {loading ? 'Processing...' : 'Pay Now'}
//       </button>
//     </div>
//   );
// };



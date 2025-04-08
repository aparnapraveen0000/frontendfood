// // // src/pages/user/order.jsx

// // import React, { useEffect, useState } from "react";
// // import moment from "moment";
// // import { axiosInstance } from "../../config/axiosInstance.js";
// // import Cookies from "js-cookie";

// // const Order = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(true);

// //   const fetchOrders = async () => {
// //     try {
// //       const token = Cookies.get("token");
// //       console.log("Token:", token); 
// //       const response = await axiosInstance.get("/order/get", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setOrders(response.data.data || []);
// //     } catch (err) {
// //       console.error("Error fetching orders:", err);
// //       setError("Failed to load orders.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []);

// //   return (
// //     <div className="p-4 max-w-5xl mx-auto">
// //       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
// //         Your Orders
// //       </h2>

// //       {loading ? (
// //         <p className="text-center text-gray-500">Loading orders...</p>
// //       ) : error ? (
// //         <p className="text-red-600 text-center">{error}</p>
// //       ) : orders.length === 0 ? (
// //         <p className="text-center text-gray-500">You have no orders yet.</p>
// //       ) : (
// //         <div className="space-y-6">
// //           {orders.map((order) => (
// //             <div
// //               key={order._id}
// //               className="border rounded-lg shadow-md p-5 bg-white hover:shadow-lg transition"
// //             >
// //               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
// //                 <h3 className="text-lg font-semibold break-all">
// //                   Order ID: {order._id}
// //                 </h3>
// //                 <span className="text-sm text-gray-500">
// //                   {moment(order.createdAt).format("MMMM Do YYYY, h:mm A")}
// //                 </span>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm">
// //                 <p>
// //                   <strong>Status:</strong>{" "}
// //                   <span className="capitalize">{order.orderStatus}</span>
// //                 </p>
// //                 <p>
// //                   <strong>Payment:</strong> {order.paymentStatus}
// //                 </p>
// //               </div>

// //               <ul className="mt-4 list-disc pl-6 text-gray-800 text-sm">
// //                 {order.orderItems.map((item, index) => (
// //                   <li key={index}>
// //                     {item.itemNameId?.name || "Item"} × {item.quantity} — ₹{item.price}
// //                   </li>
// //                 ))}
// //               </ul>

// //               <div className="mt-4 flex justify-between text-gray-900 font-medium text-sm md:text-base">
// //                 <span>Discount: ₹{order.discount}</span>
// //                 <span>Total: ₹{order.totalPrice}</span>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Order;
// // import React, { useEffect, useState } from "react";
// // import { useSelector } from "react-redux";
// // import { Outlet, useNavigate } from "react-router-dom";

// // export const ProtectRoutes = () => {
// //     const { isUserAuth } = useSelector((state) => state.user);
// //     const navigate = useNavigate();

// //     // useEffect(() => {
// //     if (!isUserAuth) {
// //         navigate("/login");
// //     }
// //     // }, []);

// //     return <Outlet />;
// // }; 
// import React from 'react';
// import { useForm } from 'react-hook-form'; // Add this import
// import { axiosInstance } from "../../config/axiosInstance.js";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { saveUser, clearUser } from "../../redux/userSlice";
// import Cookies from "js-cookie";

// export const Login = ({ role }) => {
//     const { register, handleSubmit } = useForm(); // Now this will work
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const userConfig = {
//         user: {
//             loginAPI: "/user/login",
//             signupRoute: "/signup",
//         },
//         mentor: {
//             loginAPI: "/mentor/login",
//             signupRoute: "/mentor/signup",
//         }
//     };

//     const currentRole = userConfig[role] || userConfig.user;

//     const onSubmit = async (data) => {
//         if (!data.email || !data.password) {
//             toast.error("All fields are required.");
//             return;
//         }

//         try {
//             const response = await axiosInstance.post(currentRole.loginAPI, {
//                 email: data.email,
//                 password: data.password
//             });

//             console.log("Login Response:", response.data); // Debug the response

//             if (response?.data) {
//                 const { message, token, ...userData } = response.data;
//                 Cookies.set("token", token, { expires: 7 });
//                 dispatch(saveUser({ user: userData.data, token }));
//                 toast.success(message || "Login successful!");
//                 navigate("/");
//             } else {
//                 throw new Error("Invalid response from server");
//             }
//         } catch (error) {
//             dispatch(clearUser());
//             console.error("Login error:", error.response?.data || error.message);
//             toast.error(error.response?.data?.message || "Login failed. Please try again.");
//         }
//     };

//     return (
//         <div className="hero bg-base-200 min-h-screen">
//             <div className="hero-content flex-col lg:flex-row-reverse">
//                 <div className="text-center lg:text-left">
//                     <h1 className="text-5xl font-bold">Login now!</h1>
//                     <p className="py-6">Access your account and explore the features available for you.</p>
//                 </div>
//                 <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//                     <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Email</span>
//                             </label>
//                             <input 
//                                 type="email" 
//                                 placeholder="Email" 
//                                 {...register("email", { required: true })} 
//                                 className="input input-bordered" 
//                                 required 
//                             />
//                         </div>
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Password</span>
//                             </label>
//                             <input 
//                                 type="password" 
//                                 placeholder="Password" 
//                                 {...register("password", { required: true })} 
//                                 className="input input-bordered" 
//                                 required 
//                             />
//                         </div>
//                         <div className="flex items-center justify-between mt-2">
//                             <label className="label">
//                                 <Link to={currentRole.signupRoute} className="label-text-alt link link-hover">
//                                     New user? Sign up
//                                 </Link>
//                             </label>
//                         </div>
//                         <div className="form-control mt-6">
//                             <button type="submit" className="btn btn-primary">Login</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// import React, { useEffect, useState } from "react";
// import {axiosInstance} from "../../config/axiosInstance.js";

// const Order = () => {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const res = await axiosInstance.get("/order/get");
//       const data = res.data;

//       if (Array.isArray(data)) {
//         setOrders(data);
//       } else {
//         console.error("Expected array, got:", data);
//         setOrders([]);
//       }
//     } catch (err) {
//       console.error("Error fetching orders:", err.response?.data || err.message);
//       setOrders([]);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">My Orders</h2>

//       {orders.length === 0 ? (
//         <p>You have no orders yet.</p>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <div key={order._id} className="border p-4 rounded shadow">
//               <p><strong>Order ID:</strong> {order._id}</p>
//               <p><strong>Status:</strong> {order.orderStatus}</p>
//               <p><strong>Payment:</strong> {order.paymentStatus}</p>
//               <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
//               <p><strong>Discount:</strong> ₹{order.discount}</p>

//               <div className="mt-2">
//                 <h4 className="font-semibold">Items:</h4>
//                 <ul className="list-disc ml-6">
//                   {order.orderItems.map((item, index) => (
//                     <li key={index}>
//                       {item.itemNameId?.name || "Unknown item"} - Qty: {item.quantity} - ₹{item.price}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <p className="text-sm text-gray-500 mt-2">
//                 Ordered on: {new Date(order.createdAt).toLocaleString()}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Order;
// 
  
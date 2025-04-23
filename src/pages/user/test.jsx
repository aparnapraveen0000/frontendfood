// // // // import React, { useEffect, useState } from 'react';
// // // // import { axiosInstance } from "../../../config/axiosInstance";

// // // // const AllRestaurants = () => {
// // // //   const [restaurants, setRestaurants] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchRestaurants = async () => {
// // // //       try {
// // // //         const response = await axiosInstance.get("/restaurant", {
// // // //           withCredentials: true, // Ensures cookies (token) are sent with request
// // // //         });
// // // //         setRestaurants(response.data.data); // Expecting response: { data: [...], message: "..." }
// // // //         setLoading(false);
// // // //       } catch (err) {
// // // //         console.error("Error fetching restaurants:", err);
// // // //         setError("Failed to load restaurants. Please login again.");
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchRestaurants();
// // // //   }, []);

// // // //   if (loading) return <p>Loading restaurants...</p>;
// // // //   if (error) return <p className="text-red-600">{error}</p>;

// // // //   return (
// // // //     <div className="p-4">
// // // //       <h2 className="text-2xl font-bold mb-4">Restaurant List</h2>
// // // //       {restaurants.length === 0 ? (
// // // //         <p>No restaurants found.</p>
// // // //       ) : (
// // // //         <ul className="space-y-3">
// // // //           {restaurants.map((restaurant) => (
// // // //             <li
// // // //               key={restaurant._id}
// // // //               className="p-4 bg-base-200 rounded-lg shadow"
// // // //             >
// // // //               <p className="text-lg font-semibold">{restaurant.name}</p>
// // // //               <p className="text-sm text-gray-600">
// // // //                 {restaurant?.location?.city}, {restaurant?.location?.state}
// // // //               </p>
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AllRestaurants;
// // // const fetchCoupon = async () => {
// // //     try {
// // //       const res = await axiosInstance.get(`/coupon/${id}`);
// // //       const coupon = res.data.data;
// // //       const formatDate = (date) => new Date(date).toISOString().split("T")[0];
// // //       setFormData({
// // //         ...coupon,
// // //         validFrom: formatDate(coupon.validFrom),
// // //         validTo: formatDate(coupon.validTo),
// // //       });
// // //     } catch (err) {
// // //      setError("Failed to fetch coupon. Please try again later.");
// // //       console.error("Error fetching coupon:", err);
// // //     } finally {
// // //       setLoading(false);
// // //   import React, { useState } from 'react';
// // //   import CreateRestaurant from './createres.jsx';
// // //   import  EditSellerRestaurant from './geteditdeleteres.jsx';
  
// // //   function ResManageSeller() {
// // //     const [activeComponent, setActiveComponent] = useState(null);
  
// // //     const handleAddClick = () => setActiveComponent('add');
// // //     const handleAllClick = () => setActiveComponent('all');
// // //     const handleBack = () => setActiveComponent(null);
  
// // //     return (
// // //       <>
// // //         {/* Navigation Buttons */}
// // //         {activeComponent === null ? (
// // //           <div className="space-y-4 p-4">
// // //             <div className="navbar bg-orange-300 text-black rounded-lg shadow">
// // //               <button className="btn btn-ghost text-xl" onClick={handleAddClick}>
// // //                 create Restaurant
// // //               </button>
// // //             </div>
  
// // //             <div className="navbar bg-green-300 text-black rounded-lg shadow">
// // //               <button className="btn btn-ghost text-xl" onClick={handleAllClick}>
// // //                 edit restaurant
// // //               </button>
// // //             </div>
// // //           </div>
// // //         ) : (
// // //           <div className="p-4">
// // //             {/* Back Button */}
// // //             <button
// // //               className="btn btn-secondary mb-4"
// // //               onClick={handleBack}
// // //             >
// // //               Back to Menu
// // //             </button>
  
// // //             {/* Render Selected Component */}
// // //             {activeComponent === 'add' && <CreateRestaurant />}
// // //             {activeComponent === 'all' && <EditSellerRestaurant />}
// // //           </div>
// // //         )}
// // //       </>
// // //     );
// // //   }
  
// // //   export default ResManageSeller;
// //   import React, { useEffect, useState } from "react";
// //   import { axiosInstance } from "../../../config/axiosInstance";
  
// //   const SellerMenuPage = () => {
// //     const [menuItems, setMenuItems] = useState([]);
// //     const [restaurants, setRestaurants] = useState([]);
// //     const [formData, setFormData] = useState({
// //       itemName: "",
// //       description: "",
// //       price: "",
// //       category: "",
// //       itemAvailability: true,
// //       restaurantId: "",
// //       foodImage: null, // Can be a File or URL string
// //     });
// //     const [error, setError] = useState(null); // State for error messages
// //     const [message, setMessage] = useState(""); // State for success/error messages
  
// //     // Fetch seller's restaurants and their menu
// //     const fetchSellerData = async () => {
// //       try {
// //         setError(null);
// //         setMessage("");
// //         const res = await axiosInstance.get("/seller/restaurants");
// //         const restaurants = res.data.data;
// //         const allMenuItems = restaurants.flatMap((r) =>
// //           r.menu.map((item) => ({ ...item, restaurantId: r._id }))
// //         );
// //         setRestaurants(restaurants);
// //         setMenuItems(allMenuItems);
// //       } catch (error) {
// //         console.error("Error fetching seller data:", error);
// //         setError("Failed to load restaurants and menu items. Please try again.");
// //       }
// //     };
  
// //     useEffect(() => {
// //       fetchSellerData();
// //     }, []);
  
// //     // Handle input changes
// //     const handleChange = (e) => {
// //       const { name, value, type, checked, files } = e.target;
// //       if (type === "checkbox") {
// //         setFormData({ ...formData, [name]: checked });
// //       } else if (type === "file") {
// //         setFormData({ ...formData, foodImage: files[0] });
// //       } else {
// //         setFormData({ ...formData, [name]: value });
// //       }
// //     };
  
// //     // Add a new menu item
// //     const handleAddItem = async (e) => {
// //       e.preventDefault();
// //       setError(null);
// //       setMessage("");
  
// //       const itemFormData = new FormData();
// //       itemFormData.append("itemName", formData.itemName);
// //       itemFormData.append("description", formData.description);
// //       itemFormData.append("price", parseFloat(formData.price));
// //       itemFormData.append("category", formData.category);
// //       itemFormData.append("itemAvailability", formData.itemAvailability);
// //       itemFormData.append("restaurantId", formData.restaurantId);
  
// //       // Support file OR URL
// //       if (formData.foodImage instanceof File) {
// //         itemFormData.append("foodImage", formData.foodImage); // Upload file
// //       } else if (typeof formData.foodImage === "string" && formData.foodImage.trim() !== "") {
// //         itemFormData.append("foodImage", formData.foodImage); // Use URL
// //       } else {
// //         setError("Please upload an image or provide an image URL.");
// //         return;
// //       }
  
// //       try {
// //         const res = await axiosInstance.post("/seller/menu/create", itemFormData, {
// //           headers: { "Content-Type": "multipart/form-data" },
// //         });
// //         setMenuItems([...menuItems, { ...res.data.data, restaurantId: formData.restaurantId }]);
// //         setFormData({
// //           itemName: "",
// //           description: "",
// //           price: "",
// //           category: "",
// //           itemAvailability: true,
// //           restaurantId: "",
// //           foodImage: null,
// //         });
// //         setMessage("✅ Item added successfully!");
// //       } catch (error) {
// //         console.error("Add item failed:", error);
// //         setError("Failed to add menu item. Please check the input and try again.");
// //         setMessage("❌ Failed to add item.");
// //       }
// //     };
  
// //     // Delete item
// //     const handleDelete = async (id) => {
// //       try {
// //         setError(null);
// //         setMessage("");
// //         await axiosInstance.delete(`/seller/menu/delete/${id}`);
// //         setMenuItems(menuItems.filter((item) => item._id !== id));
// //         setMessage("✅ Item deleted successfully!");
// //       } catch (error) {
// //         console.error("Delete failed:", error);
// //         setError("Failed to delete menu item. Please try again.");
// //         setMessage("❌ Failed to delete item.");
// //       }
// //     };
  
// //     // Update item
// //     const handleUpdate = async (id, updatedItem) => {
// //       try {
// //         setError(null);
// //         setMessage("");
// //         const res = await axiosInstance.put(`/seller/menu/update/${id}`, {
// //           ...updatedItem,
// //           price: parseFloat(updatedItem.price),
// //           restaurantId: updatedItem.restaurantId,
// //         });
// //         setMenuItems(menuItems.map((item) => (item._id === id ? { ...res.data.data, restaurantId: updatedItem.restaurantId } : item)));
// //         setMessage("✅ Item updated successfully!");
// //       } catch (error) {
// //         console.error("Update failed:", error);
// //         setError("Failed to update menu item. Please try again.");
// //         setMessage("❌ Failed to update item.");
// //       }
// //     };
  
// //     return (
// //       <div className="p-6 bg-gray-50 min-h-screen">
// //         <h1 className="text-3xl font-bold text-orange-600 mb-6">Manage Menu Items</h1>
  
// //         {/* Display error or success message */}
// //         {(error || message) && (
// //           <div
// //             className={`mb-4 p-3 rounded ${
// //               message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
// //             }`}
// //           >
// //             {error || message}
// //           </div>
// //         )}
  
// //         {/* Add new item */}
// //         <div className="bg-white p-4 rounded-xl shadow mb-8 max-w-xl">
// //           <h2 className="text-xl font-semibold mb-4">Add New Menu Item</h2>
// //           <form onSubmit={handleAddItem} className="space-y-4">
// //             <input
// //               type="text"
// //               name="itemName"
// //               placeholder="Item Name"
// //               value={formData.itemName}
// //               onChange={handleChange}
// //               className="input input-bordered input-sm"
// //               required
// //             />
// //             <textarea
// //               name="description"
// //               placeholder="Description"
// //               value={formData.description}
// //               onChange={handleChange}
// //               className="textarea textarea-bordered input-sm"
// //               required
// //             />
// //             <input
// //               type="number"
// //               name="price"
// //               placeholder="Price"
// //               value={formData.price}
// //               onChange={handleChange}
// //               className="input input-bordered input-sm"
// //               min="1"
// //               required
// //             />
// //             <input
// //               type="text"
// //               name="category"
// //               placeholder="Category"
// //               value={formData.category}
// //               onChange={handleChange}
// //               className="input input-bordered input-sm"
// //               required
// //             />
// //             <select
// //               name="restaurantId"
// //               value={formData.restaurantId}
// //               onChange={handleChange}
// //               className="select select-bordered input-sm"
// //               required
// //             >
// //               <option value="">Select Restaurant</option>
// //               {restaurants.map((r) => (
// //                 <option key={r._id} value={r._id}>
// //                   {r.name}
// //                 </option>
// //               ))}
// //             </select>
// //             <div className="form-control">
// //               <label className="label cursor-pointer">
// //                 <span className="label-text">Available?</span>
// //                 <input
// //                   type="checkbox"
// //                   name="itemAvailability"
// //                   className="toggle"
// //                   checked={formData.itemAvailability}
// //                   onChange={handleChange}
// //                 />
// //               </label>
// //             </div>
// //             <input
// //               type="file"
// //               name="foodImage"
// //               accept="image/*"
// //               onChange={handleChange}
// //               className="file-input file-input-bordered input-sm"
// //             />
// //             <div className="divider text-xs">OR</div>
// //             <input
// //               type="text"
// //               placeholder="Image URL"
// //               value={typeof formData.foodImage === "string" ? formData.foodImage : ""}
// //               onChange={(e) => setFormData({ ...formData, foodImage: e.target.value })}
// //               className="input input-bordered input-sm"
// //             />
// //             <button
// //               type="submit"
// //               className="btn btn-success input-sm"
// //               disabled={!formData.restaurantId || !formData.itemName || !formData.price || !formData.category}
// //             >
// //               Add Item
// //             </button>
// //           </form>
// //         </div>
  
// //         {/* Menu items list */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {menuItems.map((item) => (
// //             <div key={item._id} className="bg-white rounded-xl shadow p-4">
// //               <h3 className="text-xl font-bold">{item.itemName}</h3>
// //               <p className="text-gray-600">{item.description}</p>
// //               <p className="font-semibold text-orange-600 mt-2">₹{item.price}</p>
// //               <p className="text-sm text-gray-500">{item.category}</p>
// //               <p className={`text-sm ${item.itemAvailability ? "text-green-600" : "text-red-500"}`}>
// //                 {item.itemAvailability ? "Available" : "Not Available"}
// //               </p>
// //               {item.foodImage && (
// //                 <img
// //                   src={item.foodImage}
// //                   alt={item.itemName}
// //                   className="mt-2 w-full h-32 object-cover rounded"
// //                 />
// //               )}
// //               <div className="flex justify-between mt-4">
// //                 <button
// //                   onClick={() => {
// //                     const updatedName = prompt("Update name", item.itemName) || item.itemName;
// //                     handleUpdate(item._id, {
// //                       ...item,
// //                       itemName: updatedName,
// //                     });
// //                   }}
// //                   className="text-blue-600 hover:underline"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(item._id)}
// //                   className="text-red-500 hover:underline"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   };
  
// //   export default SellerMenuPage;
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { axiosInstance } from '../../config/axiosInstance.js';

// const Order = () => {
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 const response = await axiosInstance.get('/order/user/items');
//                 setOrders(response.data);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load orders');
//                 setLoading(false);
//             }
//         };
//         fetchOrders();
//     }, []);

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen bg-gray-900">
//                 <span className="loading loading-spinner loading-lg text-warning"></span>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto p-4 text-center">
//                 <p className="text-red-500 text-xl">{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto p-4 bg-gray-900 min-h-screen">
//             <h1 className="text-3xl text-yellow-500 font-bold mb-6 text-center">My Orders</h1>
//             {orders.length === 0 ? (
//                 <div className="text-center text-yellow-500 text-xl">
//                     No orders found. Start shopping now!
//                     <Link to="/menu" className="btn btn-warning ml-4">Browse Menu</Link>
//                 </div>
//             ) : (
//                 <div className="space-y-6">
//                     {orders.map(order => (
//                         <div key={order._id} className="card bg-gray-800 shadow-xl p-6">
//                             <h2 className="text-xl text-yellow-500 font-semibold">Order #{order._id.slice(-6)}</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                                 <div>
//                                     <p className="text-white"><strong>Restaurant:</strong> {order.restaurantName}</p>
//                                     <p className="text-white"><strong>Total:</strong> ₹{order.totalPrice}</p>
//                                     <p className="text-white"><strong>Items:</strong> {order.totalQuantity}</p>
//                                     <p className="text-white"><strong>Status:</strong> {order.orderStatus}</p>
//                                     <p className="text-white"><strong>Payment:</strong> {order.paymentStatus}</p>
//                                     <p className="text-white"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
//                                 </div>
//                                 <div>
//                                     <h3 className="text-lg text-yellow-500">Items</h3>
//                                     <div className="space-y-2">
//                                         {order.orderItems.map(item => (
//                                             item.itemNameId ? (
//                                                 <div key={item._id} className="flex items-center gap-4">
//                                                     <img
//                                                         src={item.itemNameId.foodImage || '/default-image.jpg'}
//                                                         alt={item.itemNameId.itemName || 'Item'}
//                                                         className="w-16 h-16 rounded object-cover"
//                                                         onError={(e) => (e.target.src = '/default-image.jpg')}
//                                                     />
//                                                     <div>
//                                                         <p className="text-white">{item.itemNameId.itemName || 'Unknown Item'}</p>
//                                                         <p className="text-white">₹{item.price} x {item.quantity}</p>
//                                                         <p className="text-gray-400 text-sm">{item.itemNameId.category || 'Unknown Category'}</p>
//                                                     </div>
//                                                 </div>
//                                             ) : (
//                                                 <div key={item._id} className="text-yellow-500 text-sm">
//                                                     Item details unavailable
//                                                 </div>
//                                             )
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="mt-4 text-right">
//                                 <Link to={`/orders/${order._id}`} className="btn btn-warning">View Details</Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Order;



// VITE_API_URL=http://localhost:3000
// BACKEND_URL=https://foodbackend-nine.vercel.app
// VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51REYOrQhKFyfepG3DmPygDgOR61iFeNnDUO4o1NIMaM0bjNGDfDowC2S6oudtaNml8Y8DrdMUO0gKEUgxjKL9wv600V3z1rowO
// http://localhost:3000||
// n your Stripe Dashboard, create a webhook endpoint pointing to https://your-backend.com/api/payment/webhook.
// Select the checkout.session.completed event.
// Copy the webhook secret and add it to your .env file:
// text

// Copy
// STRIPE_WEBHOOK_SECRET=your-webhook-secret
// For local testing, use ngrok to expose your server (ngrok http 5000) and update the webhook URL in Stripe.
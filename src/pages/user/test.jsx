// import React, { useState, useEffect } from 'react';
// import { axiosInstance } from "../../config/axiosInstance";
// import Cookies from 'js-cookie';

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const token = Cookies.get("token");
//         const response = await axiosInstance.get("/cart/get", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCartItems(response.data.items || []);
//         setTotalPrice(response.data.totalPrice || 0);
//       } catch (error) {
//         console.error("Error fetching cart:", error.response?.data || error.message);
//       }
//     };
//     fetchCartItems();
//   }, []);

//   return (
//     <div>
//       {cartItems.length > 0 ? (
//         <>
//           {cartItems.map((item) => (
//             <div key={item.foodId}>
//               <p>{item.foodId.name} - {item.quantity} x ₹{item.price}</p>
//             </div>
//           ))}
//           <p>Total: ₹{totalPrice}</p>
//         </>
//       ) : (
//         <p>{cartItems.message || "Cart is empty"}</p>
//       )}
//     </div>
//   );
// };

// export default Cart;



// import React, { useState, useEffect } from 'react';
// import { axiosInstance } from '../../config/axiosInstance.js';
// import { useNavigate } from 'react-router-dom';

// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const response = await axiosInstance.get('/user/getProfile');
//       setUserData(response.data.data);
//       setFormData(response.data.data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error fetching profile');
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.put('/user/updateProfile', formData);
//       setUserData(response.data.data);
//       setIsEditing(false);
//       alert('Profile updated successfully');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error updating profile');
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await axiosInstance.post('/user/logout');
//       navigate('/login');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error logging out');
//     }
//   };

//   const handleDeactivate = async () => {
//     if (window.confirm('Are you sure you want to deactivate your account?')) {
//       try {
//         await axiosInstance.put('/user/deactivate');
//         navigate('/login');
//       } catch (err) {
//         setError(err.response?.data?.message || 'Error deactivating account');
//       }
//     }
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-4">
//       <div className="card bg-base-100 shadow-md p-6">
//         <h2 className="text-xl font-bold mb-4 text-center">User Profile</h2>

//         {!isEditing ? (
//           <div className="space-y-4 text-center">
//             <img
//               src={userData.profilePic}
//               alt="Profile"
//               className="w-24 h-24 rounded-full mx-auto"
//               onError={(e) => {
//                 e.target.src = 'https://cdn.vectorstock.com/i/1000v/26/40/profile-placeholder-image-gray-silhouette-vector-22122640.jpg';
//               }}
//             />
//             <p><strong>Name:</strong> {userData.name}</p>
//             <p><strong>Email:</strong> {userData.email}</p>
//             <p><strong>Mobile:</strong> {userData.mobile}</p>
//             <p><strong>Address:</strong> {userData.address}</p>
//             <div className="flex flex-col gap-2 mt-4">
//               <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
//               <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
//               <button className="btn btn-error" onClick={handleDeactivate}>Deactivate</button>
//             </div>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               type="text"
//               name="name"
//               className="input input-bordered input-sm md"
//               value={formData.name}
//               onChange={handleInputChange}
//               placeholder="Name"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               className="input input-bordered input-sm md"
//               value={formData.email}
//               onChange={handleInputChange}
//               placeholder="Email"
//               required
//             />
//             <input
//               type="text"
//               name="mobile"
//               className="input input-bordered input-sm md"
//               value={formData.mobile}
//               onChange={handleInputChange}
//               placeholder="Mobile"
//               required
//             />
//             <input
//               type="text"
//               name="address"
//               className="input input-bordered input-sm md"
//               value={formData.address}
//               onChange={handleInputChange}
//               placeholder="Address"
//               required
//             />
//             <input
//               type="text"
//               name="profilePic"
//               className="input input-bordered input-sm md"
//               value={formData.profilePic}
//               onChange={handleInputChange}
//               placeholder="Profile Picture URL"
//             />
//             <div className="flex gap-2 pt-2">
//               <button type="submit" className="btn btn-primary">Save</button>
//               <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;

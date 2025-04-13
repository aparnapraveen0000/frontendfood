import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

function SellerProfile() {
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellerProfile();
  }, []);

  const fetchSellerProfile = async () => {
    try {
      const response = await axiosInstance.get('/seller/profile');
      setSellerData(response.data.data);
      setFormData(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching seller profile');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put('/seller/update', formData);
      setSellerData(response.data.data);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/seller/logout');
      navigate('/seller/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging out');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="card bg-base-100 shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Seller Profile</h2>

        {!isEditing ? (
          <div className="space-y-4 text-center">
            <img
              src={
                sellerData.profilePic
                  ? sellerData.profilePic
                  : 'https://cdn.vectorstock.com/i/1000v/26/40/profile-placeholder-image-gray-silhouette-vector-22122640.jpg'
              }
              alt="Seller"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <p><strong>Name:</strong> {sellerData.name}</p>
            <p><strong>Email:</strong> {sellerData.email}</p>
            <p><strong>Mobile:</strong> {sellerData.mobile}</p>
            <p><strong>Address:</strong> {sellerData.address}</p>
            <p><strong>Business:</strong> {sellerData.businessName}</p>
            <div className="flex flex-col gap-2 mt-4">
              <button className="btn bg-orange-500 hover:bg-orange-600 text-white" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn bg-yellow-500 hover:bg-yellow-600 text-white" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} placeholder="Name" className="input input-bordered input-sm w-full" required />
            <input type="email" name="email" value={formData.email || ''} onChange={handleInputChange} placeholder="Email" className="input input-bordered input-sm w-full" required />
            <input type="text" name="mobile" value={formData.mobile || ''} onChange={handleInputChange} placeholder="Mobile" className="input input-bordered input-sm w-full" required />
            <input type="text" name="address" value={formData.address || ''} onChange={handleInputChange} placeholder="Address" className="input input-bordered input-sm w-full" required />
            <input type="text" name="businessName" value={formData.businessName || ''} onChange={handleInputChange} placeholder="Business Name" className="input input-bordered input-sm w-full" required />
            <input type="text" name="profilePic" value={formData.profilePic || ''} onChange={handleInputChange} placeholder="Profile Picture URL" className="input input-bordered input-sm w-full" />
            <div className="flex gap-2 pt-2">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default SellerProfile


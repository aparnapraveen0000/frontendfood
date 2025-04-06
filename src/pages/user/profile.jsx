import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/user/getProfile');
      setUserData(response.data.data);
      setFormData(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching profile');
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
      const response = await axiosInstance.put('/user/updateProfile', formData);
      setUserData(response.data.data);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating profile');
    }
  };

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/user/logout');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging out');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <div className="card bg-base-100 shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-center">User Profile</h2>

        {!isEditing ? (
          <div className="space-y-4 text-center">
            <img
              src={
                userData.profilePic
                  ? userData.profilePic
                  : 'https://cdn.vectorstock.com/i/1000v/26/40/profile-placeholder-image-gray-silhouette-vector-22122640.jpg'
              }
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Mobile:</strong> {userData.mobile}</p>
            <p><strong>Address:</strong> {userData.address}</p>
            <div className="flex flex-col gap-2 mt-4">
              <button className="btn bg-orange-400 hover:bg-yellow-500 text-black" onClick={() => setIsEditing(true)}>Edit</button>
              <button className="btn bg-orange-500 hover:bg-yellow-600 text-black" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              className="input input-bordered input-sm md"
              value={formData.name || ''}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              className="input input-bordered input-sm md"
              value={formData.email || ''}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="mobile"
              className="input input-bordered input-sm md"
              value={formData.mobile || ''}
              onChange={handleInputChange}
              placeholder="Mobile"
              required
            />
            <input
              type="text"
              name="address"
              className="input input-bordered input-sm md"
              value={formData.address || ''}
              onChange={handleInputChange}
              placeholder="Address"
              required
            />
            <input
              type="text"
              name="profilePic"
              className="input input-bordered input-sm md"
              value={formData.profilePic || ''}
              onChange={handleInputChange}
              placeholder="Profile Picture URL"
            />
            <div className="flex gap-2 pt-2">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;

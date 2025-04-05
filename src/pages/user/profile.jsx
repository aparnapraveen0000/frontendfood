// pages/user/profile.jsx
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../config/axiosInstance.js'; // Adjusted path based on your structure
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Fetch user profile on component mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/user/getProfile');
      setUserData(response.data.data);
      setFormData({
        name: response.data.data.name,
        email: response.data.data.email,
        mobile: response.data.data.mobile,
        address: response.data.data.address,
        profilePic: response.data.data.profilePic
      });
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching profile');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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

  const handleDeactivate = async () => {
    if (window.confirm('Are you sure you want to deactivate your account?')) {
      try {
        await axiosInstance.put('/user/deactivate');
        navigate('/login');
      } catch (err) {
        setError(err.response?.data?.message || 'Error deactivating account');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      
      {!isEditing ? (
        <div className="profile-display">
          <img 
            src={userData.profilePic} 
            alt="Profile" 
            className="profile-pic"
            onError={(e) => {
              e.target.src = 'https://cdn.vectorstock.com/i/1000v/26/40/profile-placeholder-image-gray-silhouette-vector-22122640.jpg';
            }}
          />
          <div className="profile-info">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Mobile:</strong> {userData.mobile}</p>
            <p><strong>Address:</strong> {userData.address}</p>
          </div>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDeactivate} className="deactivate-btn">
            Deactivate Account
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              maxLength="30"
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              maxLength="30"
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profile Picture URL:</label>
            <input
              type="text"
              name="profilePic"
              value={formData.profilePic}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-actions">
            <button type="submit">Save Changes</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
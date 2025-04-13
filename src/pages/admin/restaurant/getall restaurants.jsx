import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../../config/axiosInstance";

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); // To toggle update form
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosInstance.get("/restaurant", {
        withCredentials: true,
      });
      setRestaurants(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching restaurants:", err);
      setError("Failed to load restaurants. Please login again.");
      setLoading(false);
    }
  };

  const handleDelete = async (restaurantId) => {
    try {
      await axiosInstance.delete(`/restaurant/delete/${restaurantId}`);
      setRestaurants(prev => prev.filter(r => r._id !== restaurantId));
    } catch (error) {
      console.error('Delete error:', error.response?.data || error.message);
    }
  };

  const handleEditClick = (restaurant) => {
    setEditingId(restaurant._id);
    setFormData({
      name: restaurant.name,
      description: restaurant.description,
      address: restaurant.location?.address || '',
      city: restaurant.location?.city || '',
      state: restaurant.location?.state || '',
      pincode: restaurant.location?.pincode || '',
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/restaurant/update/${editingId}`, {
        name: formData.name,
        description: formData.description,
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
      });
      setEditingId(null);
      fetchRestaurants(); // Refresh the list
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
    }
  };

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Restaurant List</h2>
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul className="space-y-4">
          {restaurants.map((restaurant) => (
            <li key={restaurant._id} className="p-4 bg-base-200 rounded-lg shadow">
              <p className="text-lg font-semibold">{restaurant.name}</p>
              <p className="text-sm text-gray-600">
                {restaurant.location?.city}, {restaurant.location?.state}
              </p>
              <div className="mt-2 space-x-2">
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(restaurant._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => handleEditClick(restaurant)}
                >
                  Update
                </button>
              </div>

              {editingId === restaurant._id && (
                <form className="mt-4 space-y-2" onSubmit={handleUpdate}>
                  <input className="input input-bordered w-full" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
                  <input className="input input-bordered w-full" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                  <input className="input input-bordered w-full" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                  <input className="input input-bordered w-full" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                  <input className="input input-bordered w-full" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                  <input className="input input-bordered w-full" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required />
                  <button className="btn btn-success mt-2" type="submit">Submit Update</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllRestaurants;

import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../config/axiosInstance';
import { toast } from 'react-toastify';

const EditSellerRestaurant = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    rating: '',
  });

  // Fetch seller's restaurant
  const fetchRestaurant = async () => {
    try {
      const response = await axiosInstance.get('/restaurant/seller/myrestaurants');
      const res = response.data.data[0]; // assuming one restaurant per seller

      setRestaurant(res);
      setFormData({
        name: res.name,
        description: res.description,
        address: res.location.address,
        city: res.location.city,
        state: res.location.state,
        pincode: res.location.pincode,
        rating: res.rating,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch restaurant');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const ratingInt = parseInt(formData.rating, 10);
    if (isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
      toast.error('Rating must be a whole number between 1 and 5');
      return;
    }

    try {
      const response = await axiosInstance.put(`/restaurant/seller/update/${restaurant._id}`, {
        name: formData.name,
        description: formData.description,
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        rating: ratingInt,
      });

      toast.success('Restaurant updated successfully');
      fetchRestaurant(); // refresh view
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;

  if (!restaurant) return <div className="text-center p-5">No restaurant found</div>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-600">Edit Restaurant</h2>
      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          name="name"
          placeholder="Restaurant Name"
          value={formData.name}
          onChange={handleChange}
          className="input input-bordered input-sm"
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="input input-bordered input-sm"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="input input-bordered input-sm"
          required
        />
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="input input-bordered input-sm"
          required
        />
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="input input-bordered input-sm"
          required
        />
        <input
          name="pincode"
          placeholder="Pincode"
          type="number"
          value={formData.pincode}
          onChange={handleChange}
          className="input input-bordered input-sm"
          required
        />
        <input
          name="rating"
          placeholder="Rating (1-5)"
          type="number"
          min="1"
          max="5"
          step="1"
          value={formData.rating}
          onChange={handleChange}
          className="input input-bordered input-sm"
          required
        />
        <button
          type="submit"
          className="btn bg-green-500 hover:bg-green-600 text-white"
        >
          Update Restaurant
        </button>
      </form>
    </div>
  );
};

export default EditSellerRestaurant;

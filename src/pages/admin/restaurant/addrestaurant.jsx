import { useState } from 'react';
import { axiosInstance } from "../../../config/axiosInstance";

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    rating: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ratingInt = parseInt(formData.rating, 10);

    // Validate rating is a whole number between 1 and 5
    if (isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
      alert("Rating must be a whole number between 1 and 5");
      return;
    }

    try {
      const response = await axiosInstance.post('/restaurant/restaurant', {
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
      console.log('Added:', response.data);
    } catch (error) {
      console.error('Add error:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="description" placeholder="Description" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="city" placeholder="City" onChange={handleChange} required />
      <input name="state" placeholder="State" onChange={handleChange} required />
      <input name="pincode" placeholder="Pincode" type="number" onChange={handleChange} required />
      <input
        name="rating"
        placeholder="Rating (1-5)"
        type="number"
        min="1"
        max="5"
        step="1"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Restaurant</button>
    </form>
  );
};

export default AddRestaurant;

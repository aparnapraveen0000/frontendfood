import { useState } from 'react';
import { axiosInstance } from "../../../config/axiosInstance";
import { toast } from "react-toastify";

const CreateRestaurant = () => {
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
    if (isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
      toast.error("Rating must be a whole number between 1 and 5");
      return;
    }

    try {
      const response = await axiosInstance.post('/restaurant/addres', {
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

      toast.success("Restaurant created successfully!");
      console.log('Restaurant created:', response.data);

      setFormData({
        name: '',
        description: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        rating: '',
      });
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Create Restaurant</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          className="btn bg-orange-500 hover:bg-orange-600 text-white"
        >
          Create Restaurant
        </button>
      </form>
    </div>
  );
};

export default CreateRestaurant;

import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../../config/axiosInstance';

const AddItem = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    price: '',
    category: '',
    itemAvailability: true,
    restaurant: '',
    foodImage: null, // can be file or URL
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axiosInstance.get('/restaurant', { withCredentials: true });
        setRestaurants(response.data.data);
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, foodImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    console.log("foodImage value:", formData.foodImage); // ✅ Debug check

    const itemFormData = new FormData();
    itemFormData.append('itemName', formData.itemName);
    itemFormData.append('description', formData.description);
    itemFormData.append('price', formData.price);
    itemFormData.append('category', formData.category);
    itemFormData.append('itemAvailability', formData.itemAvailability);
    itemFormData.append('restaurant', formData.restaurant);

    // ✅ Support file OR URL
    if (formData.foodImage instanceof File) {
      itemFormData.append('foodImage', formData.foodImage); // upload file
    } else if (typeof formData.foodImage === 'string' && formData.foodImage.trim() !== '') {
      itemFormData.append('foodImage', formData.foodImage); // use URL
    } else {
      alert('Please upload an image or provide an image URL.');
      return;
    }

    try {
      const response = await axiosInstance.post('/menu/create', itemFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      setMessage('✅ Item added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating item:', error);
      setMessage('❌ Failed to add item.');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-base-200 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Menu Item</h2>

      {message && <p className={`mb-4 ${message.includes("✅") ? "text-green-600" : "text-red-600"}`}>{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="input input-bordered input-sm" name="itemName" placeholder="Item Name" onChange={handleChange} required />
        <textarea className="textarea textarea-bordered input-sm" name="description" placeholder="Description" onChange={handleChange} required></textarea>
        <input className="input input-bordered input-sm" type="number" name="price" placeholder="Price" onChange={handleChange} required />
        <input className="input input-bordered input-sm" name="category" placeholder="Category" onChange={handleChange} required />

        <select className="select select-bordered input-sm" name="restaurant" onChange={handleChange} required>
          <option value="">Select Restaurant</option>
          {restaurants.map((res) => (
            <option key={res._id} value={res._id}>
              {res.name}
            </option>
          ))}
        </select>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Available?</span>
            <input type="checkbox" name="itemAvailability" className="toggle" checked={formData.itemAvailability} onChange={handleChange} />
          </label>
        </div>

        <input className="file-input file-input-bordered input-sm" type="file" name="foodImage" onChange={handleChange} />

        <div className="divider text-xs">OR</div>

        <input
          className="input input-bordered input-sm"
          type="text"
          placeholder="Image URL"
          onChange={(e) => setFormData({ ...formData, foodImage: e.target.value })}
        />

        <button className="btn btn-success input-sm" type="submit">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddItem;

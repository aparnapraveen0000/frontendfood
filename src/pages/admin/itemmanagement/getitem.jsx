import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../config/axiosInstance';

const GetAllItems = () => {
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    price: '',
    category: '',
    itemAvailability: true,
    foodImage: null,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get('/menu/get_all');
      setItems(response.data.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axiosInstance.delete(`/menu/delete/${itemId}`, { withCredentials: true });
      setItems((prev) => prev.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setFormData({
      itemName: item.itemName,
      description: item.description,
      price: item.price,
      category: item.category,
      itemAvailability: item.itemAvailability,
      foodImage: null, // Only updated if new image is selected
    });
  };

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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateData = new FormData();
    updateData.append('itemName', formData.itemName);
    updateData.append('description', formData.description);
    updateData.append('price', formData.price);
    updateData.append('category', formData.category);
    updateData.append('itemAvailability', formData.itemAvailability);

    // ✅ Append image only if selected
    if (formData.foodImage) {
      updateData.append('foodImage', formData.foodImage);
    }

    try {
      await axiosInstance.put(`/menu/update/${editingItemId}`, updateData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      setEditingItemId(null);
      setFormData({
        itemName: '',
        description: '',
        price: '',
        category: '',
        itemAvailability: true,
        foodImage: null,
      });

      fetchItems();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Menu Items</h2>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="bg-base-200 p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.itemName}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-600">₹ {item.price}</p>
                  <p className="text-sm text-gray-600">Category: {item.category}</p>
                  <p className="text-sm">
                    {item.itemAvailability ? 'Available' : 'Not Available'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleEditClick(item)}
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Update Form */}
              {editingItemId === item._id && (
                <form className="mt-4 space-y-2" onSubmit={handleUpdate}>
                  <input
                    className="input input-bordered input-sm"
                    name="itemName"
                    value={formData.itemName}
                    onChange={handleChange}
                    placeholder="Item Name"
                    required
                  />
                  <textarea
                    className="textarea textarea-bordered input-sm"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                  ></textarea>
                  <input
                    className="input input-bordered input-sm"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                  />
                  <input
                    className="input input-bordered input-sm"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                  />
                  <div className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">Available?</span>
                      <input
                        type="checkbox"
                        name="itemAvailability"
                        className="toggle"
                        checked={formData.itemAvailability}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <input
                    className="file-input file-input-bordered input-sm"
                    type="file"
                    name="foodImage"
                    onChange={handleChange}
                  />
                  <button className="btn btn-success input-sm" type="submit">
                    Submit Update
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetAllItems;

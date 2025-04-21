import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";

const SellerMenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    description: "",
    price: "",
    category: "",
    itemAvailability: true,
    restaurantId: "",
    foodImage: null, // Can be a File or URL string
  });
  const [editItem, setEditItem] = useState(null); // State for editing item
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch seller's restaurants and their menu
  const fetchSellerData = async () => {
    try {
      setError(null);
      setMessage("");
      const res = await axiosInstance.get("/seller/restaurants");
      const restaurants = res.data.data;
      const allMenuItems = restaurants.flatMap((r) =>
        r.menu.map((item) => ({ ...item, restaurantId: r._id }))
      );
      setRestaurants(restaurants);
      setMenuItems(allMenuItems);
    } catch (error) {
      console.error("Error fetching seller data:", error);
      setError("Failed to load restaurants and menu items. Please try again.");
    }
  };

  useEffect(() => {
    fetchSellerData();
  }, []);

  // Handle input changes for add form
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, foodImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle input changes for edit form
  const handleEditChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setEditItem({ ...editItem, [name]: checked });
    } else if (type === "file") {
      setEditItem({ ...editItem, foodImage: files[0] });
    } else {
      setEditItem({ ...editItem, [name]: value });
    }
  };

  // Add a new menu item
  const handleAddItem = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    const itemFormData = new FormData();
    itemFormData.append("itemName", formData.itemName);
    itemFormData.append("description", formData.description);
    itemFormData.append("price", parseFloat(formData.price));
    itemFormData.append("category", formData.category);
    itemFormData.append("itemAvailability", formData.itemAvailability);
    itemFormData.append("restaurantId", formData.restaurantId);

    if (formData.foodImage instanceof File) {
      itemFormData.append("foodImage", formData.foodImage);
    } else if (typeof formData.foodImage === "string" && formData.foodImage.trim() !== "") {
      itemFormData.append("foodImage", formData.foodImage);
    } else {
      setError("Please upload an image or provide an image URL.");
      return;
    }

    try {
      const res = await axiosInstance.post("/seller/menu/create", itemFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMenuItems([...menuItems, { ...res.data.data, restaurantId: formData.restaurantId }]);
      setFormData({
        itemName: "",
        description: "",
        price: "",
        category: "",
        itemAvailability: true,
        restaurantId: "",
        foodImage: null,
      });
      setMessage("✅ Item added successfully!");
    } catch (error) {
      console.error("Add item failed:", error);
      setError("Failed to add menu item. Please check the input and try again.");
      setMessage("❌ Failed to add item.");
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    try {
      setError(null);
      setMessage("");
      await axiosInstance.delete(`/seller/menu/delete/${id}`);
      setMenuItems(menuItems.filter((item) => item._id !== id));
      setMessage("✅ Item deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      setError("Failed to delete menu item. Please try again.");
      setMessage("❌ Failed to delete item.");
    }
  };

  // Update item
  const handleUpdate = async (id) => {
    try {
      setError(null);
      setMessage("");
      const itemFormData = new FormData();
      itemFormData.append("itemName", editItem.itemName);
      itemFormData.append("description", editItem.description);
      itemFormData.append("price", parseFloat(editItem.price));
      itemFormData.append("category", editItem.category);
      itemFormData.append("itemAvailability", editItem.itemAvailability);
      itemFormData.append("restaurantId", editItem.restaurantId);

      if (editItem.foodImage instanceof File) {
        itemFormData.append("foodImage", editItem.foodImage);
      } else if (typeof editItem.foodImage === "string" && editItem.foodImage.trim() !== "") {
        itemFormData.append("foodImage", editItem.foodImage);
      }

      const res = await axiosInstance.put(`/seller/menu/update/${id}`, itemFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMenuItems(menuItems.map((item) => (item._id === id ? { ...res.data.data, restaurantId: editItem.restaurantId } : item)));
      setEditItem(null);
      setMessage("✅ Item updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      setError("Failed to update menu item. Please try again.");
      setMessage("❌ Failed to update item.");
    }
  };

  // Open edit form
  const openEditForm = (item) => {
    setEditItem({
      ...item,
      foodImage: item.foodImage || "", // Initialize with current image URL
    });
  };

  // Close edit form
  const closeEditForm = () => {
    setEditItem(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">Manage Menu Items</h1>

      {(error || message) && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {error || message}
        </div>
      )}

      <div className="bg-white p-4 rounded-xl shadow mb-8 max-w-xl">
        <h2 className="text-xl font-semibold mb-4">Add New Menu Item</h2>
        <form onSubmit={handleAddItem} className="space-y-4">
          <input
            type="text"
            name="itemName"
            placeholder="Item Name"
            value={formData.itemName}
            onChange={handleChange}
            className="input input-bordered input-sm"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="textarea textarea-bordered input-sm"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered input-sm"
            min="1"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered input-sm"
            required
          />
          <select
            name="restaurantId"
            value={formData.restaurantId}
            onChange={handleChange}
            className="select select-bordered input-sm"
            required
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((r) => (
              <option key={r._id} value={r._id}>
                {r.name}
              </option>
            ))}
          </select>
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
            type="file"
            name="foodImage"
            accept="image/*"
            onChange={handleChange}
            className="file-input file-input-bordered input-sm"
          />
          <div className="divider text-xs">OR</div>
          <input
            type="text"
            placeholder="Image URL"
            value={typeof formData.foodImage === "string" ? formData.foodImage : ""}
            onChange={(e) => setFormData({ ...formData, foodImage: e.target.value })}
            className="input input-bordered input-sm"
          />
          <button
            type="submit"
            className="btn btn-success input-sm"
            disabled={!formData.restaurantId || !formData.itemName || !formData.price || !formData.category}
          >
            Add Item
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow p-4">
            <h3 className="text-xl font-bold">{item.itemName}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="font-semibold text-orange-600 mt-2">₹{item.price}</p>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className={`text-sm ${item.itemAvailability ? "text-green-600" : "text-red-500"}`}>
              {item.itemAvailability ? "Available" : "Not Available"}
            </p>
            {item.foodImage && (
              <img
                src={item.foodImage}
                alt={item.itemName}
                className="mt-2 w-full h-32 object-cover rounded"
              />
            )}
            <div className="flex justify-between mt-4">
              <button
                onClick={() => openEditForm(item)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl shadow max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Menu Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdate(editItem._id);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                value={editItem.itemName}
                onChange={handleEditChange}
                className="input input-bordered input-sm"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={editItem.description}
                onChange={handleEditChange}
                className="textarea textarea-bordered input-sm"
                required
              />
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={editItem.price}
                onChange={handleEditChange}
                className="input input-bordered input-sm"
                min="1"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={editItem.category}
                onChange={handleEditChange}
                className="input input-bordered input-sm"
                required
              />
              <select
                name="restaurantId"
                value={editItem.restaurantId}
                onChange={handleEditChange}
                className="select select-bordered input-sm"
                required
              >
                <option value="">Select Restaurant</option>
                {restaurants.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Available?</span>
                  <input
                    type="checkbox"
                    name="itemAvailability"
                    className="toggle"
                    checked={editItem.itemAvailability}
                    onChange={handleEditChange}
                  />
                </label>
              </div>
              <input
                type="file"
                name="foodImage"
                accept="image/*"
                onChange={handleEditChange}
                className="file-input file-input-bordered input-sm"
              />
              <div className="divider text-xs">OR</div>
              <input
                type="text"
                placeholder="Image URL"
                value={typeof editItem.foodImage === "string" ? editItem.foodImage : ""}
                onChange={(e) => setEditItem({ ...editItem, foodImage: e.target.value })}
                className="input input-bordered input-sm"
              />
              <div className="flex justify-end space-x-2">
                <button type="submit" className="btn btn-success input-sm">
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeEditForm}
                  className="btn btn-error input-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerMenuPage;
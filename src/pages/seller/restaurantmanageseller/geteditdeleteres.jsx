import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";

const GetEditDeleteRes = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    rating: "",
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axiosInstance.get("/restaurant/allres");
      setRestaurants(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching seller's restaurants:", err);
      setError("Failed to load restaurants. Please login again.");
      setLoading(false);
    }
  };

  const handleDelete = async (restaurantId) => {
    try {
      await axiosInstance.delete(`/restaurant/removeres/${restaurantId}`);
      setRestaurants((prev) => prev.filter((r) => r._id !== restaurantId));
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
    }
  };

  const handleEditClick = (restaurant) => {
    setEditingId(restaurant._id);
    setFormData({
      name: restaurant.name,
      description: restaurant.description || "",
      address: restaurant.location?.address || "",
      city: restaurant.location?.city || "",
      state: restaurant.location?.state || "",
      pincode: restaurant.location?.pincode || "",
      rating: restaurant.rating || "",
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const ratingInt = parseInt(formData.rating, 10);

    if (isNaN(ratingInt) || ratingInt < 1 || ratingInt > 5) {
      alert("Rating must be a whole number between 1 and 5");
      return;
    }

    try {
      await axiosInstance.put(`/restaurant/editres/${editingId}`, {
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
      setEditingId(null);
      fetchRestaurants();
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
    }
  };

  if (loading) return <p>Loading your restaurants...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">My Restaurants</h2>
      {restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <ul className="space-y-6">
          {restaurants.map((restaurant) => (
            <li
              key={restaurant._id}
              className="p-5 bg-base-200 rounded-xl shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xl font-semibold">{restaurant.name}</p>
                  <p className="text-sm text-gray-600">
                    {restaurant.location?.address},{" "}
                    {restaurant.location?.city}, {restaurant.location?.state} -{" "}
                    {restaurant.location?.pincode}
                  </p>
                  <p className="text-sm text-gray-500">Rating: {restaurant.rating}</p>
                </div>
                <div className="space-x-2">
                  <button
                    className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600"
                    onClick={() => handleEditClick(restaurant)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error text-white"
                    onClick={() => handleDelete(restaurant._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {editingId === restaurant._id && (
                <form className="mt-4 space-y-3" onSubmit={handleUpdate}>
                  <input
                    className="input input-bordered w-full"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                  <input
                    className="input input-bordered w-full"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                  />
                  <input
                    className="input input-bordered w-full"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                  />
                  <input
                    className="input input-bordered w-full"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    required
                  />
                  <input
                    className="input input-bordered w-full"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State"
                    required
                  />
                  <input
                    className="input input-bordered w-full"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Pincode"
                    required
                  />
                  <input
                    className="input input-bordered w-full"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    placeholder="Rating (1-5)"
                    required
                  />
                  <button className="btn btn-success w-full mt-2" type="submit">
                    Submit Update
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetEditDeleteRes;

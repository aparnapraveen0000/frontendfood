import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const RestaurantsList = () => {
  const { restaurantId } = useParams();
  const { state } = useLocation(); // Get the selected item from navigation state
  const navigate = useNavigate(); // For navigation
  const [restaurant, setRestaurant] = useState({});
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]); // Local cart state (optional)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Quantity for the selected item

  const selectedItem = state?.selectedItem; // The selected food item from Card

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axiosInstance.get(`/restaurant/${restaurantId}`);
        console.log("API Response:", response.data);

        if (response.data && response.data.data) {
          setRestaurant(response.data.data.restaurant ?? {});
          setMenu(response.data.data.menu ?? []);
        } else {
          console.error("Invalid response format:", response.data);
          setRestaurant({});
          setMenu([]);
        }
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  const handleAddToCart = async () => {
    if (!selectedItem) return;

    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login");
        return;
      }
      console.log("Selected Item:", selectedItem);
      console.log("Sending to API:", { foodId: selectedItem._id, quantity });
      
      const response = await axiosInstance.post(
        "/cart/add",
        { foodId: selectedItem._id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Add to Cart Response:", response.data);

      // Optional: Update local cart state (remove if relying on backend)
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item._id === selectedItem._id);
        if (existingItem) {
          return prevCart.map((item) =>
            item._id === selectedItem._id ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          const cartItem = { ...selectedItem, quantity };
          return [...prevCart, cartItem];
        }
      });

      navigate("/cart"); // Navigate to cart page after successful addition
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Failed to add item to cart. Please try again.");
    }

    setQuantity(1); // Reset quantity after adding to cart
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Restaurant Details */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{restaurant?.name || "Not Available"}</h3>
        <p className="text-gray-600">Rating: {restaurant?.rating || "Not Available"}</p>
        <p className="text-gray-600">Location: {restaurant?.location?.address || "Not Available"}</p>
      </div>

      {/* Selected Food Item Details */}
      {selectedItem ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h4 className="text-xl font-semibold text-gray-800 mb-4">{selectedItem.name}</h4>
          <p className="text-lg text-green-600">₹{selectedItem.price}</p>
          <p className="text-orange-700 mt-2">
            {selectedItem.description || "No description available"}
          </p>
          <div className="mt-4">
            <label className="block text-orange-700">Quantity:</label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="w-20 p-2 border rounded text-gray-800 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      ) : (
        <p className="text-gray-500">No item selected.</p>
      )}
    </div>
  );
};

export default RestaurantsList;
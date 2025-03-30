import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import axios from "axios";

const RestaurantsList = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axiosInstance.get(`/restaurant/menu-item/${itemId}`);
        setRestaurant(response.data.data || { menu: [] }); // Ensure menu is always an array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [itemId]);

  const handleAddToCart = async (foodId, quantity) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/cart/add",
        { foodId, quantity },
        { withCredentials: true }
      );
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data?.message || error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!restaurant) return <p>No restaurant found.</p>;

  return (
    <div>
      <h3>{restaurant?.name || "Restaurant Name Not Available"}</h3>
      {restaurant?.menu?.length > 0 ? (
        restaurant.menu.map((food) => (
          <div key={food._id}>
            <p>{food.name} - ${food.price}</p>
            <button onClick={() => handleAddToCart(food._id, 1)}>Add to Cart</button>
          </div>
        ))
      ) : (
        <p>No menu available.</p>
      )}
    </div>
  );
};

export default RestaurantsList;

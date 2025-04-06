import React from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from "../../config/axiosInstance";
import Cookies from 'js-cookie';

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        navigate("/login"); // Redirect to login if not authenticated
        return;
      }

      console.log("Sending request to add item to cart...");
      await axiosInstance.post(
        "/cart/add",
        {
          foodId: product._id,
          price: product.price,    
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Item added successfully, navigating to /cart");
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Product;

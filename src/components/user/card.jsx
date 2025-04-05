import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ value, addToCart }) {
  const navigate = useNavigate();

  const handleAddToRes = () => {
    console.log("Item Data:", value); // Debugging: Check what value contains
    if (value.restaurant) {
      // Navigate to the restaurant page and pass the selected food item details
      navigate(`/restaurants/${value.restaurant}`, {
        state: {
          selectedItem: {
            _id: value._id, // Assuming _id is available; adjust if not
            name: value.itemName,
            price: value.price,
            description: value.description || "No description available", // Add if API provides it
          },
        },
      });
    } else {
      console.error("Restaurant ID not found!", value);
    }
  };

  return (
    <div className="bg-white w-80 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <figure>
        {value.foodImage && (
          <img
            src={value.foodImage}
            alt={value.itemName}
            className="w-full h-40 object-cover"
          />
        )}
      </figure>
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{value.itemName || "No Title"}</h2>
        <p className={`text-sm ${value.itemAvailability ? "text-green-600" : "text-red-600"}`}>
          {value.itemAvailability ? "Available" : "Not Available"}
        </p>
        <p className="text-lg font-semibold text-gray-700">₹{value.price}</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={handleAddToRes}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
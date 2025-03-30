import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ value }) {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 w-80 shadow-sm">
      <figure>
        {value.foodImage && (
          <img
            src={value.foodImage}
            alt={value.itemName}
            className="w-full h-20 object-cover"
          />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{value.itemName || "No Title"}</h2>
        <p>{value.itemAvailability ? "Available" : "Not Available"}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/restaurants/${value._id}`)}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

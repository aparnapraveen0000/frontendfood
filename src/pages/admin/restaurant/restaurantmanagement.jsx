import React, { useState } from 'react';
import AddRestaurant from "./addrestaurant.jsx";
import AllRestaurants from "./getall restaurants.jsx";

function RestaurantManagement() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleAddClick = () => setActiveComponent('add');
  const handleAllClick = () => setActiveComponent('all');
  const handleBack = () => setActiveComponent(null);

  return (
    <>
      {/* Navigation Buttons */}
      {activeComponent === null ? (
        <div className="space-y-4 p-4">
          <div className="navbar bg-orange-300 text-black rounded-lg shadow">
            <button className="btn btn-ghost text-xl" onClick={handleAddClick}>
              Add Restaurant
            </button>
          </div>

          <div className="navbar bg-green-300 text-black rounded-lg shadow">
            <button className="btn btn-ghost text-xl" onClick={handleAllClick}>
              All Restaurants
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          {/* Back Button */}
          <button
            className="btn btn-secondary mb-4"
            onClick={handleBack}
          >
            Back to Menu
          </button>

          {/* Render Selected Component */}
          {activeComponent === 'add' && <AddRestaurant />}
          {activeComponent === 'all' && <AllRestaurants />}
        </div>
      )}
    </>
  );
}

export default RestaurantManagement;

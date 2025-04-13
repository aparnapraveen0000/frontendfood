import React, { useState } from 'react';
import AddItem from "./additem.jsx";
import GetAllItems from "./getitem.jsx";

function ItemManagement() {
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
              Add Item
            </button>
          </div>

          <div className="navbar bg-green-300 text-black rounded-lg shadow">
            <button className="btn btn-ghost text-xl" onClick={handleAllClick}>
              All Items
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
          {activeComponent === 'add' && <AddItem />}
          {activeComponent === 'all' && <GetAllItems />}
        </div>
      )}
    </>
  );
}

export default ItemManagement;

import React, { useState } from 'react';
import CreateRestaurant from './createres.jsx';
import EditSellerRestaurant from './geteditdeleteres.jsx';
import SellerMenuPage from './addselleritem.jsx'; // ✅ import the new page

function ResManageSeller() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleAddClick = () => setActiveComponent('add');
  const handleAllClick = () => setActiveComponent('all');
  const handleMenuClick = () => setActiveComponent('menu'); // ✅ new handler

  const handleBack = () => setActiveComponent(null);

  return (
    <>
      {activeComponent === null ? (
        <div className="space-y-4 p-4">
          <div className="navbar bg-orange-300 text-black rounded-lg shadow">
            <button className="btn btn-ghost text-xl" onClick={handleAddClick}>
              Create Restaurant
            </button>
          </div>

          <div className="navbar bg-green-300 text-black rounded-lg shadow">
            <button className="btn btn-ghost text-xl" onClick={handleAllClick}>
              Edit Restaurant
            </button>
          </div>

          {/* ✅ Add Menu Management Option */}
          <div className="navbar bg-yellow-200 text-black rounded-lg shadow">
            <button className="btn btn-ghost text-xl" onClick={handleMenuClick}>
              Manage Menu
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <button className="btn btn-secondary mb-4" onClick={handleBack}>
            Back to Menu
          </button>

          {activeComponent === 'add' && <CreateRestaurant />}
          {activeComponent === 'all' && <EditSellerRestaurant />}
          {activeComponent === 'menu' && <SellerMenuPage />} {/* ✅ New Component */}
        </div>
      )}
    </>
  );
}

export default ResManageSeller;

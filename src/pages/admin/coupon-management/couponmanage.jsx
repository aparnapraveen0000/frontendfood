import React, { useState, useEffect } from 'react';
import CouponCreate from './createcoupon.jsx';
import CouponList from './getcoupon.jsx';
import EditCoupon from './editcoupon.jsx';
import { axiosInstance } from '../../../config/axiosInstance.js';

function CouponManagement() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);

  // Fetch all coupons for Edit dropdown
  useEffect(() => {
    if (activeComponent === 'edit') {
      axiosInstance.get('/coupon/admin/get_all')
        .then(res => setCoupons(res.data.data))
        .catch(err => console.error("Failed to fetch coupons", err));
    }
  }, [activeComponent]);

  const handleCreateClick = () => setActiveComponent('create');
  const handleListClick = () => setActiveComponent('list');
  const handleEditClick = () => setActiveComponent('edit');

  const handleBack = () => {
    setActiveComponent(null);
    setSelectedCoupon(null);
  };

  const handleSelectCoupon = (e) => {
    const couponId = e.target.value;
    const foundCoupon = coupons.find(c => c._id === couponId);
    setSelectedCoupon(foundCoupon);
  };

  return (
    <div className="p-4">
      {activeComponent === null ? (
        <div className="space-y-4">
          <div className="navbar bg-orange-300 text-black rounded-lg shadow">
            <button className="btn btn-ghost text-xl" onClick={handleCreateClick}>
              Create Coupon
            </button>
          </div>
          <div className="navbar bg-green-300 text-black rounded-lg shadow">
            <button className="btn btn-ghost text-xl" onClick={handleListClick}>
              All Coupons
            </button>
          </div>
          <div className="navbar bg-blue-300 text-black rounded-lg shadow">
            <button className="btn btn-ghost text-xl" onClick={handleEditClick}>
              Edit Coupon
            </button>
          </div>
        </div>
      ) : (
        <>
          <button className="btn btn-secondary mb-4" onClick={handleBack}>
            Back to Menu
          </button>

          {activeComponent === 'create' && <CouponCreate />}

          {activeComponent === 'list' && (
            <CouponList onEdit={(coupon) => {
              setSelectedCoupon(coupon);
              setActiveComponent('edit');
            }} />
          )}

          {activeComponent === 'edit' && (
            <>
              {!selectedCoupon ? (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Select a coupon to edit:</label>
                  <select
                    className="select select-bordered w-full"
                    onChange={handleSelectCoupon}
                    defaultValue=""
                  >
                    <option disabled value="">-- Choose Coupon --</option>
                    {coupons.map(coupon => (
                      <option key={coupon._id} value={coupon._id}>
                        {coupon.code} - {coupon.discountValue}%
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <EditCoupon coupon={selectedCoupon} onBack={handleBack} />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CouponManagement;

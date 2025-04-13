import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance.js";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = async () => {
    try {
      const res = await axiosInstance.get("/coupon/admin/get_all");
      setCoupons(res.data.data);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  const handleDelete = async (couponId) => {
    try {
      await axiosInstance.delete(`/coupon/delete/${couponId}`);
      setCoupons(coupons.filter((coupon) => coupon._id !== couponId));
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">All Coupons</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Code</th>
              <th>Discount</th>
              <th>Min Order</th>
              <th>Valid From</th>
              <th>Valid To</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td>{coupon.code}</td>
                <td>{coupon.discountValue}%</td>
                <td>₹{coupon.minOrderAmount}</td>
                <td>{new Date(coupon.validFrom).toLocaleDateString()}</td>
                <td>{new Date(coupon.validTo).toLocaleDateString()}</td>
                <td>{coupon.couponIsActive ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-sm bg-orange-400 hover:bg-orange-500 text-white"
                    onClick={() => handleDelete(coupon._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500">
                  No coupons found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CouponList;

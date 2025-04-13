import React, { useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance.js";

const EditCoupon = ({ coupon, onBack }) => {
  const [formData, setFormData] = useState({
    code: coupon?.code || "",
    discountValue: coupon?.discountValue || "",
    minOrderAmount: coupon?.minOrderAmount || "",
    validFrom: coupon?.validFrom?.split("T")[0] || "",
    validTo: coupon?.validTo?.split("T")[0] || "",
    couponIsActive: coupon?.couponIsActive || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/coupon/update/${coupon._id}`, formData);
      alert("Coupon updated successfully!");
      onBack(); // Go back to menu after update
    } catch (err) {
      console.error("Error updating coupon:", err);
      alert("Failed to update coupon");
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Coupon</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
          placeholder="Coupon Code"
          className="input input-bordered input-sm"
        />
        <input
          type="number"
          name="discountValue"
          value={formData.discountValue}
          onChange={handleChange}
          placeholder="Discount Value (%)"
          className="input input-bordered input-sm"
        />
        <input
          type="number"
          name="minOrderAmount"
          value={formData.minOrderAmount}
          onChange={handleChange}
          placeholder="Minimum Order Amount"
          className="input input-bordered input-sm"
        />
        <input
          type="date"
          name="validFrom"
          value={formData.validFrom}
          onChange={handleChange}
          className="input input-bordered input-sm"
        />
        <input
          type="date"
          name="validTo"
          value={formData.validTo}
          onChange={handleChange}
          className="input input-bordered input-sm"
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="couponIsActive"
            checked={formData.couponIsActive}
            onChange={handleChange}
            className="checkbox"
          />
          Active
        </label>
        <div className="flex justify-between gap-4">
          <button type="submit" className="btn btn-primary input-sm">
            Update Coupon
          </button>
          <button type="button" className="btn btn-secondary input-sm" onClick={onBack}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCoupon;

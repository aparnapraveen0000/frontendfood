import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../config/axiosInstance.js";

const EditCoupon = () => {
  const { id } = useParams(); // Get couponId from route
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    discountValue: "",
    minOrderAmount: "",
    validFrom: "",
    validTo: "",
    couponIsActive: false,
  });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  // Check if ID is available before making the API call
  useEffect(() => {
    if (!id) {
      setError("Coupon ID is missing.");
      setLoading(false);
      return;
    }

    const fetchCoupons = async () => {
      try {
        const res = await axiosInstance.get("/coupon/admin/get_all");
        const coupon = res.data.data.find((coupon) => coupon._id === id);
        if (coupon) {
          setFormData(coupon);
        } else {
          setError("Coupon not found.");
        }
      } catch (err) {
        setError("Failed to fetch coupons. Please try again later.");
        console.error("Error fetching coupons:", err);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchCoupons();
  }, [id]);

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
      await axiosInstance.put(`/coupon/update/${id}`, formData);
      alert("Coupon updated successfully!");
      navigate("/admin/coupon"); // Redirect after update
    } catch (err) {
      console.error("Error updating coupon:", err);
      alert("Failed to update coupon");
    }
  };

  if (loading) return <div>Loading...</div>; // Show loading state while fetching data
  if (error) return <div>{error}</div>; // Display error message

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
          value={formData.validFrom.split("T")[0]} // trim time if ISO string
          onChange={handleChange}
          className="input input-bordered input-sm"
        />
        <input
          type="date"
          name="validTo"
          value={formData.validTo.split("T")[0]}
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
        <button
          type="submit"
          className="btn btn-primary input-sm"
        >
          Update Coupon
        </button>
      </form>
    </div>
  );
};

export default EditCoupon;

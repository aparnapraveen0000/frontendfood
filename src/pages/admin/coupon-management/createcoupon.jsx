import React, { useState } from 'react';
import {axiosInstance} from '../../../config/axiosInstance.js'; // make sure path is correct

const CouponCreate = () => {
  const [form, setForm] = useState({
    code: '',
    discountValue: '',
    minOrderAmount: '',
    validFrom: '',
    validTo: '',
    couponIsActive: true,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/coupon/create', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-base-100 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Create New Coupon</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          value={form.code}
          onChange={handleChange}
          className="input input-bordered input-sm"
          required
        />

        <input
          type="number"
          name="discountValue"
          placeholder="Discount Value (%)"
          value={form.discountValue}
          onChange={handleChange}
          className="input input-bordered input-sm"
          required
        />

        <input
          type="number"
          name="minOrderAmount"
          placeholder="Minimum Order Amount"
          value={form.minOrderAmount}
          onChange={handleChange}
          className="input input-bordered input-sm"
          required
        />

        <label className="block">
          <span className="text-sm">Valid From:</span>
          <input
            type="date"
            name="validFrom"
            value={form.validFrom}
            onChange={handleChange}
            className="input input-bordered input-sm"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm">Valid To:</span>
          <input
            type="date"
            name="validTo"
            value={form.validTo}
            onChange={handleChange}
            className="input input-bordered input-sm"
            required
          />
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="couponIsActive"
            checked={form.couponIsActive}
            onChange={handleChange}
            className="checkbox checkbox-sm"
          />
          <span className="text-sm">Is Active?</span>
        </label>

        <button type="submit" className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white">
          Create Coupon
        </button>
      </form>

      {message && <p className="mt-3 text-sm text-blue-600">{message}</p>}
    </div>
  );
};

export default CouponCreate;

import React, { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance.js"; 

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    profilePic: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axiosInstance.post("/admin/signup", formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card input-sm max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Admin Signup</h2>

          {message && (
            <div className="alert alert-info mt-2 p-2 text-sm">{message}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-sm"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-sm"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile"
              className="input input-sm"
              value={formData.mobile}
              onChange={handleChange}
              required
            />

            <textarea
              name="address"
              placeholder="Address"
              className="textarea textarea-bordered input-sm"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-sm"
              minLength="8"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input input-sm"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="profilePic"
              placeholder="Profile Picture URL (optional)"
              className="input input-sm"
              value={formData.profilePic}
              onChange={handleChange}
            />

            <div className="form-control mt-4">
              <button type="submit" className="btn bg-orange-500 hover:bg-orange-600 text-white btn-sm mt-2">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;

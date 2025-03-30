import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance.js";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    profilePic: ""
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/user/signup", formData);
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label"><span className="label-text">Name</span></label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="input input-bordered" required />
          </div>
          <div className="form-control mt-2">
            <label className="label"><span className="label-text">Email</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="input input-bordered" required />
          </div>
          <div className="form-control mt-2">
            <label className="label"><span className="label-text">Mobile Number</span></label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your mobile number" className="input input-bordered" required />
          </div>
          <div className="form-control mt-2">
            <label className="label"><span className="label-text">Address</span></label>
            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" className="textarea textarea-bordered" required></textarea>
          </div>
          <div className="form-control mt-2">
            <label className="label"><span className="label-text">Password</span></label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" className="input input-bordered" required />
          </div>
          <div className="form-control mt-2">
            <label className="label"><span className="label-text">Confirm Password</span></label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="input input-bordered" required />
          </div>
          <div className="form-control mt-2">
            <label className="label"><span className="label-text">Profile Picture URL (optional)</span></label>
            <input type="text" name="profilePic" value={formData.profilePic} onChange={handleChange} placeholder="Enter profile picture URL" className="input input-bordered" />
          </div>
          <div className="form-control mt-4">
            <button type="submit" className="btn btn-primary w-60%" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
          </div>
        </form>
        <p className="text-sm text-center mt-2">Already have an account? <Link to="/login" className="text-blue-500">Login here</Link></p>
      </div>
    </div>
  );
};

export default SignUpPage;

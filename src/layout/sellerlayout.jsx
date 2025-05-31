import React, { useEffect, useState } from 'react';
import Header from '../components/user/Header.jsx';
import Footer from '../components/user/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { SellerHeader } from '../components/seller/sellerhead.jsx'; // Seller public header
import { ProtectSellerHead } from "../components/seller/protectsellerhead.jsx"; // Protected seller header
import { axiosInstance } from '../config/axiosInstance'; // Adjust path if needed

function Sellerlayout() {
  const [isSellerAuth, setIsSellerAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSellerAuth = async () => {
      try {
        const response = await axiosInstance.get('/seller/check'); // Make sure this hits your backend
        if (response.data.message === "seller autherized") {
          setIsSellerAuth(true);
        } else {
          setIsSellerAuth(false);
        }
      } catch (error) {
        console.error("Seller auth check failed:", error.response?.data || error.message);
        setIsSellerAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkSellerAuth();
  }, []);

  if (loading) return <div>Loading...</div>; // Optional: Replace with a spinner or loader

  return (
    <div>
      {isSellerAuth ? <ProtectSellerHead /> : <SellerHeader />} {/* Show based on auth */}

      <div className="min-h-100">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Sellerlayout;

import React, { useEffect, useState } from 'react';
import { ProtectAdminHead } from "../components/admin/protectadminhead.jsx";
import { AdminHeader } from "../components/admin/adminhead.jsx";
import Footer from '../components/user/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance'; // Adjust path if needed

function Adminlayout() {
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const response = await axiosInstance.get('/admin/check'); // endpoint to verify admin
        if (response.data.message === "admin autherized") {
          setIsAdminAuth(true);
        } else {
          setIsAdminAuth(false);
        }
      } catch (error) {
        console.error("Admin auth check failed:", error.response?.data || error.message);
        setIsAdminAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAuth();
  }, []);

  if (loading) return <div>Loading...</div>; // Optional spinner

  return (
    <div>
      {isAdminAuth ? <ProtectAdminHead /> : <AdminHeader />}

      <div className='min-h-100'>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Adminlayout;

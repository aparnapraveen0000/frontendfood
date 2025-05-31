import React, { useEffect, useState } from 'react';
import Header from '../components/user/Header.jsx';
import Footer from '../components/user/Footer.jsx';
import { Outlet } from 'react-router-dom';
import { UserHeader } from '../components/user/UserHeader.jsx';
import { axiosInstance } from '../config/axiosInstance'; // Update path if needed

function Rootlayout() {
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await axiosInstance.get('/user/check'); // already has baseURL + withCredentials
        if (response.data.success) {
          setIsUserAuth(true);
        } else {
          setIsUserAuth(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error.response?.data || error.message);
        setIsUserAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkUserAuth();
  }, []);

  if (loading) return <div>Loading...</div>; // Optional spinner/loading screen

  return (
    <div>
      {isUserAuth ? <UserHeader /> : <Header />}

      <div className="min-h-100">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Rootlayout;

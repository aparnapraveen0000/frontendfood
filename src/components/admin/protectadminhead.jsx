import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../shared/DarkMode";
import { CircleUserRound } from "lucide-react";

export const ProtectAdminHead = () => {
  return (
    <div className="flex justify-between items-center p-6 h-24 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Logo */}
      <img
        className="w-25 h-20 object-cover"
        src="https://i.pinimg.com/474x/46/c2/bc/46c2bcfe971bd6ef6bb5e989ec2c7e12.jpg"
        alt="logo"
      />

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-orange-500 font-serif">
        Yummy Food
      </h1>

      {/* Navigation */}
      <nav className="flex gap-8 text-lg font-medium">
       
        <Link to={"admin/dashboard"} className="hover:text-orange-500 transition duration-300">
          Dashboard
        </Link>
        <Link to={"admin/couponmanagement"} className="hover:text-orange-500 transition duration-300">
          coupon
        </Link>
        <Link to={"admin/itemmanagement"} className="hover:text-orange-500 transition duration-300">
          items
        </Link>
        <Link to={"admin/ordermanagement"} className="hover:text-orange-500 transition duration-300">
          order
        </Link>
        <Link to={"admin/restaurant"} className="hover:text-orange-500 transition duration-300">
          Restaurants
        </Link>
        <Link to={"admin/usermanagement"} className="hover:text-orange-500 transition duration-300">
          user
        </Link>
        <Link to={"admin/login"} className="hover:text-orange-500 transition duration-300">
          login
        </Link>
      </nav>

      {/* Icons & Dark Mode */}
      <div className="flex gap-6 items-center">
        <DarkMode />
        <Link to={"admin/profile"} className="hover:text-orange-500 transition duration-300">
          <CircleUserRound className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

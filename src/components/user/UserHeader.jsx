import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, CircleUserRound } from "lucide-react";
import { DarkMode } from "../shared/DarkMode";

export const UserHeader = () => {
  return (
    <div className="flex justify-between items-center p-6 h-24 shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Logo */}
      <img
        className="w-25 h-20  object-cover"
        src="https://i.pinimg.com/474x/46/c2/bc/46c2bcfe971bd6ef6bb5e989ec2c7e12.jpg"
        alt="logo"
      />

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-orange-500 font-serif">
        Yummy Food
      </h1>

      {/* Navigation */}
      <nav className="flex gap-8 text-lg font-medium">
        <Link to={"/"} className="hover:text-orange-500 transition duration-300">
          Home
        </Link>
        <Link to={"/about"} className="hover:text-orange-500 transition duration-300">
          About
        </Link>
        <Link to={"/login"} className="hover:text-orange-500 transition duration-300">
          Login
        </Link>
        <Link to={"/order"} className="hover:text-orange-500 transition duration-300">
          My Orders
        </Link>
      </nav>

      {/* Icons & Dark Mode */}
      <div className="flex gap-6 items-center">
        <DarkMode />
        <Link to={"/cart"} className="hover:text-orange-500 transition duration-300">
          <ShoppingCart className="cursor-pointer w-6 h-6" />
        </Link>
        <Link to={"/profile"} className="hover:text-orange-500 transition duration-300">
          <CircleUserRound className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
};

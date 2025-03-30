import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { DarkMode } from "../shared/DarkMode";


export const UserHeader=()=>{
    return(
        <div className="flex justify-between items-center p-14 h-20 shadow-2xl">
            <img  className="w-24 h-24 "src="https://i.pinimg.com/474x/46/c2/bc/46c2bcfe971bd6ef6bb5e989ec2c7e12.jpg" alt="logo"/>
             <nav className="flex gap-16 items-center font-semibold">
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About</Link>
                <Link to={"/login"}>login</Link>
                <Link to={"/wish"}>Wish</Link>
             </nav>

             <div className="flex gap-14 items-center">
                <DarkMode/>
                <Link to={"/cart"}>
                <ShoppingCart className="cursor-pointer" />
                </Link>
                <Link to={"/"}>
                <CircleUserRound />
                </Link>

           </div>

        </div>
    )
}
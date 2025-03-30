import React from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance } from "../../config/axiosInstance.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";  
import { saveUser, clearUser } from "../../redux/userSlice";

export const Login = ({ role }) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userConfig = {
        user: {
            loginAPI: "/user/login",
            profileRoute: "/user/profile",
            signupRoute: "/signup",
        },
        mentor: {
            loginAPI: "/mentor/login",
            profileRoute: "/mentor/profile",
            signupRoute: "/mentor/signup",
        }
    };

    const currentRole = userConfig[role] || userConfig.user;

    const onSubmit = async (data) => {
        if (!data.email || !data.password) {
            toast.error("All fields are required.");
            return;
        }

        try {
            const response = await axiosInstance.post(currentRole.loginAPI, {
                email: data.email,
                password: data.password
            });

            console.log("API Response:", response);
            dispatch(saveUser(response?.data?.data));
            toast.success("Login successful!");
            navigate(currentRole.profileRoute);
        } catch (error) {
            dispatch(clearUser());
            console.error("Login error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Access your account and explore the features available for you.</p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                {...register("email", { required: true })} 
                                className="input input-bordered" 
                                required 
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                {...register("password", { required: true })} 
                                className="input input-bordered" 
                                required 
                            />
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <label className="label">
                                <Link to={currentRole.signupRoute} className="label-text-alt link link-hover">
                                    New user? Sign up
                                </Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

import React from "react";
import { useNavigate } from "react-router-dom";
export const ErrorPage=({role})=>{
    const navigate=useNavigate()

    return(
        <div>
            <h1>404-page not found!</h1>
            <button className="btn btn-active" onClick={()=>navigate("/")}>
                Navigate to Home
            </button>
        </div>
    )
}
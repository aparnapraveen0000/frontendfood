import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Payment Failed!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Oops! Something went wrong during the payment process.
      </p>

      <button
        onClick={() => navigate("/cart")}
        className="btn btn-error px-6 py-2 text-white"
      >
        Back to Cart
      </button>
    </div>
  );
};

export default PaymentFailed;

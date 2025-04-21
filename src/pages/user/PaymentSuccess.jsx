import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 p-4 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <button
        onClick={() => navigate("/order")}
        className="btn btn-success px-6 py-2 text-white"
      >
        Go to My Orders
      </button>
    </div>
  );
};

export default PaymentSuccess;


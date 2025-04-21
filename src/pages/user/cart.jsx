import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [coupons, setCoupons] = useState([]);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");

  useEffect(() => {
    fetchCartItems();
    fetchCoupons();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axiosInstance.get("/cart/get");
      setCartItems(response.data.cart.items || []);
      const cartTotal = response.data.cart.totalPrice || 0;
      setTotalPrice(cartTotal);
      setDiscountedTotal(cartTotal);
    } catch (error) {
      console.error("Error fetching cart:", error.response?.data || error.message);
    }
  };

  const fetchCoupons = async () => {
    try {
      const response = await axiosInstance.get("/coupon/get_all");
      setCoupons(response.data.data || []);
    } catch (error) {
      console.error("Error fetching coupons:", error.response?.data || error.message);
    }
  };

  const handleApplyCoupon = async (selectedCode) => {
    try {
      const response = await axiosInstance.post("/coupon/apply", {
        code: selectedCode,
        cartTotal: totalPrice,
      });

      setDiscountedTotal(response.data.discountedTotal);
      setDiscountMessage(`Applied coupon "${selectedCode}": ${response.data.message}`);
    } catch (error) {
      setDiscountMessage(error.response?.data?.message || "Error applying coupon");
    }
  };

  const handleDeleteItem = async (foodId) => {
    try {
      await axiosInstance.put("/cart/remove", { foodId });
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting item:", error.response?.data || error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const cartData = {
        cartItems: cartItems.map(item => ({
          foodId: item.foodId._id,
          price: item.price,
          quantity: item.quantity,
        })),
        totalPrice: discountedTotal,
      };

      const response = await axiosInstance.post("/payment/create-checkout-session", cartData);
      const { sessionId } = response.data;

      if (sessionId) {
        const result = await stripe.redirectToCheckout({ sessionId });

        if (result.error) {
          console.error("Stripe error:", result.error.message);
        }
      } else {
        console.error("No sessionId returned from server");
      }

    } catch (error) {
      console.error("Checkout error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      {cartItems.length > 0 ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Your Cart</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.foodId?._id}
                  className="flex items-center justify-between p-4 bg-base-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">
                      {item.foodId.itemName || "Item removed"}
                    </p>
                    <p className="text-sm text-orange-500">
                      {item.quantity} x ₹{item.price} = ₹{item.quantity * item.price}
                    </p>
                  </div>

                  <button
                    className="btn btn-error btn-circle btn-sm"
                    onClick={() => handleDeleteItem(item.foodId?._id)}
                    disabled={!item.foodId}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1m6-1a1 1 0 011 1v1m-8 3h8"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            {/* Coupon Section */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Available Coupons</h3>
              <ul className="space-y-2">
                {coupons.map((coupon) => (
                  <li key={coupon._id} className="flex items-center justify-between bg-base-200 p-3 rounded-lg">
                    <div>
                      <span className="font-bold">{coupon.code}</span> - {coupon.discountValue}% off
                    </div>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleApplyCoupon(coupon.code)}
                    >
                      Apply
                    </button>
                  </li>
                ))}
              </ul>
              {discountMessage && (
                <p className="text-sm mt-2 text-green-600">{discountMessage}</p>
              )}
            </div>

            <div className="divider"></div>

            <div className="flex flex-col gap-1 mb-4">
              <p className="text-base font-medium text-gray-600">Original Price: ₹{totalPrice}</p>
              <p className="text-lg font-bold text-yellow-600">
                Price After Coupon: ₹{discountedTotal}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <button className="btn btn-primary" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>Your cart is empty</span>
        </div>
      )}
    </div>
  );
};

export default Cart;

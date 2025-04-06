import React from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex items-center justify-center min-h-screen w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://yt3.googleusercontent.com/ytc/AIdro_mOHzQgfAXyWESzOjaNoKqNYTuZxMEciTSyvOqYBxhENrs=s900-c-k-c0x00ffffff-no-rj)",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white p-6 md:p-10 max-w-2xl">
        <h1 className="mb-5 text-5xl font-extrabold tracking-wide">
          Yummy Food 🍽️
        </h1>
        <p className="mb-5 text-lg leading-relaxed">
          Welcome to <span className="font-semibold text-yellow-300">Yummy Food</span> – your ultimate food delivery partner! 
          We connect you with the best restaurants in your area, bringing delicious meals 
          right to your doorstep. With a seamless ordering experience and lightning-fast delivery, 
          we ensure that you enjoy your favorite dishes anytime, anywhere.
        </p>
        <p className="mb-5 text-lg leading-relaxed">
          Our mission is to provide a fast, reliable, and convenient food delivery service that satisfies 
          your cravings with just a few taps. We aim to enhance your dining experience by offering a diverse 
          range of cuisines from trusted restaurants while ensuring top-notch service.
        </p>
        
        {/* Home Button */}
        <button 
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 hover:bg-yellow-500"
          onClick={() => navigate("/")}
        >
          Go to Home  
        </button>
      </div>
    </div>
  );
}

export default About; 
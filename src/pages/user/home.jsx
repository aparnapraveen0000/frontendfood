import React from 'react';
import { Menu } from './menu';

function Home() {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        <div className="carousel w-full">
          {[
            "https://static.vecteezy.com/system/resources/previews/054/364/336/non_2x/delicious-fast-food-burgers-and-fries-with-dramatic-sky-free-photo.jpg",
            "https://static.vecteezy.com/system/resources/previews/058/276/707/non_2x/delicious-slice-of-pizza-topped-with-olives-pepperoni-and-fresh-basil-with-melting-cheese-photo.jpeg",
            "https://static.vecteezy.com/system/resources/previews/056/357/026/non_2x/fresh-fruit-smoothie-with-splashes-garnished-with-mint-on-a-vibrant-background-photo.jpeg",
            "https://static.vecteezy.com/system/resources/previews/051/735/856/non_2x/panorama-of-a-chicken-wings-photo.jpg",
          ].map((src, index) => (
            <div id={`item${index + 1}`} key={index} className="carousel-item w-full">
              <img src={src} className="w-full h-[400px] object-cover rounded-lg shadow-lg" alt="Food" />
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center gap-3 py-4">
        {[1, 2, 3, 4].map((num) => (
          <a key={num} href={`#item${num}`} className="px-3 py-1 bg-gray-800 text-white text-sm rounded-lg transition-all hover:bg-red-500">
            {num}
          </a>
        ))}
      </div>
      
      <h1 className="text-center text-4xl font-bold text-gray-900 my-6">Food Items</h1>
      <div className="flex justify-center gap-10 flex-wrap px-4">
        <Menu />
      </div>
    </>
  );
}

export default Home;
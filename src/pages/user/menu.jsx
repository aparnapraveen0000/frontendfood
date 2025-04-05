import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import Card from "../../components/user/card.jsx";
import Cardskeleton from '../../components/user/skeleton.jsx';

export const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axiosInstance.get("/menu/get_all");
                console.log("Menu API Response:", response.data); // Debugging
                setMenuItems(response?.data?.data || []); // Default to empty array if no data
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching menu:", error);
                setError(error.message || "Failed to load menu items");
                setIsLoading(false); // Stop loading even on error
            }
        };

        fetchMenu();
    }, []);

    if (isLoading) {
        return <Cardskeleton />;
    }

    if (error) {
        return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {menuItems.length > 0 ? (
                menuItems.map((item) => (
                    <Card
                    key={item._id}
                    value={{
                      _id: item._id, 
                      itemName: item.itemName,
                      price: item.price,
                      foodImage: item.foodImage,
                      itemAvailability: item.itemAvailability,
                      restaurant: item.restaurant,
                      description: item.description,
                    }}
                  />
                  
                ))
            ) : (
                <p className="text-center text-gray-500 col-span-full">No menu items available.</p>
            )}
        </div>
    );
};
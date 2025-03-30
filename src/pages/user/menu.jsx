import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import Card from "../../components/user/card.jsx";
import Cardskeleton from '../../components/user/skeleton.jsx';

export const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const[isLoading,setIsLoading]=useState(true)
    const[error,setError]=useState(null)

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axiosInstance.get("/menu/get_all");
            
                setMenuItems(response?.data?.data)
                console.log(response.data)
                setIsLoading(false)
            
            } catch (error) {
                console.error("Error fetching menu:", error);
               setError(error)
            } 
        }

        fetchMenu()
    }, [])
    if(isLoading){
        return <Cardskeleton/>
    }

    return (
        <>
            {menuItems?.map((items)=>{
                return(
                <Card 
                key={items._id}
                 value={items}
                 />
               
            )
            })}
             
       </>     
        
    );
};

import axios from 'axios';

const API_URL=import.meta.env.VITE_API_URL||"https://foodbackend-nine.vercel.app"


 export const axiosInstance=axios.create({baseURL:`${API_URL}/api`, withCredentials: true})
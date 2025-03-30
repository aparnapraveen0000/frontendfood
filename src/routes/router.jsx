import {createBrowserRouter} from "react-router-dom";
import About from "../pages/user/about.jsx";
import {Login} from "../pages/shared/loginPage.jsx";
import Home from "../pages/user/home.jsx";
import Profile from "../pages/user/profile.jsx";
import Cart from "../pages/user/cart.jsx";
import Payment from "../pages/user/payment.jsx"
import Rootlayout from "../layout/RootLayout.jsx";
import ProtectRoutes from "./ProtectRoutes.jsx"
import { ErrorPage } from "../pages/shared/errorpage.jsx";
import { Menu } from "../pages/user/menu.jsx";
import RestaurantsList from "../pages/user/RestaurantsList.jsx"
import SignUpPage from "../pages/user/signupPage.jsx";

 export const router = createBrowserRouter([

  {

 path:"",
 element:<Rootlayout/>,
 errorElement:<ErrorPage/>,
 children:[
  {
    path: "/signup",
    element: <div><SignUpPage/></div>,
  },
    {
      path: "/",
      element: <div><Home/></div>,
    },
    {
      path: "/about",
      element: <div><About/></div>,
    },
    {
      path: "/login",
      element: <div><Login/></div>,
    },
    
    {
      path: "/menu",
      element: <div><Menu/></div>,
    },
    {
      path: "/restaurants/:itemId",
      element: <div>< RestaurantsList/></div>,
    },
   


    {
      element:<ProtectRoutes/>,
      children:[
    
      {
        path: "/profile",
        element: <div>< Profile/></div>,
      },
      {
        path: "/payment",
        element: <div><Payment/></div>,
      },
      {
        path: "/cart",
        element: <div><Cart/></div>,
      },
     
      

     ]
    }

  ]
  
  }

  ]);
import {createBrowserRouter} from "react-router-dom";
import About from "../pages/user/about.jsx";
import {Login} from "../pages/shared/loginPage.jsx";
import Home from "../pages/user/home.jsx";
import Profile from "../pages/user/profile.jsx";
import Cart from "../pages/user/cart.jsx";
// import Payment from "../pages/user/payment.jsx"
import Rootlayout from "../layout/RootLayout.jsx";
import ProtectRoutes from "./ProtectRoutes.jsx"
import ProtectAdminRoutes from "./protectAdminRoutes.jsx";
import { ErrorPage } from "../pages/shared/errorpage.jsx";
import { Menu } from "../pages/user/menu.jsx";
import RestaurantsList from "../pages/user/RestaurantsList.jsx"
import SignUpPage from "../pages/user/signupPage.jsx";
import Order from "../pages/user/order.jsx";
import AdminDashboard from "../pages/admin/admindashboard.jsx";
import Adminprofile from "../pages/admin/adminprofile.jsx";
import AdminSignup from "../pages/admin/adminsignup.jsx";
import Adminlayout from "../layout/adminlayout.jsx";


 export const router = createBrowserRouter([

  {

 path:"",
 element:<Rootlayout/>,
 errorElement:<ErrorPage/>,
 children:[
    {
    path: "/signup",
    element: <SignUpPage/>
    },
    {
    path: "/login",
    element: <Login/>
    },
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path: "/menu",
      element: <Menu/>
    },
    {
      path: "/restaurants/:restaurantId",
      element: < RestaurantsList/>
    },
    
    {
      element:<ProtectRoutes/>,
      children:[
    
      {
        path: "/profile",
        element: <Profile/>
      },
      // {
      //   path: "/payment",
      //   element: <Payment/>
      // },
      {
        path: "/cart",
        element:<Cart/>
      },
      {
        path: "/order",
        element:<Order/>
      },
     
     ]
    }
    

  ]
  
  },
  {
    path:"",
    element:<Adminlayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"admin/signup",
        element: <AdminSignup/>
      },
      {
        path:"admin/login",
        element: <Login role="admin" />
      },
      {
        path:"admin/dashboard",
       element: <AdminDashboard/>
      },

      {
             element: <ProtectAdminRoutes/>,
             children: [
             
              {
                path:"admin/profile",
                element: <Adminprofile/>
              },
              
              
              
            ]
        }

    ]

  }

  ]);
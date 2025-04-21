import {createBrowserRouter} from "react-router-dom";
import About from "../pages/user/about.jsx";
import {Login} from "../pages/shared/loginPage.jsx";
import Home from "../pages/user/home.jsx";
import Profile from "../pages/user/profile.jsx";
import Cart from "../pages/user/cart.jsx";

import Rootlayout from "../layout/RootLayout.jsx";
import ProtectRoutes from "./ProtectRoutes.jsx"
import ProtectAdminRoutes from "./protectAdminRoutes.jsx";
import { ErrorPage } from "../pages/shared/errorpage.jsx";
import { Menu } from "../pages/user/menu.jsx";
import RestaurantsList from "../pages/user/RestaurantsList.jsx"
import SignUpPage from "../pages/user/signupPage.jsx";
import  UserOrders from "../pages/user/order.jsx";
import AdminDashboard from "../pages/admin/admindashboard.jsx";
import Adminprofile from "../pages/admin/adminprofile.jsx";
import AdminSignup from "../pages/admin/adminsignup.jsx";
import Adminlayout from "../layout/adminlayout.jsx";
import SellerSignup from "../pages/seller/sellersignup.jsx";
import SellerDashboard from "../pages/seller/sellerdashboard.jsx";
import SellerProfile from "../pages/seller/sellerprofile.jsx";
import Sellerlayout from "../layout/sellerlayout.jsx";
import ProtectSellerRoutes from "./protectSellerRoutes.jsx";
import RestaurantManagement from "../pages/admin/restaurant/restaurantmanagement.jsx";
import UserManagement from '../pages/admin/usermanage/usermanagement.jsx';
import ItemManagement from "../pages/admin/itemmanagement/itemmanagement.jsx";
import OrdersPage from "../pages/admin/ordermanagement/ordermanagement.jsx";
import CouponManagement from "../pages/admin/coupon-management/couponmanage.jsx";
import ResManageSeller from "../pages/seller/restaurantmanageseller/resmanageseller.jsx";
import PaymentSuccess from "../pages/user/PaymentSuccess.jsx";
import PaymentFailed from "../pages/user/PaymentFailed.jsx";

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
       {
        path: "/cart",
        element:<Cart/>
      },
      {
        path:"/success",
        element:<PaymentSuccess />
      },
      {
       path:"/cancel",
       element:<PaymentFailed />
      },
      {
        path: "/order",
        element:<UserOrders/>
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
              {
                path:"admin/restaurant",
                element: <RestaurantManagement/>
              },
              {
                path:"admin/usermanagement",
                element: <UserManagement/>
              },
              {
                path:"admin/itemmanagement",
                element: <ItemManagement/>
              },
              {
                path:"admin/ordermanagement",
                element: <OrdersPage/>
              },
              {
                path:"admin/couponmanagement",
                element: <CouponManagement/>
              },
              

              
               ]
        }

    ]

  },
  {
    
    path:"",
    element:<Sellerlayout/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"seller/signup",
        element: <SellerSignup/>
      },
      {
        path:"seller/login",
        element: <Login role="seller"/>
      },
      {
        path:"seller/dashboard",
       element: <SellerDashboard/>
      }, 
      {
        element: <ProtectSellerRoutes/>,
        children: [
        
         {
           path:"seller/profile",
           element: <SellerProfile/>
         },
         {
          path:"seller/resseller",
          element:<ResManageSeller/>
         },
         
        
        
        
        ],
         
         
         
         
       
     }
    ]
  }

  ]);
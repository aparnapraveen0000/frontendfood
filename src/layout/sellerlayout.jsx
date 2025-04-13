import React, { useState } from 'react'
import { ProtectSellerHead} from "../components/seller/protectsellerhead.jsx"
import Footer from '../components/user/Footer.jsx'
import { Outlet } from 'react-router-dom'
import{SellerHeader} from "../components/seller/sellerhead.jsx"

function Sellerlayout() {
  const [isSellerAuth,setIsSellerAuth]=useState(true)
  return (
    <div>
      
     {isSellerAuth ? < ProtectSellerHead/> : <SellerHeader/>}

     <div className='min-h-100'>
     <Outlet/>
      </div> 

    <Footer/>

    </div>
  )
}

export default Sellerlayout

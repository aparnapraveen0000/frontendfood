
import React, { useState,useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectSellerRoutes() {
  const [isSellerAuth,setIsSellerAuth]=useState(true)

  let navigate=useNavigate()
  useEffect(()=>{
    if(!isSellerAuth){
       navigate("/login")
   }
  },[])
 
  return <Outlet /> 
}

export default ProtectSellerRoutes

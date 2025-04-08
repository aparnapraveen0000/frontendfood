
import React, { useState,useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectAdminRoutes() {
  const [isAdminAuth,setIsAdminAuth]=useState(true)

  let navigate=useNavigate()
  useEffect(()=>{
    if(!isAdminAuth){
       navigate("/login")
   }
  },[])
 
  return <Outlet /> 
}

export default ProtectAdminRoutes

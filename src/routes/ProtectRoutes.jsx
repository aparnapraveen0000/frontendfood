import React, { useState,useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function ProtectRoutes() {
  const [isUserAuth,setIsUserAuth]=useState(false)

  let navigate=useNavigate()
  useEffect(()=>{
    if(!isUserAuth){
       navigate("/login")
   }
  },[])
 
  return <Outlet /> 
    
  
}

export default ProtectRoutes

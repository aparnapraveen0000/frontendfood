import React, { useState } from 'react'
import {ProtectAdminHead} from "../components/admin/protectadminhead.jsx"
import Footer from '../components/user/Footer.jsx'
import { Outlet } from 'react-router-dom'
import{AdminHeader} from "../components/admin/adminhead.jsx"

function Adminlayout() {
  const [isAdminAuth,setIsAdminAuth]=useState(true)
  return (
    <div>
      
     {isAdminAuth ? <ProtectAdminHead/> : <AdminHeader/>}

     <div className='min-h-100'>
     <Outlet/>
      </div> 

    <Footer/>

    </div>
  )
}

export default Adminlayout

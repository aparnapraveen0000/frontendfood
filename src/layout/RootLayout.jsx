import React, { useState } from 'react'
import Header from '../components/user/Header.jsx'
import Footer from '../components/user/Footer.jsx'
import { Outlet } from 'react-router-dom'
import {UserHeader} from '../components/user/UserHeader.jsx';


function Rootlayout() {
  const [isUserAuth,setIsUserAuth]=useState(true)
  return (
    <div>
      
     {isUserAuth ? <UserHeader/> : <Header/>}

     <div className='min-h-100'>
     <Outlet/>
      </div> 

    <Footer/>

    </div>
  )
}

export default Rootlayout

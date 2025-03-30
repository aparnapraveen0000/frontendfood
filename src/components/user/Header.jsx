import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { DarkMode } from '../shared/DarkMode'
export const Header=() =>{
    const navigate=useNavigate()

  return (
    
    <div className='flex justify-between items-center p-14 h-20 shadow-2xl'>
      <div>
     <img  className="w-40 h-40 "src="https://i.pinimg.com/474x/46/c2/bc/46c2bcfe971bd6ef6bb5e989ec2c7e12.jpg" alt="logo" />
      </div>
      <div>
        <h1 className='text-4xl font-bold flex justify-center'>Yummy Food</h1>
      </div>
      <div className='flex justify-center items-center gap-16'>
        <nav>
            <ul className='flex justify-center items-center gap-10 text-md'>
                <Link to={"/"}>
                {" "}
                <li>Home</li>{" "}
                </Link>

                <Link to={"/about"}>
                {" "}
                <li>About</li>{" "}
                </Link>

                <Link to={"/login"}>
                {" "}
                <li>Login</li>{" "}
                </Link>

            </ul>
        </nav>
        <div className='flex justify-center gap-3'>
          <DarkMode/>
            <button className='btn btn-active'>search</button>
        </div>
      </div>
    </div>
  )
}

export default Header

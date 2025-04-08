import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from '../shared/DarkMode';

export const AdminHeader = () => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-between items-center p-6 h-20 bg-white shadow-lg dark:bg-gray-900'>
      {/* Logo Section */}
      <div>
        <img className='w-25 h-20 object-cover' src='https://i.pinimg.com/474x/46/c2/bc/46c2bcfe971bd6ef6bb5e989ec2c7e12.jpg' alt='logo' />
      </div>
      
      {/* Title Section */}
      <div>
        <h1 className='text-4xl font-extrabold text-orange-500 font-serif'>Yummy Food</h1>
      </div>
      
      {/* Navigation and Controls */}
      <div className='flex items-center gap-10'>
        <nav>
          <ul className='flex gap-6 text-lg font-medium text-gray-700 dark:text-gray-300'>
          <Link to={"admin/signup"} className='hover:text-orange-500 transition'>SignUp</Link>
          <Link to={"admin/login"} className='hover:text-orange-500 transition'>Login</Link>
            <Link to={'/'} className='hover:text-orange-500 transition'>Home</Link>
            <Link to={'/about'} className='hover:text-orange-500 transition'>About</Link>
            
          </ul>
        </nav>
        
        <div className='flex items-center gap-4'>
          <DarkMode />
          <button className='px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600 transition-all'>
            search
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;

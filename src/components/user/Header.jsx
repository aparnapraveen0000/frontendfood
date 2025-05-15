import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DarkMode } from '../shared/DarkMode';

export const Header = () => {
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
          <Link to={'/signup'} className='hover:text-orange-500 transition'>SignUp</Link>
          <Link to={'/login'} className='hover:text-orange-500 transition'>Login</Link>
            <Link to={'/'} className='hover:text-orange-500 transition'>Home</Link>
            <Link to={'/about'} className='hover:text-orange-500 transition'>About</Link>
            
          </ul>
        </nav>
        
        <div className='flex items-center gap-4'>
          <DarkMode />
          
        </div>
      </div>
    </div>
  );
};

export default Header;

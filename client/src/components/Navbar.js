import React from 'react';
import logo from '../assets/images/Logo2.png';
import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const menuItems = isLoggedIn
    ? [{ title: 'Products', link: '/' }, { title: 'Logout', onClick: onLogout }]
    : [
        { title: 'Products', link: '/' },
        { title: 'Register', link: '/register' },
        { title: 'Login', link: '/login' },
      ];

  return (
    <div className='bg-[#04003F] text-[#D9D9D9] py-4'>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="SkillSail Logo" className="h-16 w-auto mr-2" />
          </Link>
        </div>
        <ul className="flex space-x-4 font-semibold text-base">
          {menuItems.map((item, index) => (
            <li key={index} className="p-4 flex items-center">
              {item.link ? (
                <Link to={item.link} className="ml-2">
                  {item.title}
                </Link>
              ) : (
                <span className="ml-2" onClick={item.onClick}>
                  {item.title}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

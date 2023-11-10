import React from 'react';
import logo from '../assets/images/Logo2.png';
import {AiOutlineUser} from 'react-icons/ai';
import { IoMdArrowDropdown } from 'react-icons/io';
import {FaHistory} from 'react-icons/fa';
import {MdNotificationsActive} from 'react-icons/md';
const Navbar = () => {
  const menuItems = [
    { icon: <FaHistory />, title: 'History' },
    { icon: <MdNotificationsActive />, title: 'Notification' },
    { icon: <AiOutlineUser />, title: 'Me', hasDropdown: true }, 
  ];

  return (
    <div className='bg-[#04003F] text-[#D9D9D9] py-4'>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="SkillSail Logo" className="h-12 w-auto mr-2" /> 
        </div>
        <ul className="flex space-x-4 font-semibold text-base">
          {menuItems.map((item, index) => (
            <li key={index} className="p-4 flex items-center">
              {item.icon}
              <span className="ml-2">{item.title}</span>
              {item.hasDropdown && <IoMdArrowDropdown  className="ml-1" />} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
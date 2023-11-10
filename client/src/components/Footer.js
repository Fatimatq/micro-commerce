import React from 'react';
import { FaSquareFacebook } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';
import { FaSquareTwitter } from 'react-icons/fa6';
import { RiInstagramFill } from 'react-icons/ri';

const Footer = () => {
  const menuItems = [
    { icon: <FaSquareTwitter />, title: 'Twitter' },
    { icon: <RiInstagramFill />, title: 'Instagram' },
    { icon: <FaSquareFacebook />, title: 'Facebook' },
    { icon: <IoLogoYoutube />, title: 'YouTube' },
  ];

  return (
    <footer className="bg-[#04003F] text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#04003F] py-7">
        <h1
          className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5"
        >
          <span className="text-teal-400">MCommerce,</span> {' '}
          Votre shopping à tout instant!
        </h1>
        <div>
          <input
            type="text"
            placeholder="Enter your email address"
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button
            className="bg-teal-400 hover:bg-teal-500 duration-300 px-5 py-2.5 font-[Poppins] rounded-md text-[#D9D9D9] md:w-auto w-full"
          >
            Get In touch with Us
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span className="col-span-2">© 2023 MCommerce. All rights reserved.</span>
        <ul className="flex font-[Poppins] font-semibold text-base">
          {menuItems.map((item, index) => (
            <li key={index} className="p-2 flex items-center">
              {item.icon}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
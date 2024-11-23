import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/images/logo1.png';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto p-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-12">
          {/* Branding */}
          <div className="text-center lg:text-left">
            <img src={logo} alt="Logo" className="  h-16 w-auto mx-auto lg:mx-0 " />
            <p className="mt-2 text-sm">
              Delivering innovative solutions 
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-center lg:text-left">
            <a href="#" className="hover:text-white text-sm">
              About Us
            </a>
            <a href="#" className="hover:text-white text-sm">
              Services
            </a>
            
            <a href="#" className="hover:text-white text-sm">
              Blog
            </a>
            <a href="#" className="hover:text-white text-sm">
              Contact
            </a>
            <a href="#" className="hover:text-white text-sm">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white text-sm">
              Terms of Service
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 justify-center lg:justify-start">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center text-center space-y-2">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ApnaStore. All Rights Reserved.
          </p>
          <p className="text-sm">
            Designed with ❤️ by <a href="#" className="hover:text-white">Ansul Pal</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

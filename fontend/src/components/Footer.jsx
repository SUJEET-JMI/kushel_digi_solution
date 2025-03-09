import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram,FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-10">
      <div className="container mx-auto px-6">
        {/* Flex container for layout */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          
          {/* Logo & Branding */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">CRUD WEB APPLICATION</h1>
            <p className="text-gray-400 text-sm">SEE PRODUCT,BUY PRODUCT</p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-gray-400">
            <a href="#" className="hover:text-white">Home</a>
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaWhatsapp size={20} /></a>

          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 text-sm mt-4">
          © {new Date().getFullYear()} SUJEET KUMAR. ALL RIGHTS RESERVED..
        </div>
      </div>
    </footer>
  )
}

export default Footer

import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'; // Ensure react-icons is installed

function Footer() {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/company/oorzaa/', Icon: FaLinkedin }, // Replace URL
    { name: 'Instagram', url: 'https://www.instagram.com/oorzaa_m2t/', Icon: FaInstagram }, // Replace URL
    { name: 'Facebook', url: 'https://facebook.com', Icon: FaFacebook }, // Replace URL
  ];

  return (
    <footer className="bg-gray-900 text-gray-400 py-6 px-4 sm:px-8 mt-auto z-40"> {/* Darker footer */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm gap-4">
        <div className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Oorzaa Yatra. All Rights Reserved.
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          {socialLinks.map((link) => (
             <a
               key={link.name}
               href={link.url}
               target="_blank"
               rel="noopener noreferrer"
               aria-label={link.name}
               className="hover:text-orange-500 transition-colors duration-300"
               title={link.name} // Tooltip on hover
             >
               <link.Icon size={22} /> {/* Render the icon component */}
               <span className="sr-only">{link.name}</span>
             </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;




// import React from 'react';
// import { Link, NavLink } from 'react-router-dom';

// // Simple SVG icons for menu open/close
// const MenuIcon = () => <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>;
// const XIcon = () => <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;


// function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
//   // Helper for active link styling
//   const getNavLinkClass = ({ isActive }) =>
//     `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ease-in-out relative group ${
//       isActive
//         ? 'text-orange-600 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:w-1 after:h-1 after:bg-orange-600 after:rounded-full after:-translate-x-1/2 after:translate-y-1' // Active link style with dot
//         : 'text-gray-700 hover:text-orange-600 before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-orange-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out before:origin-left' // Inactive link style with hover underline
//     }`;

//   const navItems = [
//     { name: 'Home', path: '/' },
//     { name: 'Yatras', path: '/yatras' },
//     { name: 'Guidelines', path: '/guidelines' },
//     { name: 'Registration', path: '/registration' },
//     { name: 'Contact', path: '/contact' },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-md py-2 px-4 sm:px-6 z-50 h-16 flex items-center border-b border-gray-100"> {/* Added blur & border */}
//       <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
//         {/* Logo Section - UPDATED TEXT STYLING */}
//         <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group"> {/* Reduced space-x-3 to space-x-2 */}
//           {/* Optional: Keep image if you want it next to the text logo */}
//           {/* <img
//             src="/images/logo.jpg" // Use your actual logo image if desired
//             alt="Oorzaa Yatraas Logo Icon"
//             className="h-8 w-auto rounded-sm" // Smaller icon
//           /> */}
//           {/* Styled Text Logo */}
//           <div className="flex items-baseline"> {/* Align text baseline */}
//             <span className="text-2xl font-extrabold text-orange-600 tracking-tight group-hover:text-orange-700 transition-colors duration-300">
//               OORZA
//             </span>
//              {/* Added margin-left for spacing */}
//             <span className="text-2xl font-semibold text-teal-600 tracking-tight group-hover:text-teal-700 transition-colors duration-300 ml-1">
//               Yatra
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation Links */}
//         <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
//           {navItems.map((item) => (
//              <NavLink key={item.name} to={item.path} className={getNavLinkClass}>
//                {item.name}
//              </NavLink>
//           ))}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center">
//            <button
//              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-orange-600 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-all"
//              aria-controls="mobile-menu"
//              aria-expanded={isMobileMenuOpen}
//            >
//              <span className="sr-only">Open main menu</span>
//              {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
//            </button>
//         </div>
//       </div>

//        {/* Mobile Menu Dropdown - Improved Animation */}
//        <div
//          className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
//            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//          }`}
//          id="mobile-menu"
//         >
//          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//            {navItems.map((item) => (
//              <NavLink
//                key={item.name}
//                to={item.path}
//                className={({ isActive }) =>
//                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
//                    isActive
//                      ? 'bg-orange-100 text-orange-700'
//                      : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
//                  }`
//                }
//                onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
//              >
//                {item.name}
//              </NavLink>
//            ))}
//          </div>
//        </div>
//     </nav>
//   );
// }

// export default Navbar;



import React from 'react';
import { Link, NavLink } from 'react-router-dom';

// Simple SVG icons for menu open/close
const MenuIcon = () => <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" /></svg>;
const XIcon = () => <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;


function Navbar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  // Helper for active link styling
  const getNavLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-300 ease-in-out relative group ${
      isActive
        ? 'text-orange-600 after:content-[""] after:absolute after:bottom-0 after:left-1/2 after:w-1 after:h-1 after:bg-orange-600 after:rounded-full after:-translate-x-1/2 after:translate-y-1' // Active link style with dot
        : 'text-gray-700 hover:text-orange-600 before:content-[""] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5 before:bg-orange-500 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-300 before:ease-out before:origin-left' // Inactive link style with hover underline
    }`;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Yatras', path: '/yatras' },
    { name: 'Guidelines', path: '/guidelines' },
    { name: 'Registration', path: '/registration' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-md py-2 px-4 sm:px-6 z-50 h-16 flex items-center border-b border-gray-100"> {/* Added blur & border */}
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-3 flex-shrink-0 group">
          <img
            src="/images/logo.jpg" // <-- DOUBLE CHECK THIS PATH AND FILENAME
            alt="Oorzaa Yatraas Logo"
            className="h-10 w-auto rounded-sm" // Adjust height, add subtle rounding
          />
          {/* Text logo */}
          <div className="flex items-baseline">
            <span className="text-2xl font-extrabold text-orange-600 tracking-tight group-hover:text-orange-700 transition-colors duration-300 hidden sm:inline">
              OORZAA
            </span>
            <span className="text-2xl font-semibold text-teal-600 tracking-tight group-hover:text-teal-700 transition-colors duration-300 ml-1 hidden sm:inline">
              Yatra
            </span>
             {/* Shorter text for smaller screens */}
             <span className="text-xl font-extrabold text-orange-600 tracking-tight group-hover:text-orange-700 transition-colors duration-300 sm:hidden">
                OORZAA
             </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
          {navItems.map((item) => (
             <NavLink key={item.name} to={item.path} className={getNavLinkClass}>
               {item.name}
             </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
           <button
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-orange-600 hover:bg-orange-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-all"
             aria-controls="mobile-menu"
             aria-expanded={isMobileMenuOpen}
           >
             <span className="sr-only">Open main menu</span>
             {isMobileMenuOpen ? <XIcon /> : <MenuIcon />}
           </button>
        </div>
      </div>

       {/* Mobile Menu Dropdown */}
       <div
         className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 overflow-hidden transition-all duration-300 ease-in-out ${
           isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
         }`}
         id="mobile-menu"
        >
         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
           {navItems.map((item) => (
             <NavLink
               key={item.name}
               to={item.path}
               className={({ isActive }) =>
                 `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                   isActive
                     ? 'bg-orange-100 text-orange-700'
                     : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                 }`
               }
               onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
             >
               {item.name}
             </NavLink>
           ))}
         </div>
       </div>
    </nav>
  );
}

export default Navbar;


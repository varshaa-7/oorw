// import React from 'react';
// import { Link } from 'react-router-dom';
// import VideoPlayer from '../components/VideoPlayer.jsx';
// import YatraCard from '../components/YatraCard.jsx';
// import toursData from '../data/tour.json';

// // Simple icon components
// const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
// const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
// const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;

// function Home() {
//   // Get first 3 tours as featured
//   const featuredTours = toursData.slice(0, 3);

//   // Return the main content wrapped in a single parent fragment <>...</>
//   return (
//     <>
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-100 pt-28 pb-24 text-center overflow-hidden isolate">
//          {/* Background subtle pattern */}
//          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2080%2080%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Cpath%20fill%3D%22%23ea580c%22%20fill-opacity%3D%220.1%22%20d%3D%22M0%200h80v80H0zM40%200v80M0%2040h80%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')]"></div>
//          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-orange-50/50 via-orange-50/20 to-transparent z-0"></div>
//          <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[72rem] w-[72rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0 opacity-50" aria-hidden="true">
//            <circle cx="512" cy="512" r="512" fill="url(#hero-gradient)" fillOpacity="0.5" />
//            <defs><radialGradient id="hero-gradient"><stop stopColor="#FFF7ED" /><stop offset="1" stopColor="#FED7AA" /></radialGradient></defs>
//          </svg>

//         <div className="relative container mx-auto px-4 z-10">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-900 mb-4 leading-tight drop-shadow-md">
//             Embark on Your Divine Journey
//           </h1>
//           <p className="text-lg sm:text-xl text-orange-800/95 mb-10 max-w-3xl mx-auto font-medium">
//             Experience sacred destinations like Varanasi, Ayodhya, Kurukshetra and more with Oorza Yatra. Authentic, spiritual, and unforgettable pilgrimage tours curated for your peace of mind.
//           </p>
//           <Link
//             to="/yatras"
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-orange-50"
//           >
//              Explore All Yatras
//              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
//           </Link>
//         </div>
//       </div>

//        {/* Why Choose Us Section */}
//        <section className="py-16 px-4 bg-white border-t border-gray-100">
//          <div className="max-w-6xl mx-auto">
//              <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12">Why Travel With Oorza Yatra?</h2>
//              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//                  <div className="p-8 bg-white rounded-xl shadow-lg border border-orange-100 transform transition duration-300 hover:scale-105 hover:shadow-xl">
//                      <SparklesIcon />
//                      <h3 className="text-xl font-bold text-orange-800 mb-2">Spiritual Focus</h3>
//                      <p className="text-gray-600">Journeys designed for devotion, reflection, and deep spiritual connection.</p>
//                  </div>
//                  <div className="p-8 bg-white rounded-xl shadow-lg border border-green-100 transform transition duration-300 hover:scale-105 hover:shadow-xl">
//                       <CheckCircleIcon />
//                      <h3 className="text-xl font-bold text-green-800 mb-2">Hassle-Free Experience</h3>
//                      <p className="text-gray-600">We meticulously manage all logistics, letting you immerse fully.</p>
//                  </div>
//                  <div className="p-8 bg-white rounded-xl shadow-lg border border-blue-100 transform transition duration-300 hover:scale-105 hover:shadow-xl">
//                       <UserGroupIcon />
//                      <h3 className="text-xl font-bold text-blue-800 mb-2">Trusted & Knowledgeable</h3>
//                      <p className="text-gray-600">Experienced guides and coordinators enhance your sacred journey.</p>
//                  </div>
//              </div>
//          </div>
//        </section>

//       {/* Featured Yatras Section */}
//       <section className="py-16 px-4 max-w-7xl mx-auto">
//          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12">Featured Yatras</h2>
//          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
//             {/* Display the first 3 tours */}
//             {featuredTours.map((tour) => (
//               <YatraCard key={tour.id} tour={tour} />
//             ))}
//          </div>
//          <div className="text-center mt-12">
//             <Link to="/yatras" className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200 inline-flex items-center gap-1 group">
//                 View All Tours
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
//             </Link>
//          </div>
//       </section>

//       {/* Video Player Section */}
//       <VideoPlayer />

//       {/* Placeholder for Testimonials Section - corrected comment */}
//       {/*
//       <section className="py-16 px-4 bg-orange-50/50">
//         <div className="max-w-6xl mx-auto text-center">
//             <h2 className="text-3xl font-bold text-gray-800 mb-8">What Our Yatris Say</h2>
//             {/* Add Testimonial components here */}
//         {/*</div>
//       </section>
//       */}
//     </> // Closing fragment tag matches the opening one
//   );
// }

// export default Home;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import VideoPlayer from '../components/VideoPlayer.jsx';
// import YatraCard from '../components/YatraCard.jsx';
// import toursData from '../data/tour.json';

// // Simple icon components
// const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
// const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
// const UserGroupIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;

// function Home() {
//   const featuredTours = toursData.slice(0, 3);

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-100 pt-28 pb-24 text-center overflow-hidden isolate">
//         {/* Background subtle pattern */}
//         <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2080%2080%22%20width%3D%2280%22%20height%3D%2280%22%3E%3Cpath%20fill%3D%22%23ea580c%22%20fill-opacity%3D%220.1%22%20d%3D%22M0%200h80v80H0zM40%200v80M0%2040h80%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E')]"></div>
//         <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-orange-50/50 via-orange-50/20 to-transparent z-0"></div>
//         <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 h-[72rem] w-[72rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0 opacity-50" aria-hidden="true">
//           <circle cx="512" cy="512" r="512" fill="url(#hero-gradient)" fillOpacity="0.5" />
//           <defs><radialGradient id="hero-gradient"><stop stopColor="#FFF7ED" /><stop offset="1" stopColor="#FED7AA" /></radialGradient></defs>
//         </svg>

//         <div className="relative container mx-auto px-4 z-10">
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-900 mb-4 leading-tight drop-shadow-md">
//             Embark on Your Divine Journey
//           </h1>
//           <p className="text-lg sm:text-xl text-orange-800/95 mb-10 max-w-3xl mx-auto font-medium">
//             Experience sacred destinations like Varanasi, Ayodhya, Kurukshetra and more with Oorza Yatra. Authentic, spiritual, and unforgettable pilgrimage tours curated for your peace of mind.
//           </p>
//           <Link
//             to="/yatras"
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-orange-50"
//           >
//             Explore All Yatras
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </Link>

//           {/* ✨ New animated tagline below the button */}
//           <motion.p
//             className="mt-6 text-orange-900 font-semibold text-lg max-w-2xl mx-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
//           >
//             Bridging Ancient Wisdom with Modern Healing, A Digital Sanctuary for Transformation and Connection.
//           </motion.p>
//         </div>
//       </div>

//       {/* Why Choose Us Section */}
//       <section className="py-16 px-4 bg-white border-t border-gray-100">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12">Why Travel With Oorza Yatra?</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//             <div className="p-8 bg-white rounded-xl shadow-lg border border-orange-100 transform transition duration-300 hover:scale-105 hover:shadow-xl">
//               <SparklesIcon />
//               <h3 className="text-xl font-bold text-orange-800 mb-2">Spiritual Focus</h3>
//               <p className="text-gray-600">Journeys designed for devotion, reflection, and deep spiritual connection.</p>
//             </div>
//             <div className="p-8 bg-white rounded-xl shadow-lg border border-green-100 transform transition duration-300 hover:scale-105 hover:shadow-xl">
//               <CheckCircleIcon />
//               <h3 className="text-xl font-bold text-green-800 mb-2">Hassle-Free Experience</h3>
//               <p className="text-gray-600">We meticulously manage all logistics, letting you immerse fully.</p>
//             </div>
//             <div className="p-8 bg-white rounded-xl shadow-lg border border-blue-100 transform transition duration-300 hover:scale-105 hover:shadow-xl">
//               <UserGroupIcon />
//               <h3 className="text-xl font-bold text-blue-800 mb-2">Trusted & Knowledgeable</h3>
//               <p className="text-gray-600">Experienced guides and coordinators enhance your sacred journey.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Featured Yatras Section */}
//       <section className="py-16 px-4 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12">Featured Yatras</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
//           {featuredTours.map((tour) => (
//             <YatraCard key={tour.id} tour={tour} />
//           ))}
//         </div>
//         <div className="text-center mt-12">
//           <Link
//             to="/yatras"
//             className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200 inline-flex items-center gap-1 group"
//           >
//             View All Tours
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </Link>
//         </div>
//       </section>

//       <VideoPlayer />
//     </>
//   );
// }

// export default Home;



// import React from "react";
// import { Link } from "react-router-dom";
// import VideoPlayer from "../components/VideoPlayer.jsx";
// import YatraCard from "../components/YatraCard.jsx";
// import toursData from "../data/tour.json";

// // Icons
// const CheckCircleIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-8 w-8 text-green-600 mb-2 mx-auto"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={2}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// );

// const SparklesIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-8 w-8 text-orange-500 mb-2 mx-auto"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={2}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
//     />
//   </svg>
// );

// const UserGroupIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     className="h-8 w-8 text-blue-600 mb-2 mx-auto"
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth={2}
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//     />
//   </svg>
// );

// function Home() {
//   const featuredTours = toursData.slice(0, 3);

//   return (
//     <>
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-100 pt-28 pb-24 text-center overflow-hidden isolate">
//         <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 80 80%22 width=%2280%22 height=%2280%22%3E%3Cpath fill=%22%23ea580c%22 fill-opacity=%220.1%22 d=%22M0 0h80v80H0zM40 0v80M0 40h80%22/%3E%3C/svg%3E')]"></div>
//         <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-orange-50/50 via-orange-50/20 to-transparent z-0"></div>

//         <div className="relative container mx-auto px-4 z-10">
//           {/* Animated Hero Heading */}
//           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-900 mb-4 leading-tight drop-shadow-md animate-fadeInUp">
//             Embark on Your Divine Journey
//           </h1>

//           {/* Animated Paragraph */}
//           <p className="text-lg sm:text-xl text-orange-800/95 mb-10 max-w-3xl mx-auto font-medium animate-fadeInUp animate-delay-200">
//             Experience sacred destinations like Varanasi, Ayodhya, Kurukshetra and more with Oorza Yatra. Authentic, spiritual, and unforgettable pilgrimage tours curated for your peace of mind.
//           </p>

//           {/* Animated Button */}
//           <Link
//             to="/yatras"
//             className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-orange-50 animate-fadeInUp animate-delay-400"
//           >
//             Explore All Yatras
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               strokeWidth={2}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M17 8l4 4m0 0l-4 4m4-4H3"
//               />
//             </svg>
//           </Link>

//           {/* Tagline */}
//           <p className="mt-6 text-orange-900 font-semibold text-lg max-w-2xl mx-auto animate-fadeInUp animate-delay-600">
//             Bridging Ancient Wisdom with Modern Healing, A Digital Sanctuary for Transformation and Connection.
//           </p>
//         </div>
//       </div>

//       {/* Why Choose Us Section */}
//       <section className="py-16 px-4 bg-white border-t border-gray-100">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12 animate-fadeInUp">
//             Why Travel With Oorza Yatra?
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//             {[{icon: SparklesIcon, title: "Spiritual Focus", color: "text-orange-800", desc: "Journeys designed for devotion, reflection, and deep spiritual connection."},
//               {icon: CheckCircleIcon, title: "Hassle-Free Experience", color: "text-green-800", desc: "We meticulously manage all logistics, letting you immerse fully."},
//               {icon: UserGroupIcon, title: "Trusted & Knowledgeable", color: "text-blue-800", desc: "Experienced guides and coordinators enhance your sacred journey."}
//             ].map((item, index) => (
//               <div key={index} className={`p-8 bg-white rounded-xl shadow-lg border transform transition duration-500 hover:scale-105 hover:shadow-xl border-${item.color}`}>
//                 <item.icon />
//                 <h3 className={`text-xl font-bold ${item.color} mb-2`}>{item.title}</h3>
//                 <p className="text-gray-600">{item.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Yatras Section */}
//       <section className="py-16 px-4 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12 animate-fadeInUp">Featured Yatras</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
//           {featuredTours.map((tour) => (
//             <YatraCard key={tour.id} tour={tour} />
//           ))}
//         </div>
//       </section>

//       <VideoPlayer />
//     </>
//   );
// }

// export default Home;




import React from "react";
import { Link } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer.jsx";
import YatraCard from "../components/YatraCard.jsx";
import toursData from "../data/tour.json";

// Icons
const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-green-600 mb-2 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SparklesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-orange-500 mb-2 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const UserGroupIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-600 mb-2 mx-auto"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

function Home() {
  const featuredTours = toursData.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-100 pt-28 pb-24 text-center overflow-hidden isolate">
        {/* Floating glowing orbs */}
        <div className="absolute inset-0 z-0">
          <span className="absolute w-32 h-32 bg-orange-200/40 rounded-full blur-3xl animate-float top-10 left-1/4"></span>
          <span className="absolute w-24 h-24 bg-yellow-200/30 rounded-full blur-2xl animate-float animation-delay-200 top-32 left-3/4"></span>
          <span className="absolute w-40 h-40 bg-orange-300/30 rounded-full blur-3xl animate-float animation-delay-400 top-1/2 left-1/2"></span>
          <span className="absolute w-20 h-20 bg-yellow-300/40 rounded-full blur-2xl animate-float animation-delay-600 bottom-10 right-1/4"></span>
        </div>

        <div className="relative container mx-auto px-4 z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-orange-900 mb-4 leading-tight drop-shadow-md animate-fadeInUp">
            Embark on Your Divine Journey
          </h1>

          <p className="text-lg sm:text-xl text-orange-800/95 mb-10 max-w-3xl mx-auto font-medium animate-fadeInUp animate-delay-200">
            Experience sacred destinations like Varanasi, Ayodhya, Kurukshetra and more with Oorza Yatra. Authentic, spiritual, and unforgettable pilgrimage tours curated for your peace of mind.
          </p>

          <Link
            to="/yatras"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-orange-50 animate-fadeInUp animate-delay-400"
          >
            Explore All Yatras
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>

          <p className="mt-6 text-orange-900 font-semibold text-lg max-w-2xl mx-auto animate-fadeInUp animate-delay-600">
            Bridging Ancient Wisdom with Modern Healing, A Digital Sanctuary for Transformation and Connection.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12 animate-fadeInUp">
            Why Travel With Oorza Yatra?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[{ icon: SparklesIcon, title: "Spiritual Focus", color: "text-orange-800", desc: "Journeys designed for devotion, reflection, and deep spiritual connection." },
            { icon: CheckCircleIcon, title: "Hassle-Free Experience", color: "text-green-800", desc: "We meticulously manage all logistics, letting you immerse fully." },
            { icon: UserGroupIcon, title: "Trusted & Knowledgeable", color: "text-blue-800", desc: "Experienced guides and coordinators enhance your sacred journey." }
            ].map((item, index) => (
              <div key={index} className={`p-8 bg-white rounded-xl shadow-lg border transform transition duration-500 hover:scale-105 hover:shadow-xl border-${item.color}`}>
                <item.icon />
                <h3 className={`text-xl font-bold ${item.color} mb-2`}>{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Yatras Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12 animate-fadeInUp">Featured Yatras</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {featuredTours.map((tour) => (
            <YatraCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      <VideoPlayer />
    </>
  );
}

export default Home;

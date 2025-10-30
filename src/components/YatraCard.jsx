import React from 'react';
import { Link } from 'react-router-dom';
// Simple location icon
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

function YatraCard({ tour }) {
  // Use _id from the dynamically fetched data (MongoDB standard)
  const yatraId = tour._id; 
  
  return (
    <Link
      to={`/yatras/${yatraId}`} // <-- FIX: Uses the backend's numerical _id
      className="group flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 border border-gray-100 hover:border-orange-200"
    >
      <div className="relative overflow-hidden">
        <img
          src={tour.image || tour.imageUrl} // Use 'image' from BE model, fallback to old 'imageUrl'
          alt={`Image of ${tour.title}`}
          className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
         <div className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
           {tour.duration}
         </div>
         {/* Optional gradient overlay */}
         <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black opacity-40 group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-orange-800 mb-1 group-hover:text-orange-900 transition-colors duration-300">
          {tour.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3 flex items-center">
          <LocationIcon />
          {tour.destination}
        </p>
         <div className="mt-auto pt-4 border-t border-gray-100">
           <div className="flex justify-between items-center">
               <p className="text-lg font-extrabold text-gray-900">
                 ₹{tour.price.toLocaleString('en-IN')}
               </p>
               <span className="inline-block bg-orange-600 text-white py-2 px-5 rounded-lg text-sm font-semibold transition-colors duration-300 group-hover:bg-orange-700 shadow-sm">
                 View Details
               </span>
           </div>
         </div>
      </div>
    </Link>
  );
}

export default YatraCard;
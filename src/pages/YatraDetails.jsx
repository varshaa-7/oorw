import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const API_YATRA_DETAIL_URL = 'http://localhost:5000/api/yatra'; 

// Simple Icons (omitted for brevity)
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const PriceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0c-1.657 0-3-.895-3-2s1.343-2 3-2 3-.895 3-2 1.343-2 3-2m0 8c1.11 0 2.08-.402 2.599-1M12 16v1m0-1v-8m0 0h1m-1 11H7.5a2.5 2.5 0 01-2.5-2.5V8.5A2.5 2.5 0 017.5 6h9a2.5 2.5 0 012.5 2.5v7a2.5 2.5 0 01-2.5 2.5h-1" /></svg>; 
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 inline text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

function YatraDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        const response = await fetch(`${API_YATRA_DETAIL_URL}/${id}`);
        if (response.status === 404) {
             setError("Yatra not found.");
             return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }
        const data = await response.json();
        setTour(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTourDetails();
  }, [id]);

  // ... (rest of the component remains the same, using tour.description, tour.highlights, etc.)
  
  if (isLoading) return <div className="text-center py-20">Loading Yatra Details...</div>;
  
  if (error || !tour) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-semibold text-red-700 mb-4">{error || "Tour Not Found!"}</h2>
        <Link to="/yatras" className="text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200 inline-flex items-center gap-1">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
           Back to All Yatras
        </Link>
      </div>
    );
  }

  const renderList = (items) => (
      <ul className="list-disc list-outside ml-5 space-y-1">
          {items && items.length > 0 ? items.map((item, index) => <li key={index}>{item}</li>) : <li>N/A</li>}
      </ul>
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="relative">
          <img
            src={tour.image} // Use 'image' field
            alt={tour.title}
            className="w-full h-80 sm:h-[500px] object-cover"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-80"></div>
           <div className="absolute bottom-0 left-0 p-6 md:p-10">
             <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 shadow-lg">{tour.title}</h1>
             <p className="text-xl text-orange-300 font-medium shadow-md flex items-center gap-1"> <LocationIcon /> {tour.destination || tour.title}</p>
           </div>
        </div>

        <div className="p-6 md:p-10">
          {/* Key Info Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 pb-6 border-b border-orange-100">
              <div className="flex items-center">
                 <CalendarIcon />
                 <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Duration</h3>
                    <p className="text-lg font-medium text-gray-800">{tour.duration}</p>
                 </div>
             </div>
             <div className="flex items-center">
                 <PriceIcon />
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Starting Price</h3>
                    <p className="text-lg font-bold text-gray-900">₹{tour.price.toLocaleString('en-IN')}</p>
                  </div>
             </div>
              <div className="flex items-center">
                 <LocationIcon />
                 <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Available Seats</h3>
                    <p className="text-lg font-medium text-gray-800">{tour.availableSeats} of {tour.maxParticipants}</p>
                 </div>
             </div>
          </div>


          {/* Details Section using Tailwind Typography */}
          <div className="prose prose-lg prose-orange max-w-none text-gray-700 mb-10">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-l-4 border-orange-500 pl-3">Yatra Overview</h3>
            <p>{tour.description}</p>
            
             <h4 className="font-semibold text-xl mt-6 mb-3 text-gray-800">Highlights</h4>
             {renderList(tour.highlights)}
             
             <h4 className="font-semibold text-xl mt-6 mb-3 text-gray-800">Package Inclusions</h4>
             {renderList(tour.included)}
             
             <h4 className="font-semibold text-xl mt-6 mb-3 text-gray-800">Package Exclusions</h4>
             {renderList(tour.excluded)}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-gray-200 pt-8">
            <a
              href="https://www.razorpay.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Book Now (₹{tour.price.toLocaleString('en-IN')})
            </a>
            <Link
              to="/registration"
              className="w-full sm:w-auto text-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300"
            >
              Register Interest
            </Link>
             <Link
                to="/yatras"
                className="w-full sm:w-auto text-center text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium py-3 px-4 inline-flex items-center gap-1 sm:ml-auto"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                 Back to Yatras
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YatraDetails;
import React from 'react';
import toursData from '../data/tour.json';
import YatraCard from '../components/YatraCard.jsx';

function Yatras() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-orange-900 tracking-tight sm:text-5xl">
          Our Sacred Yatras
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 sm:mt-4">
          Explore our curated pilgrimage tours to India's most revered destinations.
        </p>
      </div>
      {/* Optional: Add Filters/Search Bar here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        {toursData.map((tour) => (
          <YatraCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}

export default Yatras;


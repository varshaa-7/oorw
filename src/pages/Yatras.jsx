import React, { useState, useEffect } from 'react';
import YatraCard from '../components/YatraCard.jsx';

const API_YATRAS_URL = 'http://localhost:5000/api/yatra'; // Public endpoint

function Yatras() {
  const [toursData, setToursData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch(API_YATRAS_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        setToursData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (isLoading) return <div className="text-center py-20">Loading Yatras...</div>;
  if (error) return <div className="text-center py-20 text-red-600">Error: {error}. Please ensure backend is running.</div>;
  if (toursData.length === 0) return <div className="text-center py-20">No Yatras currently available.</div>;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
        {toursData.map((tour) => (
          <YatraCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
}

export default Yatras;
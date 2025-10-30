import React, { useState, useEffect } from 'react';

const API_VIDEOS_URL = 'http://localhost:5000/api/videos'; // Public endpoint

// Play icon SVG (omitted for brevity)
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>;

function VideoPlayer() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(API_VIDEOS_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const data = await response.json();
        // Use data.data and filter for active videos (assuming isActive field exists in Video model)
        setVideos(data.data.filter(v => v.isActive)); 
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (isLoading) return <div className="text-center py-8">Loading videos...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  if (videos.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-orange-900 mb-10">
          Glimpses of Our Divine Yatras
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map(video => (
            <div key={video._id} className="relative aspect-video bg-black rounded-xl shadow-xl overflow-hidden group cursor-pointer border-2 border-transparent hover:border-orange-300 transition-all duration-300">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`${video.videoUrl}&autoplay=0&modestbranding=1&rel=0`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {/* Overlay with Play icon */}
               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                   <PlayIcon />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default VideoPlayer;
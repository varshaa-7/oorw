import React from 'react';

// Play icon SVG
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>;

function VideoPlayer() {
  const videos = [
    { id: 1, url: 'https://www.youtube.com/embed/XTn3dt91qJU?si=6hsLpSEzJoCz1Y7t', title: 'Kashi Yatra Glimpse' },
    { id: 2, url: 'https://www.youtube.com/embed/rPbVkAiIaGg?si=QMohMOwb4mbftTQx', title: 'Kedarnath Yatra Glimpse' },
    { id: 3, url: 'https://www.youtube.com/embed/7Kt56x9EM4w?si=Ktk_8wvN4nxAH0At', title: 'Ayodhya Yatra Glimpse' },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white"> {/* Gradient background */}
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-orange-900 mb-10">
          Glimpses of Our Divine Yatras
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map(video => (
            <div key={video.id} className="relative aspect-video bg-black rounded-xl shadow-xl overflow-hidden group cursor-pointer border-2 border-transparent hover:border-orange-300 transition-all duration-300">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`${video.url}&autoplay=0&modestbranding=1&rel=0`} // Add params for cleaner look
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


// src/components/VideoSection.jsx
import React from 'react';

const VideoSection = () => {
    const localVideoSrc = "/videos/smart-sat-tutorial.mp4"; 
    const posterImage = "/images/video-poster.jpg"; 

  return (
    <div id="youtube-tutorial" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">SmartSat-ı Videoda İzləyin</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Platformamızın funksiyalarını və iş prinsipini daha yaxşı anlamaq üçün hazırladığımız video təlimata baxın.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg shadow-xl overflow-hidden">
          <video
            className="w-full h-full"
            src={localVideoSrc}
            controls
            poster={posterImage}
            title="SmartSat Video Təlimatı"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
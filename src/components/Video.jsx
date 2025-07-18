// src/components/VideoSection.jsx
import React, { useRef } from 'react'; // useRef import edildi
import { motion, useInView } from 'framer-motion'; // motion və useInView import edildi

const VideoSection = () => {
    const localVideoSrc = "/videos/smart-sat-tutorial.mp4"; 
    const posterImage = "/images/video-poster.jpg"; 

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const videoVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
    };

  return (
    <div id="youtube-tutorial" className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.h2
          className="text-3xl font-extrabold text-gray-900 mb-4"
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          SmartSat-ı Videoda İzləyin
        </motion.h2>
        <motion.p
          className="text-xl text-gray-600 max-w-3xl mx-auto"
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ ...textVariants.visible.transition, delay: 0.2 }}
        >
          Platformamızın funksiyalarını və iş prinsipini daha yaxşı anlamaq üçün hazırladığımız video təlimata baxın.
        </motion.p>
      </div>

      <motion.div
        ref={ref} // ref-i bu div-ə əlavə edirik
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={videoVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
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
      </motion.div>
    </div>
  );
};

export default VideoSection;
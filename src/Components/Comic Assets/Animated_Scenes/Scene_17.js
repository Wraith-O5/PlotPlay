import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Scene_17.css'; // Optional, for additional styling
import Scene_17_01 from '../images/17_01.png'
import Scene_17_02 from '../images/17_02.png'
import Scene_17_03 from '../images/17_03.png'
import Black_Screen from '../images/17_All.png'

const Scene_17 = () => {
  const [currentImage, setCurrentImage] = useState(0); // Track which image is currently shown

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % 18); 
    }, 600);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  return (
    <div className="image-slider">
        <img src={Black_Screen}/>
        <motion.div
            key={currentImage}
            className="slider-image"
            initial={{ opacity: 1 }} // Initial state: hidden
            animate={{ opacity: 1 }} // Animate to fully visible
            exit={{ opacity: 1 }} // Animate out of view
            transition={{ 
                duration: 0.1,
                ease: 'easeInOut'
               }}
        >
            <img
            src={currentImage === 0 ? Scene_17_01 : currentImage === 1 ? Black_Screen : currentImage === 2 
                ? Scene_17_01 : currentImage === 3 ? Black_Screen : currentImage === 4 
                ? Scene_17_02 : currentImage === 5 ? Black_Screen : currentImage === 6
                ? Scene_17_02 : currentImage === 7 ? Black_Screen : currentImage === 8
                ? Scene_17_01 : currentImage === 9 ? Black_Screen : currentImage === 10
                ? Scene_17_02 : currentImage === 11 ? Black_Screen : currentImage === 12
                ? Scene_17_03 : currentImage === 13 ? Black_Screen : currentImage === 14
                ? Scene_17_01 : currentImage === 15 ? Black_Screen : currentImage === 16
                ? Scene_17_03 : Black_Screen }
            alt={`Image ${currentImage + 1}`}
            />
        </motion.div>
    </div>
  );
};

export default Scene_17;
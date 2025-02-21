import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Scene_04.css'; // Optional, for additional styling
import Scene_04_01 from '../images/04_01🟢.png'
import Scene_04_02 from '../images/04_02🟢.png'
import Scene_04_03 from '../images/04_03🟢.png'
import Scene_04_04 from '../images/04_04🟢.png'

const Scene_04 = () => {
  const [currentImage, setCurrentImage] = useState(0); // Track which image is currently shown

  // Change images every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % 3); // Cycle through 3 images
    }, 100);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  return (
    <div className="image-slider">
        <img src={Scene_04_01}/>
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
            src={currentImage === 0 ? Scene_04_02 : currentImage === 1 ? Scene_04_03 : Scene_04_04}
            alt={`Image ${currentImage + 1}`}
            />
        </motion.div>
    </div>
  );
};

export default Scene_04;

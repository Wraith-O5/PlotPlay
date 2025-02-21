import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Scene_10.css'; // Optional, for additional styling
import Scene_10_01 from '../images/10_01🟠.png'
import Scene_10_02 from '../images/10_02🟠.png'
import Scene_10_03 from '../images/10_03🟠.png'
import Scene_10_04 from '../images/10_04🟠.png'

const Scene_10 = () => {
  const [currentImage, setCurrentImage] = useState(0); // Track which image is currently shown

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % 3); // Cycle through 3 images
    }, 100);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);

  return (
    <div className="image-slider">
        <img src={Scene_10_01}/>
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
            src={currentImage === 0 ? Scene_10_02 : currentImage === 1 ? Scene_10_03 : Scene_10_04}
            alt={`Image ${currentImage + 1}`}
            />
        </motion.div>
    </div>
  );
};

export default Scene_10;

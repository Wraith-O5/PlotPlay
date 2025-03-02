import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Scene_17.css'; // Optional, for additional styling
import Scene_17_01 from '../images/17_01.png';
import Scene_17_02 from '../images/17_02.png';
import Scene_17_03 from '../images/17_03.png';
import Scene_17_04 from '../images/17_04.png';
import Black_Screen from '../images/17_All.png';

const Scene_17 = () => {
  const [currentImage, setCurrentImage] = useState(0); // Track which image is currently shown
  const [isVisible, setIsVisible] = useState(false); // Track visibility of the element
  const imageRef = useRef(null); // Ref for the image container

  // Set up the Intersection Observer to track visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Element is in view
        } else {
          setIsVisible(false); // Element is out of view
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current); // Start observing the image container
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current); // Clean up observer
      }
    };
  }, []);

  // If the element is in view, start the image change animation
  useEffect(() => {
    if (isVisible) {
      const intervalId = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % 20);
      }, 600);

      return () => clearInterval(intervalId); // Clean up interval on unmount
    }
  }, [isVisible]); // Only run when the element is visible

  return (
    <div className="image-slider" ref={imageRef}>
      <img src={Black_Screen} alt="Black Screen" />
      {isVisible && (
        <motion.div
          key={currentImage}
          className="slider-image"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            ease: 'easeInOut',
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
                ? Scene_17_03 : currentImage === 17 ? Black_Screen : currentImage === 18
                ? Scene_17_04 : Black_Screen }
            alt={`Image ${currentImage + 1}`}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Scene_17;

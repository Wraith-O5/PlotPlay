import React, { useEffect, useRef } from 'react';
import Clock from '../Animated_Scenes/09_ver2.gif'


const SoundWhileView = () => {
  // Create a reference to the element you want to trigger the sound for
  const elementRef = useRef(null);
  const audioRef = useRef(new Audio('/sound.mp3')); // Pointing to the sound file in the public folder

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play sound when the element is in view
          audioRef.current.play();
        }
      },
      { threshold: 0.5 } // Trigger when at least 50% of the element is in view
    );

    const currentElement = elementRef.current;
    observer.observe(currentElement);

    // Clean up the observer when the component is unmounted
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, []);

  return (
    <img ref={elementRef} src={Clock}/>
  );
};

export default SoundWhileView;

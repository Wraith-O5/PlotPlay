import React, { useEffect } from 'react';
import Music from './Comic Assets/Sound/Music/horror-spooky-piano-254402.mp3'

const BackgroundMusic = () => {
  useEffect(() => {
    // Create a new audio element
    const audio = new Audio(Music); // replace with your actual audio file path
    audio.loop = true;  // Set the audio to loop
    
    const playMusic = () => {
        if (audio.paused) {
          audio.play().catch((error) => {
            console.error("Error trying to play the audio:", error);
          });
        }
      };
  
      playMusic(); // Start playing the music when the component is mounted
  
      // Cleanup function to stop the music when leaving the page
      return () => {
        audio.pause();
        audio.currentTime = 0;  // Reset the music to the beginning
      };
    }, []);  // Empty dependency array ensures this runs once on mount/unmount

  return null; // You don't need to render anything
};

export default BackgroundMusic;
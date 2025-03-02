import { useEffect, useRef } from "react";

const SoundEffects = ({ src, alt, soundSrc }) => {
    const imgRef = useRef(null);
    const audioRef = useRef(new Audio(soundSrc));
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              audioRef.current.currentTime = 0; // Restart sound if needed
              audioRef.current.play();
            }
          });
        },
        { threshold: 0.5 } // Adjust threshold as needed
      );
  
      if (imgRef.current) {
        observer.observe(imgRef.current);
      }
  
      return () => {
        if (imgRef.current) {
          observer.unobserve(imgRef.current);
        }
      };
    }, []);
  
    return (
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ width: "100%", height: "auto", objectFit: "contain" }}
      />
    );
  };

export default SoundEffects;

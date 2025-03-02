import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const LoopingSoundEffects = ({ src, alt, soundSrc, className, motionProps }) => {
  const audioRef = useRef(new Audio(soundSrc));
  const imageRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          audio.play().catch((e) => console.warn("Audio play was interrupted:", e));
          setIsPlaying(true);
        } else {
          audio.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
      audio.pause();
    };
  }, []);

  return (
    <motion.img
      ref={imageRef}
      src={src}
      alt={alt}
      className={className}
      {...motionProps}
    />
  );
};

export default LoopingSoundEffects ;

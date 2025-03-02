import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const SoundEffectsWithAnimation = ({ src, alt, soundSrc, className, motionProps }) => {
  const audioRef = useRef(new Audio(soundSrc));
  const imageRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed) {
          audio.play().catch((e) => console.warn("Audio play was interrupted:", e));
          setHasPlayed(true); // Prevent replaying when it re-enters the view
        }
      },
      { threshold: 0.5 } // Adjust visibility threshold
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasPlayed]);

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

export default SoundEffectsWithAnimation;

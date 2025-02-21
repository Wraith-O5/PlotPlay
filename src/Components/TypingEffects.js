// TypingEffect.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TypingEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index += 1;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    const cursorInterval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 500); // Blinks every 500ms

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, [text, speed]);

  return (
    <motion.div
      style={{ display: 'inline-block' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span dangerouslySetInnerHTML={{ __html: displayedText }} />
      {isCursorVisible && <span>|</span>} {/* Blinking cursor */}
    </motion.div>
  );
};

export default TypingEffect;
